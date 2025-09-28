import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Add } from '@mui/icons-material';
import Button from './index';

describe('Button Component', () => {
  test('renders children correctly', () => {
    render(<Button>Test Button</Button>);
    expect(
      screen.getByRole('button', { name: 'Test Button' })
    ).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('shows loading state correctly', () => {
    render(<Button loading>Loading Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('applies variant prop correctly', () => {
    const { rerender } = render(<Button variant="contained">Contained</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-contained');

    rerender(<Button variant="outlined">Outlined</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-outlined');

    rerender(<Button variant="text">Text</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-text');
  });

  test('applies size prop correctly', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-sizeSmall');

    rerender(<Button size="medium">Medium</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-sizeMedium');

    rerender(<Button size="large">Large</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-sizeLarge');
  });

  test('applies color prop correctly', () => {
    const { rerender } = render(<Button color="primary">Primary</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-colorPrimary');

    rerender(<Button color="secondary">Secondary</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-colorSecondary');
  });

  test('applies fullWidth prop correctly', () => {
    render(<Button fullWidth>Full Width</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-fullWidth');
  });

  test('renders start icon correctly', () => {
    render(
      <Button startIcon={<Add data-testid="start-icon" />}>
        With Start Icon
      </Button>
    );

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  test('renders end icon correctly', () => {
    render(
      <Button endIcon={<Add data-testid="end-icon" />}>With End Icon</Button>
    );

    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  test('hides end icon when loading', () => {
    render(
      <Button loading endIcon={<Add data-testid="end-icon" />}>
        Loading with End Icon
      </Button>
    );

    expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('does not call onClick when loading', () => {
    const handleClick = vi.fn();
    render(
      <Button loading onClick={handleClick}>
        Loading Button
      </Button>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
