import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import LanguageSwitcher from './index';

// Mock the useLanguageSwitcher hook
const mockSwitchLanguage = vi.fn();
const mockToggleLanguage = vi.fn();

vi.mock('../../../hooks/useLanguageSwitcher', () => ({
  useLanguageSwitcher: () => ({
    currentLanguage: 'en',
    availableLanguages: ['en', 'ar'],
    switchLanguage: mockSwitchLanguage,
    toggleLanguage: mockToggleLanguage,
  }),
}));

describe('LanguageSwitcher Component', () => {
  beforeEach(() => {
    mockSwitchLanguage.mockClear();
    mockToggleLanguage.mockClear();
  });

  test('renders menu variant by default', () => {
    render(<LanguageSwitcher />);

    expect(
      screen.getByRole('button', { name: /english/i })
    ).toBeInTheDocument();
    expect(screen.getByText('🇺🇸')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  test('renders button variant correctly', () => {
    render(<LanguageSwitcher variant="button" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('🇺🇸')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  test('hides label when showLabel is false', () => {
    render(<LanguageSwitcher showLabel={false} />);

    expect(screen.getByText('🇺🇸')).toBeInTheDocument();
    expect(screen.queryByText('English')).not.toBeInTheDocument();
  });

  test('calls toggleLanguage when button variant is clicked', () => {
    render(<LanguageSwitcher variant="button" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockToggleLanguage).toHaveBeenCalledTimes(1);
  });

  test('opens menu when menu variant is clicked', () => {
    render(<LanguageSwitcher variant="menu" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('العربية')).toBeInTheDocument();
  });

  test('calls switchLanguage when menu item is selected', async () => {
    mockSwitchLanguage.mockResolvedValue(undefined);

    render(<LanguageSwitcher variant="menu" />);

    // Open the menu
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Click on Arabic option
    const arabicOption = screen.getByText('العربية');
    fireEvent.click(arabicOption);

    await waitFor(() => {
      expect(mockSwitchLanguage).toHaveBeenCalledWith('ar');
    });
  });

  test('closes menu when menu item is selected', async () => {
    mockSwitchLanguage.mockResolvedValue(undefined);

    render(<LanguageSwitcher variant="menu" />);

    // Open the menu
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByRole('menu')).toBeInTheDocument();

    // Click on Arabic option
    const arabicOption = screen.getByText('العربية');
    fireEvent.click(arabicOption);

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  test('applies size prop correctly', () => {
    const { rerender } = render(<LanguageSwitcher size="small" />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-sizeSmall');

    rerender(<LanguageSwitcher size="medium" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-sizeMedium');

    rerender(<LanguageSwitcher size="large" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-sizeLarge');
  });

  test('shows current language flag and label', () => {
    render(<LanguageSwitcher />);

    expect(screen.getByText('🇺🇸')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  test('has correct accessibility attributes for menu variant', () => {
    render(<LanguageSwitcher variant="menu" />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-haspopup', 'true');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('id', 'language-switcher-button');
  });

  test('updates accessibility attributes when menu is open', () => {
    render(<LanguageSwitcher variant="menu" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-controls', 'language-switcher-menu');
  });

  test('renders language options with correct flags and labels', () => {
    render(<LanguageSwitcher variant="menu" />);

    // Open the menu
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Check English option
    expect(screen.getAllByText('🇺🇸')).toHaveLength(2); // One in button, one in menu
    expect(screen.getAllByText('English')).toHaveLength(2); // One in button, one in menu

    // Check Arabic option
    expect(screen.getByText('🇸🇦')).toBeInTheDocument();
    expect(screen.getByText('العربية')).toBeInTheDocument();
  });

  test('highlights selected language in menu', () => {
    render(<LanguageSwitcher variant="menu" />);

    // Open the menu
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Find menu items
    const menuItems = screen.getAllByRole('menuitem');
    const englishMenuItem = menuItems.find(item =>
      item.textContent?.includes('English')
    );

    expect(englishMenuItem).toHaveAttribute('aria-selected', 'true');
  });
});
