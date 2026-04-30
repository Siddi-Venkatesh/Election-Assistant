import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from routes.data import data_bp
from routes.chat import chat_bp

load_dotenv()

# Point static folder to 'static' where React build will be placed
app = Flask(__name__, static_folder='static', static_url_path='/')
CORS(app) # Allow cross-origin requests from React frontend

# Register Blueprints
app.register_blueprint(data_bp, url_prefix='/api/data')
app.register_blueprint(chat_bp, url_prefix='/api/chat')

# Catch-all route to serve React app for non-API requests
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
