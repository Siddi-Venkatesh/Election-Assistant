import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Eligibility from '../pages/Eligibility';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const map = {
        step_1_title: 'Am I Eligible?',
        step_2_title: 'How to Register',
        step_3_title: 'Find Booth',
        step_4_title: 'Voting Day',
        step_5_title: 'Download e-EPIC',
        step_1_desc: 'Eligibility info',
        step_2_desc: 'Registration info',
        step_3_desc: 'Booth info',
        step_4_desc: 'Guidelines info',
        step_5_desc: 'Download info',
        step_1_action: 'Check Eligibility',
        step_2_action: 'Register',
        step_3_action: 'Search',
        step_4_action: 'View',
        step_5_action: 'Download',
        for_first_time: 'First-time voters',
        hero_title_1: 'Your Voice',
        hero_title_2: 'Matters',
        hero_desc: 'Description',
        start_guide: 'Start',
        back_to_timeline: 'Back',
        pro_tip: 'Tip',
      };
      return map[key] || key;
    },
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
  trackStepClicked: vi.fn(),
}));

// Mock lucide-react for Eligibility
vi.mock('lucide-react', () => ({
  ChevronRight: (props) => <svg {...props} />,
  ArrowLeft: (props) => <svg {...props} />,
  CheckCircle: (props) => <svg {...props} />,
  CheckCircle2: (props) => <svg {...props} />,
  Info: (props) => <svg {...props} />,
  Calendar: (props) => <svg {...props} />,
  MapPin: (props) => <svg {...props} />,
  User: (props) => <svg {...props} />,
  Sparkles: (props) => <svg {...props} />,
  Download: (props) => <svg {...props} />,
  ShieldCheck: (props) => <svg {...props} />,
  UserCheck: (props) => <svg {...props} />,
  Scale: (props) => <svg {...props} />,
}));

describe('Navigation Flow Integration', () => {
  it('renders the home page at root', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eligibility" element={<Eligibility />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Your Voice')).toBeInTheDocument();
  });

  it('renders eligibility page at /eligibility', () => {
    render(
      <MemoryRouter initialEntries={['/eligibility']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eligibility" element={<Eligibility />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Eligibility Criteria')).toBeInTheDocument();
  });

  it('shows all 5 steps on home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Am I Eligible?')).toBeInTheDocument();
    expect(screen.getByText('How to Register')).toBeInTheDocument();
    expect(screen.getByText('Find Booth')).toBeInTheDocument();
    expect(screen.getByText('Voting Day')).toBeInTheDocument();
    expect(screen.getByText('Download e-EPIC')).toBeInTheDocument();
  });

  it('clicking a step shows its detail view', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    await user.click(screen.getByText('Am I Eligible?'));
    expect(screen.getByText('Eligibility info')).toBeInTheDocument();
    expect(screen.getByText('Check Eligibility')).toBeInTheDocument();
  });

  it('clicking back returns to the timeline', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    await user.click(screen.getByText('Am I Eligible?'));
    await user.click(screen.getByText('Back'));

    expect(screen.getByText('How to Register')).toBeInTheDocument();
  });
});
