import type { Meta, StoryObj } from '@storybook/react';
import { Business, AccountCircle } from '@mui/icons-material';
import Logo from './index';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 32, 64, 100],
    },
    variant: {
      control: { type: 'select' },
      options: ['square', 'rounded', 'circular'],
    },
    clickable: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
  args: {
    onClick: () => console.log('Logo clicked'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://mui.com/static/logo.png',
    alt: 'MUI Logo',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Logo
        src="https://mui.com/static/logo.png"
        alt="Small Logo"
        size="small"
      />
      <Logo
        src="https://mui.com/static/logo.png"
        alt="Medium Logo"
        size="medium"
      />
      <Logo
        src="https://mui.com/static/logo.png"
        alt="Large Logo"
        size="large"
      />
      <Logo
        src="https://mui.com/static/logo.png"
        alt="Custom Size Logo"
        size={100}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Logo
        src="https://mui.com/static/logo.png"
        alt="Square Logo"
        variant="square"
        size="large"
      />
      <Logo
        src="https://mui.com/static/logo.png"
        alt="Rounded Logo"
        variant="rounded"
        size="large"
      />
      <Logo
        src="https://mui.com/static/logo.png"
        alt="Circular Logo"
        variant="circular"
        size="large"
      />
    </div>
  ),
};

export const Fallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Logo alt="No Image Logo" size="large" />
      <Logo
        alt="Custom Fallback Logo"
        size="large"
        fallbackIcon={<Business />}
      />
      <Logo
        alt="Account Logo"
        size="large"
        fallbackIcon={<AccountCircle />}
        variant="circular"
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Logo loading size="small" variant="square" />
      <Logo loading size="medium" variant="rounded" />
      <Logo loading size="large" variant="circular" />
    </div>
  ),
};

export const Clickable: Story = {
  args: {
    src: 'https://mui.com/static/logo.png',
    alt: 'Clickable Logo',
    clickable: true,
    size: 'large',
  },
};

export const BrokenImage: Story = {
  args: {
    src: 'https://broken-image-url.com/not-found.png',
    alt: 'Broken Image Logo',
    size: 'large',
  },
};

export const WithCustomFallback: Story = {
  args: {
    src: 'https://broken-image-url.com/not-found.png',
    alt: 'Custom Fallback Logo',
    size: 'large',
    fallbackIcon: <Business />,
    variant: 'rounded',
  },
};

export const AllVariantsWithFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Logo
        fallbackIcon={<Business />}
        variant="square"
        size="large"
        alt="Square Fallback"
      />
      <Logo
        fallbackIcon={<Business />}
        variant="rounded"
        size="large"
        alt="Rounded Fallback"
      />
      <Logo
        fallbackIcon={<Business />}
        variant="circular"
        size="large"
        alt="Circular Fallback"
      />
    </div>
  ),
};
