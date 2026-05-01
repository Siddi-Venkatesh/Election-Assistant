import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

// Mock framer-motion BEFORE importing Home
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

import Home from './Home';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const map = {
        step_1_title: 'Am I Eligible?',
        step_2_title: 'How to Register',
        step_3_title: 'Find Your Polling Booth',
        step_4_title: 'Voting Day Guidelines',
        step_5_title: 'Download e-EPIC',
        step_1_desc: 'Eligibility description',
        step_2_desc: 'Registration description',
        step_3_desc: 'Booth description',
        step_4_desc: 'Guidelines description',
        step_5_desc: 'Download description',
        step_1_action: 'Check Eligibility',
        step_2_action: 'Register Now',
        step_3_action: 'Search Booth',
        step_4_action: 'View Documents',
        step_5_action: 'Get Digital ID',
        for_first_time: 'For First-Time Voters',
        hero_title_1: 'Your Voice Matters.',
        hero_title_2: "Let's Get You Ready.",
        hero_desc: 'Hero description text',
        start_guide: 'Start Guide',
        back_to_timeline: 'Back to timeline',
        pro_tip: 'Pro tip text',
      };
      return map[key] || key;
    },
  }),
}));

// Mock analytics
vi.mock('../services/analytics', () => ({
  trackStepClicked: vi.fn(),
}));

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('Home Page', () => {
  it('renders the hero section with title and description', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('Your Voice Matters.')).toBeInTheDocument();
    expect(screen.getByText("Let's Get You Ready.")).toBeInTheDocument();
    expect(screen.getByText('Hero description text')).toBeInTheDocument();
  });

  it('renders the Start Guide button', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('Start Guide')).toBeInTheDocument();
  });

  it('renders all 5 timeline steps', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('Am I Eligible?')).toBeInTheDocument();
    expect(screen.getByText('How to Register')).toBeInTheDocument();
    expect(screen.getByText('Find Your Polling Booth')).toBeInTheDocument();
    expect(screen.getByText('Voting Day Guidelines')).toBeInTheDocument();
    expect(screen.getByText('Download e-EPIC')).toBeInTheDocument();
  });

  it('shows step detail when a step is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Home />);
    
    await user.click(screen.getByText('Am I Eligible?'));
    
    expect(screen.getByText('Eligibility description')).toBeInTheDocument();
    expect(screen.getByText('Check Eligibility')).toBeInTheDocument();
  });

  it('returns to timeline when back button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Home />);
    
    await user.click(screen.getByText('Am I Eligible?'));
    expect(screen.getByText('Back to timeline')).toBeInTheDocument();
    
    await user.click(screen.getByText('Back to timeline'));
    expect(screen.getByText('How to Register')).toBeInTheDocument();
  });

  it('shows the for first time voters badge', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('For First-Time Voters')).toBeInTheDocument();
  });
});
