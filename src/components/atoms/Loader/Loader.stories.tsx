import type { Meta, StoryObj } from '@storybook/react';
import Loader from './index';

const meta: Meta<typeof Loader> = {
  title: 'Atoms/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 30, 50, 80],
    },
    color: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'inherit',
      ],
    },
    thickness: {
      control: { type: 'range', min: 1, max: 10, step: 0.1 },
    },
    variant: {
      control: { type: 'select' },
      options: ['determinate', 'indeterminate'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    disableShrink: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Loader size="small" />
      <Loader size="medium" />
      <Loader size="large" />
      <Loader size={80} />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Loader color="primary" />
      <Loader color="secondary" />
      <Loader color="success" />
      <Loader color="error" />
      <Loader color="warning" />
      <Loader color="info" />
    </div>
  ),
};

export const Determinate: Story = {
  args: {
    variant: 'determinate',
    value: 75,
  },
};

export const CustomThickness: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Loader thickness={1} />
      <Loader thickness={3.6} />
      <Loader thickness={6} />
      <Loader thickness={10} />
    </div>
  ),
};

export const WithDisableShrink: Story = {
  args: {
    disableShrink: true,
  },
};

export const Loading: Story = {
  args: {
    size: 'large',
    color: 'primary',
  },
};
