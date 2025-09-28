import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Business } from '@mui/icons-material';
import Logo from './index';

describe('Logo Component', () => {
  test('renders logo with image correctly', () => {
    render(<Logo src="test-image.png" alt="Test Logo" />);
    expect(screen.getByAltText('Test Logo')).toBeInTheDocument();
  });

  test('renders fallback when no src provided', () => {
    render(<Logo alt="Test Logo" />);
    expect(screen.getByTestId('ImageIcon')).toBeInTheDocument();
  });

  test('renders loading skeleton when loading is true', () => {
    render(<Logo loading alt="Test Logo" />);
    expect(document.querySelector('.MuiSkeleton-root')).toBeInTheDocument();
  });

  test('handles click events when clickable', () => {
    const handleClick = vi.fn();
    render(
      <Logo
        src="test-image.png"
        alt="Test Logo"
        clickable
        onClick={handleClick}
      />
    );

    const logo = screen.getByAltText('Test Logo');
    fireEvent.click(logo);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not handle click events when not clickable', () => {
    const handleClick = vi.fn();
    render(
      <Logo
        src="test-image.png"
        alt="Test Logo"
        clickable={false}
        onClick={handleClick}
      />
    );

    const logo = screen.getByAltText('Test Logo');
    fireEvent.click(logo);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies size prop correctly for predefined sizes', () => {
    const { rerender } = render(<Logo alt="Test Logo" size="small" />);
    let avatar = screen.getByTestId('ImageIcon');
    expect(avatar).toBeInTheDocument();

    rerender(<Logo alt="Test Logo" size="medium" />);
    avatar = screen.getByTestId('ImageIcon');
    expect(avatar).toBeInTheDocument();

    rerender(<Logo alt="Test Logo" size="large" />);
    avatar = screen.getByTestId('ImageIcon');
    expect(avatar).toBeInTheDocument();
  });

  test('applies custom numeric size correctly', () => {
    render(<Logo alt="Test Logo" size={100} />);
    const avatar = screen.getByTestId('ImageIcon');
    expect(avatar).toBeInTheDocument();
  });

  test('applies variant prop correctly', () => {
    const { rerender } = render(<Logo alt="Test Logo" variant="square" />);
    let avatar = document.querySelector('.MuiAvatar-square');
    expect(avatar).toBeInTheDocument();

    rerender(<Logo alt="Test Logo" variant="rounded" />);
    avatar = document.querySelector('.MuiAvatar-rounded');
    expect(avatar).toBeInTheDocument();

    rerender(<Logo alt="Test Logo" variant="circular" />);
    avatar = document.querySelector('.MuiAvatar-circular');
    expect(avatar).toBeInTheDocument();
  });

  test('renders custom fallback icon', () => {
    render(
      <Logo
        alt="Test Logo"
        fallbackIcon={<Business data-testid="business-icon" />}
      />
    );
    expect(screen.getByTestId('business-icon')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Logo alt="Test Logo" className="custom-logo" />);
    const container = document.querySelector('.custom-logo');
    expect(container).toBeInTheDocument();
  });

  test('applies custom sx prop', () => {
    render(<Logo alt="Test Logo" sx={{ margin: '10px' }} />);
    const avatar = screen.getByTestId('ImageIcon');
    expect(avatar).toBeInTheDocument();
  });

  test('handles image load error and shows fallback', async () => {
    render(<Logo src="broken-image.png" alt="Test Logo" />);

    const img = screen.getByAltText('Test Logo');
    fireEvent.error(img);

    await waitFor(() => {
      expect(screen.getByTestId('ImageIcon')).toBeInTheDocument();
    });
  });

  test('shows loading skeleton while image loads', () => {
    render(<Logo src="test-image.png" alt="Test Logo" />);

    // Initially shows skeleton while loading
    expect(document.querySelector('.MuiSkeleton-root')).toBeInTheDocument();
  });

  test('has correct default props', () => {
    render(<Logo alt="Test Logo" />);
    const container = document.querySelector('.MuiAvatar-square');
    expect(container).toBeInTheDocument();
  });

  test('applies correct cursor style when clickable', () => {
    const { rerender } = render(<Logo alt="Test Logo" clickable />);
    let avatar = document.querySelector('.MuiAvatar-root');
    expect(avatar).toHaveStyle('cursor: pointer');

    rerender(<Logo alt="Test Logo" clickable={false} />);
    avatar = document.querySelector('.MuiAvatar-root');
    expect(avatar).toHaveStyle('cursor: default');
  });

  test('renders with image src correctly', () => {
    render(<Logo src="test-image.png" alt="Test Logo" />);
    const img = screen.getByAltText('Test Logo');
    expect(img).toHaveAttribute('src', 'test-image.png');
  });
});
