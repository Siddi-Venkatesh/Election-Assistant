"""
Pytest fixtures and configuration for backend tests.
Provides a reusable Flask test client and mock Gemini API configuration.
"""
import pytest
import os
import sys

# Add the backend directory to sys.path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))


@pytest.fixture
def app():
    """Create and configure a test application instance."""
    # Set a dummy API key for testing
    os.environ['GEMINI_API_KEY'] = 'test-api-key-12345'
    
    from app import app as flask_app
    flask_app.config['TESTING'] = True
    yield flask_app


@pytest.fixture
def client(app):
    """Create a test client for the Flask application."""
    return app.test_client()


@pytest.fixture
def no_api_key_app():
    """Create an app instance without API key to test fallback behavior."""
    if 'GEMINI_API_KEY' in os.environ:
        del os.environ['GEMINI_API_KEY']
    
    from app import app as flask_app
    flask_app.config['TESTING'] = True
    yield flask_app
