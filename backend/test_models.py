import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

api_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=api_key)

try:
    model = genai.GenerativeModel('gemini-pro-latest')
    response = model.generate_content("Hello, who are you?")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error with gemini-pro-latest: {e}")

try:
    model = genai.GenerativeModel('gemini-flash-latest')
    response = model.generate_content("Hello, who are you?")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error with gemini-flash-latest: {e}")
