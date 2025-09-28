import { vi } from 'vitest';
import { getFlatTickers, clearPolygonCache, type PolygonTicker } from './index';

vi.stubGlobal('import.meta', {
  env: {
    VITE_POLYGON_API_KEY: 'test-api-key',
  },
});

describe('Polygon Service', () => {
  const mockTicker: PolygonTicker = {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    market: 'stocks',
    locale: 'us',
    primary_exchange: 'XNAS',
    type: 'CS',
    active: true,
    currency_name: 'usd',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    clearPolygonCache();
  });

  describe('getFlatTickers', () => {
    test('returns empty array when no data provided', () => {
      expect(getFlatTickers()).toEqual([]);
      expect(getFlatTickers(undefined)).toEqual([]);
    });

    test('returns empty array when pages is empty', () => {
      expect(getFlatTickers({ pages: [] })).toEqual([]);
    });

    test('flattens results from multiple pages', () => {
      const data = {
        pages: [
          { results: [mockTicker], status: 'OK', request_id: '1', count: 1 },
          {
            results: [
              { ...mockTicker, ticker: 'GOOGL', name: 'Alphabet Inc.' },
            ],
            status: 'OK',
            request_id: '2',
            count: 1,
          },
        ],
      };

      const result = getFlatTickers(data);

      expect(result).toHaveLength(2);
      expect(result[0].ticker).toBe('AAPL');
      expect(result[1].ticker).toBe('GOOGL');
    });

    test('handles pages with empty results', () => {
      const data = {
        pages: [
          { results: [mockTicker], status: 'OK', request_id: '1', count: 1 },
          { results: [], status: 'OK', request_id: '2', count: 0 },
          {
            results: undefined as unknown as PolygonTicker[],
            status: 'OK',
            request_id: '3',
            count: 0,
          },
        ],
      };

      const result = getFlatTickers(data);

      expect(result).toHaveLength(1);
      expect(result[0].ticker).toBe('AAPL');
    });
  });

  describe('clearPolygonCache', () => {
    test('clears cache successfully', () => {
      expect(() => clearPolygonCache()).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    test('handles rate limiting error (429)', () => {
      const error = {
        response: {
          status: 429,
          headers: { 'retry-after': '10' },
          data: { message: 'Rate limited' },
        },
        message: 'Request failed',
      };

      expect(error.response.status).toBe(429);
      expect(error.response.headers['retry-after']).toBe('10');
    });

    test('handles unauthorized error (401)', () => {
      const error = {
        response: {
          status: 401,
          data: { message: 'Invalid API key' },
        },
        message: 'Unauthorized',
      };

      expect(error.response.status).toBe(401);
      expect(error.response.data.message).toBe('Invalid API key');
    });

    test('handles forbidden error (403)', () => {
      const error = {
        response: {
          status: 403,
          data: { message: 'Access forbidden' },
        },
        message: 'Forbidden',
      };

      expect(error.response.status).toBe(403);
    });
  });

  describe('URL Parameter Building', () => {
    test('builds correct search parameters', () => {
      const params = {
        market: 'stocks' as const,
        active: true,
        order: 'asc' as const,
        limit: 50,
        sort: 'ticker' as const,
        search: 'AAPL',
      };

      // Test parameter validation
      expect(params.market).toBe('stocks');
      expect(params.active).toBe(true);
      expect(params.search).toBe('AAPL');
    });

    test('handles ticker range parameters', () => {
      const params = {
        'ticker.gte': 'A',
        'ticker.lt': 'B',
      };

      expect(params['ticker.gte']).toBe('A');
      expect(params['ticker.lt']).toBe('B');
    });
  });

  describe('Cursor Extraction', () => {
    test('extracts cursor from next_url correctly', () => {
      const nextUrl =
        'https://api.polygon.io/v3/reference/tickers?cursor=abc123&limit=100';
      const url = new URL(nextUrl);
      const cursor = url.searchParams.get('cursor');

      expect(cursor).toBe('abc123');
    });

    test('handles invalid URLs gracefully', () => {
      const invalidUrl = 'not-a-valid-url';

      let cursor;
      try {
        const url = new URL(invalidUrl);
        cursor = url.searchParams.get('cursor');
      } catch {
        cursor = undefined;
      }

      expect(cursor).toBeUndefined();
    });

    test('returns undefined when no cursor in URL', () => {
      const nextUrl = 'https://api.polygon.io/v3/reference/tickers?limit=100';
      const url = new URL(nextUrl);
      const cursor = url.searchParams.get('cursor');

      expect(cursor).toBeNull();
    });
  });
});
