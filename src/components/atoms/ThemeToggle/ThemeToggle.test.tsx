import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ThemeToggle from '.';
import { useThemeStore } from '../../../store/theme';
import { lightTheme } from '../../../theme';

describe('ThemeToggle', () => {
  const renderToggle = (
    props: Partial<React.ComponentProps<typeof ThemeToggle>> = {}
  ) => {
    return render(
      <ThemeProvider theme={createTheme()}>
        <ThemeToggle {...props} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    useThemeStore.setState({
      preference: 'system',
      mode: 'light',
      systemTheme: 'light',
      currentTheme: lightTheme,
    });
  });

  test('renders all theme options', () => {
    renderToggle();

    expect(
      screen.getByRole('button', { name: /Light theme/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Dark theme/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /System \(Light\) theme/i })
    ).toBeInTheDocument();
  });

  test('updates theme preference when selecting dark mode', async () => {
    const user = userEvent.setup();
    renderToggle();

    await user.click(screen.getByRole('button', { name: /Dark theme/i }));

    expect(useThemeStore.getState().preference).toBe('dark');
    expect(screen.getByRole('button', { name: /Dark theme/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  test('shows system label with current system theme', () => {
    useThemeStore.setState({ systemTheme: 'dark' });

    renderToggle({ showLabels: true });

    expect(screen.getByText(/System \(Dark\)/i)).toBeInTheDocument();
  });
});
