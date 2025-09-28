import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Modal from './index';

describe('Modal Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('renders modal content when open', () => {
    render(
      <Modal open onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  test('does not render modal content when closed', () => {
    render(
      <Modal open={false} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  test('renders title when provided', () => {
    render(
      <Modal open title="Test Modal" onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  test('renders close button by default', () => {
    render(
      <Modal open title="Test Modal" onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByLabelText('close')).toBeInTheDocument();
  });

  test('hides close button when showCloseButton is false', () => {
    render(
      <Modal
        open
        title="Test Modal"
        showCloseButton={false}
        onClose={mockOnClose}
      >
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.queryByLabelText('close')).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(
      <Modal open title="Test Modal" onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    fireEvent.click(screen.getByLabelText('close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when escape key is pressed', async () => {
    const user = userEvent.setup();
    render(
      <Modal open onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    // Focus the dialog first, then press Escape
    const dialog = screen.getByRole('dialog');
    dialog.focus();
    await user.keyboard('{Escape}');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when escape key is pressed and closeOnEscape is false', () => {
    render(
      <Modal open closeOnEscape={false} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('renders actions when provided', () => {
    const actions = <button data-testid="custom-action">Custom Action</button>;

    render(
      <Modal open actions={actions} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByTestId('custom-action')).toBeInTheDocument();
  });

  test('renders footer when provided', () => {
    const footer = <div data-testid="custom-footer">Footer content</div>;

    render(
      <Modal open footer={footer} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
  });

  test('applies small size correctly', () => {
    render(
      <Modal open size="small" onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('MuiDialog-paperWidthXs');
  });

  test('applies large size correctly', () => {
    render(
      <Modal open size="large" onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('MuiDialog-paperWidthLg');
  });

  test('applies fullscreen size correctly', () => {
    render(
      <Modal open size="fullscreen" onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('MuiDialog-paperFullScreen');
  });

  test('applies fullWidth prop correctly', () => {
    render(
      <Modal open fullWidth onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('MuiDialog-paperFullWidth');
  });

  test('renders without title header when title is not provided', () => {
    render(
      <Modal open onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  test('renders both footer and actions correctly', () => {
    const footer = <div data-testid="footer">Footer</div>;
    const actions = <button data-testid="action">Action</button>;

    render(
      <Modal open footer={footer} actions={actions} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('action')).toBeInTheDocument();
  });

  test('handles maxWidth prop correctly', () => {
    render(
      <Modal open maxWidth="lg" onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('MuiDialog-paperWidthLg');
  });
});
