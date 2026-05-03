"""
Chat API route for the Election Assistant.

Proxies user messages to the Google Gemini API and returns
contextual election process guidance. The API key is never
exposed to the frontend client.
"""
import os
from flask import Blueprint, request, jsonify
import google.generativeai as genai

chat_bp = Blueprint('chat', __name__)

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
GEMINI_MODEL = os.getenv('GEMINI_MODEL', 'gemini-1.5-flash')

# Ordered fallback list in case configured model is unavailable/deprecated.
MODEL_CANDIDATES = [
    GEMINI_MODEL,
    'gemini-1.5-flash',
    'gemini-flash-latest',
]

# System instruction for the Gemini model — establishes assistant persona
SYSTEM_INSTRUCTION = (
    "You are VoterAssist, an expert AI assistant specializing in the Indian "
    "election process. Your role is to educate citizens — especially first-time "
    "voters — about electoral procedures, voter registration (Form 6), EPIC cards, "
    "polling booth locations, voting day guidelines, and the Election Commission of "
    "India (ECI). Always be concise, factual, and encouraging. When uncertain, "
    "recommend the official ECI website (eci.gov.in) or the 1950 voter helpline."
)

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel(
        model_name=MODEL_CANDIDATES[0],
        system_instruction=SYSTEM_INSTRUCTION,
    )
else:
    model = None


def _generate_with_fallbacks(user_message):
    """
    Generate a response while gracefully handling invalid/deprecated model names.
    """
    last_error = None
    for model_name in MODEL_CANDIDATES:
        try:
            active_model = genai.GenerativeModel(
                model_name=model_name,
                system_instruction=SYSTEM_INSTRUCTION,
            )
            return active_model.generate_content(user_message)
        except Exception as exc:
            last_error = exc
            # Retry with next candidate only for "model not found / unsupported" style errors.
            error_text = str(exc).lower()
            is_model_error = (
                'is not found' in error_text
                or 'not supported for generatecontent' in error_text
                or '404' in error_text
            )
            if not is_model_error:
                raise

    raise last_error


@chat_bp.route('/', methods=['POST'])
def handle_chat():
    """
    Handle incoming chat messages and return AI-generated responses.

    Request body (JSON):
        message (str): The user's question or message (required, max 1000 chars).

    Returns:
        200: JSON with 'response' key containing the assistant's reply.
        400: JSON with 'message' key if the request is invalid.
        500: JSON with 'message' key if the Gemini API call fails.
    """
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'message': 'Request body must be valid JSON'}), 400

    user_message = data.get('message', '').strip()

    if not user_message:
        return jsonify({'message': 'Message is required'}), 400

    if len(user_message) > 1000:
        return jsonify({'message': 'Message exceeds maximum length of 1000 characters'}), 400

    if not model:
        # Graceful fallback when no API key is configured
        return jsonify({
            'response': (
                'The AI assistant is not configured. '
                'Please set GEMINI_API_KEY in the backend environment variables.'
            )
        }), 200

    try:
        response = _generate_with_fallbacks(user_message)
        return jsonify({'response': response.text}), 200

    except Exception as e:
        return jsonify({'message': f'Error interacting with Gemini API: {str(e)}'}), 500

