import type { Meta, StoryObj } from '@storybook/react';
import TickerCard from './TickerCard';
import type { PolygonTicker } from '../../../services/Explore';

const meta: Meta<typeof TickerCard> = {
  title: 'Pages/Explore/TickerCard',
  component: TickerCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockTicker: PolygonTicker = {
  ticker: 'AAPL',
  name: 'Apple Inc.',
  market: 'stocks',
  locale: 'us',
  primary_exchange: 'XNAS',
  type: 'CS',
  active: true,
  currency_name: 'usd',
  last_updated_utc: '2023-12-01T00:00:00Z',
};

const longNameTicker: PolygonTicker = {
  ticker: 'GOOGL',
  name: 'Alphabet Inc. Class A - A Technology Holding Company with a Very Long Name for Testing Purposes',
  market: 'stocks',
  locale: 'us',
  primary_exchange: 'XNAS',
  type: 'CS',
  active: true,
  currency_name: 'usd',
};

const forexTicker: PolygonTicker = {
  ticker: 'C:EURUSD',
  name: 'Euro - US Dollar',
  market: 'forex',
  locale: 'global',
  primary_exchange: 'FX',
  type: 'forex',
  active: true,
  currency_name: 'usd',
};

const cryptoTicker: PolygonTicker = {
  ticker: 'X:BTCUSD',
  name: 'Bitcoin - US Dollar',
  market: 'crypto',
  locale: 'global',
  primary_exchange: 'CRYPTO',
  type: 'cryptocurrency',
  active: true,
  currency_name: 'usd',
};

const inactiveTicker: PolygonTicker = {
  ticker: 'INACTIVE',
  name: 'Inactive Corporation',
  market: 'stocks',
  locale: 'us',
  primary_exchange: 'XNYS',
  type: 'CS',
  active: false,
  currency_name: 'usd',
};

export const Default: Story = {
  args: {
    ticker: mockTicker,
  },
};

export const Loading: Story = {
  args: {
    ticker: mockTicker,
    loading: true,
  },
};

export const WithLongName: Story = {
  args: {
    ticker: longNameTicker,
  },
};

export const ForexTicker: Story = {
  args: {
    ticker: forexTicker,
  },
};

export const CryptoTicker: Story = {
  args: {
    ticker: cryptoTicker,
  },
};

export const InactiveTicker: Story = {
  args: {
    ticker: inactiveTicker,
  },
};

export const MinimalData: Story = {
  args: {
    ticker: {
      ticker: 'TEST',
      name: 'Test Corporation',
      market: 'stocks',
      locale: 'us',
      primary_exchange: '',
      type: '',
      active: true,
    } as PolygonTicker,
  },
};

export const NYSEStock: Story = {
  args: {
    ticker: {
      ...mockTicker,
      ticker: 'WMT',
      name: 'Walmart Inc.',
      primary_exchange: 'XNYS',
    },
  },
};

export const Grid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
        padding: '1rem',
        maxWidth: '1200px',
      }}
    >
      <TickerCard ticker={mockTicker} />
      <TickerCard ticker={longNameTicker} />
      <TickerCard ticker={forexTicker} />
      <TickerCard ticker={cryptoTicker} />
      <TickerCard ticker={inactiveTicker} />
      <TickerCard ticker={mockTicker} loading />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const DifferentMarkets: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        maxWidth: '400px',
      }}
    >
      <TickerCard ticker={mockTicker} />
      <TickerCard ticker={forexTicker} />
      <TickerCard ticker={cryptoTicker} />
    </div>
  ),
};

export const ActiveStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
      }}
    >
      <TickerCard ticker={{ ...mockTicker, active: true }} />
      <TickerCard
        ticker={{ ...mockTicker, active: false, ticker: 'INACTIVE' }}
      />
    </div>
  ),
};

export const Exchanges: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        maxWidth: '400px',
      }}
    >
      <TickerCard ticker={{ ...mockTicker, primary_exchange: 'XNAS' }} />
      <TickerCard
        ticker={{
          ...mockTicker,
          ticker: 'IBM',
          name: 'IBM Corp.',
          primary_exchange: 'XNYS',
        }}
      />
      <TickerCard
        ticker={{
          ...mockTicker,
          ticker: 'CUSTOM',
          name: 'Custom Exchange',
          primary_exchange: 'CUSTOM',
        }}
      />
    </div>
  ),
};
