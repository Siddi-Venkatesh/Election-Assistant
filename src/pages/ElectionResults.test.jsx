import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ElectionResults from './ElectionResults';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const map = {
        results_title: 'Election Results',
        results_desc: 'View election results and trends.',
      };
      return map[key] || key;
    },
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock recharts to avoid canvas issues in jsdom
vi.mock('recharts', () => ({
  BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => null,
  Cell: () => null,
}));

// Mock analytics
vi.mock('../services/analytics', () => ({
  trackResultsFilter: vi.fn(),
}));

// Mock election data
vi.mock('../data/electionData.json', () => ({
  default: {
    '2024': {
      'All India': {
        seats: [{ party: 'BJP', seats: 240 }, { party: 'INC', seats: 99 }],
        voteShare: [{ name: 'BJP', value: 36.6 }, { name: 'INC', value: 21.2 }],
      },
    },
    '2019': {
      'All India': {
        seats: [{ party: 'BJP', seats: 303 }],
        voteShare: [{ name: 'BJP', value: 37.4 }],
      },
    },
  },
}));

describe('ElectionResults Page', () => {
  it('renders the page title', () => {
    render(<ElectionResults />);
    expect(screen.getByText('Election Results')).toBeInTheDocument();
  });

  it('renders year and state dropdowns', () => {
    render(<ElectionResults />);
    expect(screen.getByLabelText(/Select election year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select state/i)).toBeInTheDocument();
  });

  it('renders chart containers', () => {
    render(<ElectionResults />);
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });

  it('renders the winner banner for default selection', () => {
    render(<ElectionResults />);
    const bjpElements = screen.getAllByText(/BJP/);
    expect(bjpElements.length).toBeGreaterThanOrEqual(1);
    // Winner banner should show 240 seats
    expect(screen.getByLabelText(/Winner: BJP with 240 seats/i)).toBeInTheDocument();
  });

  it('changes year when dropdown is changed', async () => {
    const user = userEvent.setup();
    render(<ElectionResults />);

    const yearSelect = screen.getByLabelText(/Select election year/i);
    await user.selectOptions(yearSelect, '2019');

    // After changing to 2019, the winner banner should update
    expect(screen.getByLabelText(/Winner: BJP with 303 seats/i)).toBeInTheDocument();
  });

  it('has screen reader summary of data', () => {
    render(<ElectionResults />);
    expect(screen.getByText(/Seat distribution for All India in 2024/i)).toBeInTheDocument();
  });
});
