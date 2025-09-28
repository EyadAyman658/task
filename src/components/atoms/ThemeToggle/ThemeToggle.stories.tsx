import type { Meta, StoryObj } from '@storybook/react';
import ThemeToggle from '.';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '../../../theme';
import { useThemeStore } from '../../../store/theme';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Atoms/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    Story => {
      useThemeStore.setState({
        preference: 'system',
        systemTheme: 'light',
        mode: 'light',
        currentTheme: lightTheme,
      });

      return (
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      );
    },
  ],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    showLabels: {
      control: 'boolean',
    },
  },
  args: {
    size: 'small',
    orientation: 'horizontal',
    showLabels: false,
  },
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

export const WithLabels: Story = {
  args: {
    showLabels: true,
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    showLabels: true,
  },
};
