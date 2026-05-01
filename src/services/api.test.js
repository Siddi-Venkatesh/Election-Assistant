import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './api';

describe('api.sendChatMessage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('sends a POST request with the message and returns the response', async () => {
    const mockResponse = { response: 'Hello! I can help you with elections.' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await api.sendChatMessage('How do I register?');

    expect(global.fetch).toHaveBeenCalledWith('/api/chat/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'How do I register?' }),
    });
    expect(result).toBe('Hello! I can help you with elections.');
  });

  it('throws an error when the response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Bad request' }),
    });

    await expect(api.sendChatMessage('test')).rejects.toThrow('Bad request');
  });

  it('throws a default error message when server returns no message', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({}),
    });

    await expect(api.sendChatMessage('test')).rejects.toThrow('Failed to send message');
  });

  it('throws when fetch itself fails (network error)', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(api.sendChatMessage('test')).rejects.toThrow('Network error');
  });

  it('sends the exact message content provided', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ response: 'ok' }),
    });

    await api.sendChatMessage('What is EPIC?');

    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body.message).toBe('What is EPIC?');
  });
});
