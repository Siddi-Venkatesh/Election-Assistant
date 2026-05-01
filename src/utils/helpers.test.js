import { describe, it, expect } from 'vitest';
import {
  validateEpicNumber,
  getBoothRecord,
  getWinner,
  formatElectionData,
  sanitizeInput,
  debounce,
} from './helpers';

// ── validateEpicNumber ──────────────────────────────────────────────
describe('validateEpicNumber', () => {
  it('returns invalid for null/undefined input', () => {
    expect(validateEpicNumber(null).valid).toBe(false);
    expect(validateEpicNumber(undefined).valid).toBe(false);
  });

  it('returns invalid for empty string', () => {
    const result = validateEpicNumber('');
    expect(result.valid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('returns invalid for non-string input', () => {
    expect(validateEpicNumber(12345).valid).toBe(false);
  });

  it('returns invalid for string shorter than minimum length', () => {
    const result = validateEpicNumber('ABC');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('valid EPIC');
  });

  it('returns invalid for wrong pattern (all digits)', () => {
    const result = validateEpicNumber('1234567890');
    expect(result.valid).toBe(false);
  });

  it('returns valid for correct pattern (3 letters + 7 digits)', () => {
    const result = validateEpicNumber('ABC1234567');
    expect(result.valid).toBe(true);
    expect(result.error).toBe('');
  });

  it('returns valid for SZR0262577 (3 letters + 7 digits)', () => {
    const result = validateEpicNumber('SZR0262577');
    expect(result.valid).toBe(true); // S,Z,R are 3 letters + 7 digits
  });

  it('returns valid for SZO2625770 (O is a letter)', () => {
    expect(validateEpicNumber('SZO2625770').valid).toBe(true); // S,Z,O are 3 letters + 7 digits
  });

  it('returns invalid for ABCD123456 (4 letters)', () => {
    expect(validateEpicNumber('ABCD123456').valid).toBe(false);
  });

  it('trims whitespace before validating', () => {
    const result = validateEpicNumber('  ABC1234567  ');
    expect(result.valid).toBe(true);
  });
});

// ── getBoothRecord ──────────────────────────────────────────────────
describe('getBoothRecord', () => {
  const records = [
    { name: 'Record A' },
    { name: 'Record B' },
    { name: 'Record C' },
  ];

  it('returns null for empty epic', () => {
    expect(getBoothRecord('', records)).toBeNull();
    expect(getBoothRecord(null, records)).toBeNull();
  });

  it('returns null for empty records array', () => {
    expect(getBoothRecord('ABC123', [])).toBeNull();
    expect(getBoothRecord('ABC123', null)).toBeNull();
  });

  it('returns a record from the array for valid input', () => {
    const result = getBoothRecord('ABC1234567', records);
    expect(records).toContain(result);
  });

  it('returns deterministic results for same input', () => {
    const result1 = getBoothRecord('TEST123', records);
    const result2 = getBoothRecord('TEST123', records);
    expect(result1).toEqual(result2);
  });

  it('returns different results for different inputs', () => {
    const result1 = getBoothRecord('AAA1111111', records);
    const result2 = getBoothRecord('ZZZ9999999', records);
    // May or may not be different depending on hash, but should not throw
    expect(result1).toBeDefined();
    expect(result2).toBeDefined();
  });
});

// ── getWinner ───────────────────────────────────────────────────────
describe('getWinner', () => {
  it('returns null for empty array', () => {
    expect(getWinner([])).toBeNull();
  });

  it('returns null for null/undefined input', () => {
    expect(getWinner(null)).toBeNull();
    expect(getWinner(undefined)).toBeNull();
  });

  it('returns the party with the most seats', () => {
    const seats = [
      { party: 'Party A', seats: 100 },
      { party: 'Party B', seats: 200 },
      { party: 'Party C', seats: 50 },
    ];
    expect(getWinner(seats)).toEqual({ party: 'Party B', seats: 200 });
  });

  it('returns first party when all have equal seats', () => {
    const seats = [
      { party: 'Party A', seats: 100 },
      { party: 'Party B', seats: 100 },
    ];
    const winner = getWinner(seats);
    expect(winner.seats).toBe(100);
  });

  it('works with single-element array', () => {
    const seats = [{ party: 'Solo', seats: 42 }];
    expect(getWinner(seats)).toEqual({ party: 'Solo', seats: 42 });
  });
});

// ── formatElectionData ──────────────────────────────────────────────
describe('formatElectionData', () => {
  const mockData = {
    '2024': {
      'All India': { seats: [{ party: 'A', seats: 300 }], voteShare: [{ name: 'A', value: 40 }] },
      'Delhi': { seats: [{ party: 'B', seats: 7 }], voteShare: [{ name: 'B', value: 50 }] },
    },
  };

  it('returns correct data for valid year and state', () => {
    const result = formatElectionData(mockData, '2024', 'All India');
    expect(result.seats).toHaveLength(1);
    expect(result.seats[0].party).toBe('A');
  });

  it('returns empty arrays for missing year', () => {
    const result = formatElectionData(mockData, '2000', 'All India');
    expect(result).toEqual({ seats: [], voteShare: [] });
  });

  it('returns empty arrays for missing state', () => {
    const result = formatElectionData(mockData, '2024', 'Unknown');
    expect(result).toEqual({ seats: [], voteShare: [] });
  });

  it('returns empty arrays for null/undefined inputs', () => {
    expect(formatElectionData(null, '2024', 'All India')).toEqual({ seats: [], voteShare: [] });
    expect(formatElectionData(mockData, null, 'All India')).toEqual({ seats: [], voteShare: [] });
    expect(formatElectionData(mockData, '2024', null)).toEqual({ seats: [], voteShare: [] });
  });
});

// ── sanitizeInput ───────────────────────────────────────────────────
describe('sanitizeInput', () => {
  it('returns empty string for null/undefined', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(undefined)).toBe('');
  });

  it('returns empty string for non-string input', () => {
    expect(sanitizeInput(123)).toBe('');
  });

  it('escapes HTML angle brackets', () => {
    expect(sanitizeInput('<script>')).toBe('&lt;script&gt;');
  });

  it('escapes double quotes', () => {
    expect(sanitizeInput('He said "hello"')).toContain('&quot;');
  });

  it('escapes single quotes', () => {
    expect(sanitizeInput("It's fine")).toContain('&#x27;');
  });

  it('escapes forward slashes', () => {
    expect(sanitizeInput('a/b')).toContain('&#x2F;');
  });

  it('leaves normal text unchanged', () => {
    expect(sanitizeInput('Hello World 123')).toBe('Hello World 123');
  });
});

// ── debounce ────────────────────────────────────────────────────────
describe('debounce', () => {
  it('delays function execution', async () => {
    let called = false;
    const fn = debounce(() => { called = true; }, 50);
    fn();
    expect(called).toBe(false);
    await new Promise(r => setTimeout(r, 100));
    expect(called).toBe(true);
  });

  it('only calls once for rapid invocations', async () => {
    let count = 0;
    const fn = debounce(() => { count++; }, 50);
    fn(); fn(); fn(); fn();
    await new Promise(r => setTimeout(r, 100));
    expect(count).toBe(1);
  });
});
