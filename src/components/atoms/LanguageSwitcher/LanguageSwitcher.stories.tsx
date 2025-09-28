import type { Meta, StoryObj } from '@storybook/react';
import LanguageSwitcher from './index';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Atoms/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['button', 'menu'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    showLabel: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'menu',
    size: 'medium',
    showLabel: true,
  },
};

export const MenuVariant: Story = {
  args: {
    variant: 'menu',
    size: 'medium',
    showLabel: true,
  },
};

export const ButtonVariant: Story = {
  args: {
    variant: 'button',
    size: 'medium',
    showLabel: true,
  },
};

export const Sizes: Story = {
  args: {
    variant: 'menu',
    showLabel: true,
  },
  render: args => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <LanguageSwitcher {...args} size="small" />
      <LanguageSwitcher {...args} size="medium" />
      <LanguageSwitcher {...args} size="large" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    variant: 'menu',
    size: 'medium',
    showLabel: false,
  },
};

export const ButtonWithoutLabel: Story = {
  args: {
    variant: 'button',
    size: 'medium',
    showLabel: false,
  },
};

export const Variants: Story = {
  args: {
    size: 'medium',
    showLabel: true,
  },
  render: args => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{ marginBottom: '0.5rem', fontSize: '14px', color: '#666' }}
        >
          Menu Variant
        </div>
        <LanguageSwitcher {...args} variant="menu" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{ marginBottom: '0.5rem', fontSize: '14px', color: '#666' }}
        >
          Button Variant
        </div>
        <LanguageSwitcher {...args} variant="button" />
      </div>
    </div>
  ),
};

export const CompactSizes: Story = {
  args: {
    showLabel: false,
  },
  render: args => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: '#666', minWidth: '100px' }}>
          Menu (compact):
        </span>
        <LanguageSwitcher {...args} variant="menu" size="small" />
        <LanguageSwitcher {...args} variant="menu" size="medium" />
        <LanguageSwitcher {...args} variant="menu" size="large" />
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: '#666', minWidth: '100px' }}>
          Button (compact):
        </span>
        <LanguageSwitcher {...args} variant="button" size="small" />
        <LanguageSwitcher {...args} variant="button" size="medium" />
        <LanguageSwitcher {...args} variant="button" size="large" />
      </div>
    </div>
  ),
};
