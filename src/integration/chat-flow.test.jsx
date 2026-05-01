import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const map = {
        app_title: 'VoterAssist',
        chat_greeting: 'Hi! Ask me anything about elections.',
        chat_placeholder: 'Type your question...',
      };
      return map[key] || key;
    },
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock analytics
vi.mock('../services/analytics', () => ({
  trackPageView: vi.fn(),
  trackChatOpened: vi.fn(),
  trackChatMessageSent: vi.fn(),
  trackLanguageChanged: vi.fn(),
  trackThemeToggled: vi.fn(),
}));

// Mock pages
vi.mock('../pages/Home', () => ({ default: () => <div>Home Page</div> }));
vi.mock('../pages/Eligibility', () => ({ default: () => <div>Eligibility Page</div> }));
vi.mock('../pages/Register', () => ({ default: () => <div>Register Page</div> }));
vi.mock('../pages/Booth', () => ({ default: () => <div>Booth Page</div> }));
vi.mock('../pages/Guidelines', () => ({ default: () => <div>Guidelines Page</div> }));
vi.mock('../pages/ElectionResults', () => ({ default: () => <div>Results Page</div> }));
vi.mock('../pages/DownloadEpic', () => ({ default: () => <div>Download Page</div> }));

// Mock API
vi.mock('../services/api', () => ({
  api: {
    sendChatMessage: vi.fn(),
  },
}));

import { api } from '../services/api';

describe('Chat Flow Integration', () => {
  it('completes a full chat interaction: open → type → submit → response', async () => {
    api.sendChatMessage.mockResolvedValue('You need to be 18+ to vote.');
    const user = userEvent.setup();
    render(<App />);

    // Open chat
    const trigger = await screen.findByLabelText(/Open AI Chat/i);
    await user.click(trigger);

    // Verify chat opened
    expect(await screen.findByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('Hi! Ask me anything about elections.')).toBeInTheDocument();

    // Type a message
    const input = screen.getByPlaceholderText('Type your question...');
    await user.type(input, 'Am I eligible to vote?');

    // Submit
    const sendBtn = screen.getByLabelText(/Send message/i);
    await user.click(sendBtn);

    // Verify response appears
    await waitFor(() => {
      expect(screen.getByText('You need to be 18+ to vote.')).toBeInTheDocument();
    });
  });

  it('shows error message when API fails', async () => {
    api.sendChatMessage.mockRejectedValue(new Error('Server error'));
    const user = userEvent.setup();
    render(<App />);

    const trigger = await screen.findByLabelText(/Open AI Chat/i);
    await user.click(trigger);

    const input = screen.getByPlaceholderText('Type your question...');
    await user.type(input, 'Hello');

    const sendBtn = screen.getByLabelText(/Send message/i);
    await user.click(sendBtn);

    await waitFor(() => {
      expect(screen.getByText(/Server error/i)).toBeInTheDocument();
    });
  });

  it('closes chat when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const trigger = await screen.findByLabelText(/Open AI Chat/i);
    await user.click(trigger);

    expect(await screen.findByText('AI Assistant')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText(/Close chat/i);
    await user.click(closeBtn);

    // Trigger should reappear
    expect(await screen.findByLabelText(/Open AI Chat/i)).toBeInTheDocument();
  });

  it('does not submit empty messages', async () => {
    const user = userEvent.setup();
    render(<App />);

    const trigger = await screen.findByLabelText(/Open AI Chat/i);
    await user.click(trigger);

    const sendBtn = screen.getByLabelText(/Send message/i);
    expect(sendBtn).toBeDisabled();
  });
});
