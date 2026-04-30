const API_URL = '/api';

export const api = {
  async sendChatMessage(message) {
    const response = await fetch(`${API_URL}/chat/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to send message');
    return data.response;
  }
};
