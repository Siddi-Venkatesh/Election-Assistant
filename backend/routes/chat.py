import os
from flask import Blueprint, request, jsonify
import google.generativeai as genai

chat_bp = Blueprint('chat', __name__)

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-flash-latest')
else:
    model = None

@chat_bp.route('/', methods=['POST'])
def handle_chat():
    data = request.get_json()
    user_message = data.get('message')

    if not user_message:
        return jsonify({"message": "Message is required"}), 400

    if not model:
        # Fallback if no API key
        bot_response = "Backend Gemini API key not configured. Please set GEMINI_API_KEY in backend/.env"
        return jsonify({"response": bot_response}), 200

    try:
        # Construct prompt
        prompt = f"You are a helpful election assistant for a first-time voter in India. Answer concisely. User says: {user_message}"
        response = model.generate_content(prompt)
        bot_response = response.text

        return jsonify({"response": bot_response}), 200

    except Exception as e:
        return jsonify({"message": f"Error interacting with Gemini API: {str(e)}"}), 500
