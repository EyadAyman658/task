import type { Meta, StoryObj } from '@storybook/react';
import { Add, Save } from '@mui/icons-material';
import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined', 'text'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
  },
  args: {
    onClick: () => console.log('Button clicked'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  args: {
    children: 'Contained Button',
    variant: 'contained',
  },
  render: args => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button {...args} variant="contained">
        Contained
      </Button>
      <Button {...args} variant="outlined">
        Outlined
      </Button>
      <Button {...args} variant="text">
        Text
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Button',
    variant: 'contained',
  },
  render: args => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button {...args} size="small">
        Small
      </Button>
      <Button {...args} size="medium">
        Medium
      </Button>
      <Button {...args} size="large">
        Large
      </Button>
    </div>
  ),
};

export const Colors: Story = {
  args: {
    children: 'Button',
    variant: 'contained',
  },
  render: args => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="error">
        Error
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="info">
        Info
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    children: 'Button with Icon',
    variant: 'contained',
  },
  render: args => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button {...args} startIcon={<Add />}>
        Start Icon
      </Button>
      <Button {...args} endIcon={<Save />}>
        End Icon
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    variant: 'contained',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'contained',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    variant: 'contained',
    fullWidth: true,
  },
};
