"""
Tests for the chat API route.
Validates request handling, error responses, and Gemini API integration.
"""
import json
import pytest
from unittest.mock import patch, MagicMock


class TestChatRoute:
    """Test suite for POST /api/chat/ endpoint."""

    def test_chat_requires_message_field(self, client):
        """Should return 400 when message field is missing."""
        response = client.post(
            '/api/chat/',
            data=json.dumps({}),
            content_type='application/json'
        )
        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'message' in data.get('message', '').lower() or 'required' in data.get('message', '').lower()

    def test_chat_requires_non_empty_message(self, client):
        """Should return 400 when message is empty."""
        response = client.post(
            '/api/chat/',
            data=json.dumps({'message': ''}),
            content_type='application/json'
        )
        # Empty string should trigger the "Message is required" check
        assert response.status_code == 400

    def test_chat_returns_200_with_valid_message(self, client):
        """Should return 200 for a valid message (may use mock or real API)."""
        with patch('routes.chat.model') as mock_model:
            mock_response = MagicMock()
            mock_response.text = 'You can register on the ECI portal.'
            mock_model.generate_content.return_value = mock_response

            response = client.post(
                '/api/chat/',
                data=json.dumps({'message': 'How do I register?'}),
                content_type='application/json'
            )
            assert response.status_code == 200
            data = json.loads(response.data)
            assert 'response' in data
            assert len(data['response']) > 0

    def test_chat_handles_api_error_gracefully(self, client):
        """Should return 500 when Gemini API throws an exception."""
        with patch('routes.chat.model') as mock_model:
            mock_model.generate_content.side_effect = Exception('API quota exceeded')

            response = client.post(
                '/api/chat/',
                data=json.dumps({'message': 'Hello'}),
                content_type='application/json'
            )
            assert response.status_code == 500
            data = json.loads(response.data)
            assert 'error' in data.get('message', '').lower() or 'Error' in data.get('message', '')

    def test_chat_sends_correct_content_type(self, client):
        """Should accept application/json content type."""
        with patch('routes.chat.model') as mock_model:
            mock_response = MagicMock()
            mock_response.text = 'Test response'
            mock_model.generate_content.return_value = mock_response

            response = client.post(
                '/api/chat/',
                data=json.dumps({'message': 'Test'}),
                content_type='application/json'
            )
            assert response.content_type.startswith('application/json')
