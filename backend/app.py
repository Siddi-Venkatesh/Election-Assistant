"""
Election Assistant Flask Backend.

Provides a secure REST API for the VoterAssist frontend, proxying requests
to the Google Gemini API and serving static React build files.

Security features:
  - Rate limiting via Flask-Limiter (prevents API abuse)
  - Gzip compression via Flask-Compress (improves efficiency)
  - HTTP security headers via after_request hook
  - Gemini API key never exposed to frontend
"""
import os
from dotenv import load_dotenv

# Load .env from the directory containing this file
base_path = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(base_path, '.env'))

from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from flask_compress import Compress
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from routes.data import data_bp
from routes.chat import chat_bp

# ── Application factory ────────────────────────────────────────────────────────

app = Flask(__name__, static_folder='static', static_url_path='/')

# Allow cross-origin requests from the React dev server
CORS(app, resources={r'/api/*': {'origins': '*'}})

# Enable gzip/deflate compression for all responses > 500 bytes
Compress(app)

# Rate limiter — backed by in-memory storage (suitable for single-worker Cloud Run)
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=['200 per day', '50 per hour'],
    storage_uri='memory://',
)

# ── Blueprints ─────────────────────────────────────────────────────────────────

app.register_blueprint(data_bp, url_prefix='/api/data')
app.register_blueprint(chat_bp, url_prefix='/api/chat')

# Apply a stricter rate limit specifically to the AI chat endpoint
limiter.limit('30 per minute')(chat_bp)

# ── Security headers ───────────────────────────────────────────────────────────

@app.after_request
def set_security_headers(response):
    """Add HTTP security headers to every response."""
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Permissions-Policy'] = (
        'accelerometer=(), camera=(), geolocation=(), gyroscope=(), '
        'magnetometer=(), microphone=(), payment=(), usb=()'
    )
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com "
        "https://www.google-analytics.com; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com; "
        "img-src 'self' data: https:; "
        "connect-src 'self' https://www.google-analytics.com "
        "https://translation.googleapis.com https://generativelanguage.googleapis.com;"
    )

    # Cache static assets aggressively; don't cache API responses
    if request.path.startswith('/api/'):
        response.headers['Cache-Control'] = 'no-store'
    elif request.path.startswith('/assets/'):
        # Vite-generated assets have content hashes — safe to cache for 1 year
        response.headers['Cache-Control'] = 'public, max-age=31536000, immutable'
    else:
        response.headers['Cache-Control'] = 'no-cache'
    return response

# ── SPA catch-all route ────────────────────────────────────────────────────────

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Serve the React SPA for all non-API routes."""
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

# ── Health check ───────────────────────────────────────────────────────────────

@app.route('/api/health')
def health():
    """Lightweight health-check endpoint for Cloud Run probes."""
    return jsonify({'status': 'ok', 'service': 'election-assistant'}), 200

# ── Entrypoint ─────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

