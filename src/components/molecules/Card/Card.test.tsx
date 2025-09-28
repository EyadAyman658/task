import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Avatar, Button } from '@mui/material';
import Card from './index';

describe('Card Component', () => {
  test('renders card correctly', () => {
    render(<Card title="Test Card" content="Test content" />);
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('renders with children', () => {
    render(
      <Card title="Test Card">
        <div>Custom children content</div>
      </Card>
    );
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Custom children content')).toBeInTheDocument();
  });

  test('handles click events when clickable', () => {
    const handleClick = vi.fn();
    render(<Card title="Test Card" clickable onClick={handleClick} />);

    const card = screen
      .getByText('Test Card')
      .closest('.MuiCard-root') as HTMLElement;
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not handle click events when not clickable', () => {
    const handleClick = vi.fn();
    render(<Card title="Test Card" clickable={false} onClick={handleClick} />);

    const card = screen
      .getByText('Test Card')
      .closest('.MuiCard-root') as HTMLElement;
    fireEvent.click(card);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('does not handle click events when disabled', () => {
    const handleClick = vi.fn();
    render(<Card title="Test Card" clickable disabled onClick={handleClick} />);

    const card = screen
      .getByText('Test Card')
      .closest('.MuiCard-root') as HTMLElement;
    fireEvent.click(card);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies variant prop correctly', () => {
    const { rerender } = render(<Card title="Test" variant="elevation" />);
    let card = screen.getByText('Test').closest('.MuiCard-root');
    expect(card).toHaveClass('MuiCard-root');

    rerender(<Card title="Test" variant="outlined" />);
    card = screen.getByText('Test').closest('.MuiCard-root');
    expect(card).toHaveClass('MuiCard-root');
  });

  test('applies elevation prop correctly', () => {
    render(<Card title="Test" variant="elevation" elevation={8} />);
    const card = screen.getByText('Test').closest('.MuiCard-root');
    expect(card).toBeInTheDocument();
  });

  test('applies square prop correctly', () => {
    render(<Card title="Test" square />);
    const card = screen.getByText('Test').closest('.MuiCard-root');
    expect(card).toBeInTheDocument();
  });

  test('renders header with title and subtitle', () => {
    render(<Card title="Card Title" subtitle="Card Subtitle" />);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
  });

  test('renders avatar in header', () => {
    render(
      <Card
        title="Test Card"
        avatar={<Avatar data-testid="card-avatar">JD</Avatar>}
      />
    );
    expect(screen.getByTestId('card-avatar')).toBeInTheDocument();
  });

  test('renders image correctly', () => {
    render(
      <Card
        title="Test Card"
        image="test-image.jpg"
        imageAlt="Test Image"
        imageHeight={250}
      />
    );
    const image = screen.getByAltText('Test Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  test('renders actions correctly', () => {
    render(
      <Card
        title="Test Card"
        actions={<Button data-testid="card-action">Action</Button>}
      />
    );
    expect(screen.getByTestId('card-action')).toBeInTheDocument();
  });

  test('renders footer correctly', () => {
    render(
      <Card
        title="Test Card"
        footer={<div data-testid="card-footer">Footer content</div>}
      />
    );
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
  });

  test('shows loading skeleton when loading is true', () => {
    render(<Card loading title="Test Card" />);
    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test('shows loading skeleton for all sections when loading', () => {
    render(
      <Card
        loading
        title="Test Card"
        subtitle="Test Subtitle"
        image="test.jpg"
        actions="actions"
      />
    );
    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(3);
  });

  test('applies custom className', () => {
    render(<Card title="Test Card" className="custom-card" />);
    const card = screen.getByText('Test Card').closest('.MuiCard-root');
    expect(card).toHaveClass('custom-card');
  });

  test('applies custom sx prop', () => {
    render(<Card title="Test Card" sx={{ margin: '10px' }} />);
    const card = screen.getByText('Test Card').closest('.MuiCard-root');
    expect(card).toBeInTheDocument();
  });

  test('applies disabled styling correctly', () => {
    render(<Card title="Test Card" disabled />);
    const card = screen.getByText('Test Card').closest('.MuiCard-root');
    expect(card).toHaveStyle('opacity: 0.6');
    expect(card).toHaveStyle('pointer-events: none');
  });

  test('applies clickable cursor styling', () => {
    const { rerender } = render(<Card title="Test Card" clickable />);
    let card = screen.getByText('Test Card').closest('.MuiCard-root');
    expect(card).toHaveStyle('cursor: pointer');

    rerender(<Card title="Test Card" clickable={false} />);
    card = screen.getByText('Test Card').closest('.MuiCard-root');
    expect(card).toHaveStyle('cursor: default');
  });

  test('has correct default props', () => {
    render(<Card title="Test Card" />);
    const card = screen.getByText('Test Card').closest('.MuiCard-root');

    expect(card).toHaveClass('MuiCard-root');
    expect(card).toHaveStyle('cursor: default');
    expect(card).toHaveStyle('opacity: 1');
  });

  test('renders content and children together', () => {
    render(
      <Card title="Test Card" content="Card content">
        <div>Children content</div>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
    expect(screen.getByText('Children content')).toBeInTheDocument();
  });
});
