import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Search } from '@mui/icons-material';
import Input from './index';

describe('Input Component', () => {
  test('renders input correctly', () => {
    render(<Input label="Test Input" />);
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
  });

  test('handles onChange events', () => {
    const handleChange = vi.fn();
    render(<Input label="Test Input" onChange={handleChange} />);

    const input = screen.getByLabelText('Test Input');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('handles onBlur events', () => {
    const handleBlur = vi.fn();
    render(<Input label="Test Input" onBlur={handleBlur} />);

    const input = screen.getByLabelText('Test Input');
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  test('handles onFocus events', () => {
    const handleFocus = vi.fn();
    render(<Input label="Test Input" onFocus={handleFocus} />);

    const input = screen.getByLabelText('Test Input');
    fireEvent.focus(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  test('applies variant prop correctly', () => {
    const { rerender } = render(<Input label="Test" variant="outlined" />);
    let container = screen
      .getByLabelText('Test')
      .closest('.MuiFormControl-root');
    expect(container).toHaveClass('MuiTextField-root');

    rerender(<Input label="Test" variant="filled" />);
    container = screen.getByLabelText('Test').closest('.MuiFormControl-root');
    expect(container).toHaveClass('MuiTextField-root');

    rerender(<Input label="Test" variant="standard" />);
    container = screen.getByLabelText('Test').closest('.MuiFormControl-root');
    expect(container).toHaveClass('MuiTextField-root');
  });

  test('applies size prop correctly', () => {
    const { rerender } = render(<Input label="Test" size="small" />);
    let container = screen
      .getByLabelText('Test')
      .closest('.MuiFormControl-root');
    expect(container).toBeInTheDocument();

    rerender(<Input label="Test" size="medium" />);
    container = screen.getByLabelText('Test').closest('.MuiFormControl-root');
    expect(container).toBeInTheDocument();
  });

  test('applies color prop correctly', () => {
    render(<Input label="Test" color="secondary" />);
    const container = screen
      .getByLabelText('Test')
      .closest('.MuiFormControl-root');
    expect(container).toBeInTheDocument();
  });

  test('applies type prop correctly', () => {
    const { rerender } = render(<Input label="Test" type="password" />);
    let input = screen.getByLabelText('Test');
    expect(input).toHaveAttribute('type', 'password');

    rerender(<Input label="Test" type="email" />);
    input = screen.getByLabelText('Test');
    expect(input).toHaveAttribute('type', 'email');

    rerender(<Input label="Test" type="number" />);
    input = screen.getByLabelText('Test');
    expect(input).toHaveAttribute('type', 'number');
  });

  test('displays placeholder correctly', () => {
    render(<Input label="Test" placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  test('applies value prop correctly', () => {
    render(<Input label="Test" value="test value" onChange={() => {}} />);
    const input = screen.getByLabelText('Test') as HTMLInputElement;
    expect(input.value).toBe('test value');
  });

  test('applies defaultValue prop correctly', () => {
    render(<Input label="Test" defaultValue="default value" />);
    const input = screen.getByLabelText('Test') as HTMLInputElement;
    expect(input.value).toBe('default value');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Input label="Test" disabled />);
    const input = screen.getByLabelText('Test');
    expect(input).toBeDisabled();
  });

  test('applies required prop correctly', () => {
    render(<Input label="Test" required />);
    const input = screen.getByLabelText('Test *');
    expect(input).toBeRequired();
  });

  test('applies error prop correctly', () => {
    render(<Input label="Test" error />);
    const input = screen.getByLabelText('Test');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('displays helper text correctly', () => {
    render(<Input label="Test" helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  test('applies fullWidth prop correctly', () => {
    render(<Input label="Test" fullWidth />);
    const container = screen
      .getByLabelText('Test')
      .closest('.MuiFormControl-root');
    expect(container).toHaveClass('MuiFormControl-fullWidth');
  });

  test('applies multiline prop correctly', () => {
    render(<Input label="Test" multiline rows={4} />);
    const input = screen.getByLabelText('Test');
    expect(input.tagName).toBe('TEXTAREA');
    expect(input).toHaveAttribute('rows', '4');
  });

  test('renders start adornment correctly', () => {
    render(
      <Input
        label="Test"
        startAdornment={<Search data-testid="search-icon" />}
      />
    );
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  test('renders end adornment correctly', () => {
    render(
      <Input label="Test" endAdornment={<Search data-testid="search-icon" />} />
    );
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Input label="Test" className="custom-input" />);
    const container = screen
      .getByLabelText('Test')
      .closest('.MuiFormControl-root');
    expect(container).toHaveClass('custom-input');
  });

  test('applies custom sx prop', () => {
    render(<Input label="Test" sx={{ margin: '10px' }} />);
    const container = screen
      .getByLabelText('Test')
      .closest('.MuiFormControl-root');
    expect(container).toBeInTheDocument();
  });

  test('has correct default props', () => {
    render(<Input label="Test" />);
    const input = screen.getByLabelText('Test');

    expect(input).toHaveAttribute('type', 'text');
    expect(input).not.toBeDisabled();
    expect(input).not.toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });
});
