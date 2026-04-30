import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.data import data_bp
from routes.chat import chat_bp

load_dotenv()

app = Flask(__name__)
CORS(app) # Allow cross-origin requests from React frontend

# Register Blueprints
app.register_blueprint(data_bp, url_prefix='/api/data')
app.register_blueprint(chat_bp, url_prefix='/api/chat')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
