import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const map = {
        app_title: 'VoterAssist',
        chat_greeting: 'Hi! Ask me anything.',
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
vi.mock('./services/analytics', () => ({
  trackPageView: vi.fn(),
  trackChatOpened: vi.fn(),
  trackChatMessageSent: vi.fn(),
  trackLanguageChanged: vi.fn(),
  trackThemeToggled: vi.fn(),
}));

// Mock lazy loaded pages
vi.mock('./pages/Home', () => ({ default: () => <div>Home Page</div> }));
vi.mock('./pages/Eligibility', () => ({ default: () => <div>Eligibility Page</div> }));
vi.mock('./pages/Register', () => ({ default: () => <div>Register Page</div> }));
vi.mock('./pages/Booth', () => ({ default: () => <div>Booth Page</div> }));
vi.mock('./pages/Guidelines', () => ({ default: () => <div>Guidelines Page</div> }));
vi.mock('./pages/ElectionResults', () => ({ default: () => <div>Results Page</div> }));
vi.mock('./pages/DownloadEpic', () => ({ default: () => <div>Download Page</div> }));

describe('App Component', () => {
  it('renders the header with app title', async () => {
    render(<App />);
    expect(await screen.findByText('VoterAssist')).toBeInTheDocument();
  });

  it('renders the home page by default', async () => {
    render(<App />);
    expect(await screen.findByText('Home Page')).toBeInTheDocument();
  });

  it('renders the skip navigation link', async () => {
    render(<App />);
    expect(await screen.findByText('Skip to main content')).toBeInTheDocument();
  });

  it('renders the chat trigger button', async () => {
    render(<App />);
    expect(await screen.findByLabelText(/Open AI Chat/i)).toBeInTheDocument();
  });

  it('opens chat panel when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const trigger = await screen.findByLabelText(/Open AI Chat/i);
    await user.click(trigger);

    expect(await screen.findByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('Hi! Ask me anything.')).toBeInTheDocument();
  });

  it('renders dark mode toggle with correct label', async () => {
    render(<App />);
    expect(await screen.findByLabelText(/Switch to dark mode/i)).toBeInTheDocument();
  });

  it('renders the language selector', async () => {
    render(<App />);
    expect(await screen.findByLabelText(/Select language/i)).toBeInTheDocument();
  });

  it('renders the footer', async () => {
    render(<App />);
    expect(await screen.findByText(/Powered by Google Gemini/)).toBeInTheDocument();
  });

  it('has main landmark with proper role', async () => {
    render(<App />);
    const main = await screen.findByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('has navigation landmark', async () => {
    render(<App />);
    const nav = await screen.findByRole('navigation', { name: /Main navigation/i });
    expect(nav).toBeInTheDocument();
  });
});
