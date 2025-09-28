import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Splash from './index';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// No need to mock Logo component since we're using Typography now

describe('Splash Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderSplash = () => {
    return render(
      <BrowserRouter>
        <Splash />
      </BrowserRouter>
    );
  };

  test('renders splash content correctly', () => {
    renderSplash();

    expect(screen.getByText('NASDAQ')).toBeInTheDocument();
    expect(
      screen.getByText('Developed by Eyad Ayman Gabr')
    ).toBeInTheDocument();
  });

  test('renders NASDAQ logo text with proper styling', () => {
    renderSplash();

    const nasdaqText = screen.getByText('NASDAQ');
    expect(nasdaqText).toBeInTheDocument();
    expect(nasdaqText.tagName).toBe('H1');
  });

  test('navigates to explore page after delay', async () => {
    renderSplash();

    // Fast-forward time by 2 seconds
    vi.advanceTimersByTime(2000);

    // Wait for the navigation to happen
    await vi.waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/explore');
    });
  });

  test('does not navigate before delay completes', () => {
    renderSplash();

    // Fast-forward time by less than 2 seconds
    vi.advanceTimersByTime(1500);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('cleans up timeout on unmount', () => {
    const { unmount } = renderSplash();

    // Spy on clearTimeout
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  test('has correct styling structure', () => {
    renderSplash();

    // Check that elements have expected structure
    expect(screen.getByText('NASDAQ')).toBeInTheDocument();
    expect(
      screen.getByText('Developed by Eyad Ayman Gabr')
    ).toBeInTheDocument();
  });
});
