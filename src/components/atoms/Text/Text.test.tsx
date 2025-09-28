import { render, screen } from '@testing-library/react';
import Text from './index';

describe('Text Component', () => {
  test('renders children correctly', () => {
    render(<Text>Test text content</Text>);
    expect(screen.getByText('Test text content')).toBeInTheDocument();
  });

  test('applies variant prop correctly', () => {
    const { rerender } = render(<Text variant="h1">Heading 1</Text>);
    let text = screen.getByText('Heading 1');
    expect(text).toHaveClass('MuiTypography-h1');

    rerender(<Text variant="body1">Body text</Text>);
    text = screen.getByText('Body text');
    expect(text).toHaveClass('MuiTypography-body1');

    rerender(<Text variant="caption">Caption text</Text>);
    text = screen.getByText('Caption text');
    expect(text).toHaveClass('MuiTypography-caption');
  });

  test('applies component prop correctly', () => {
    render(<Text component="span">Span text</Text>);
    const text = screen.getByText('Span text');
    expect(text.tagName).toBe('SPAN');
  });

  test('applies color prop correctly', () => {
    const { rerender } = render(<Text color="primary">Primary text</Text>);
    let text = screen.getByText('Primary text');
    expect(text).toBeInTheDocument();

    rerender(<Text color="secondary">Secondary text</Text>);
    text = screen.getByText('Secondary text');
    expect(text).toBeInTheDocument();

    rerender(<Text color="error">Error text</Text>);
    text = screen.getByText('Error text');
    expect(text).toBeInTheDocument();
  });

  test('applies textAlign prop correctly', () => {
    const { rerender } = render(<Text textAlign="center">Centered text</Text>);
    let text = screen.getByText('Centered text');
    expect(text).toBeInTheDocument();

    rerender(<Text textAlign="right">Right aligned text</Text>);
    text = screen.getByText('Right aligned text');
    expect(text).toBeInTheDocument();

    rerender(<Text textAlign="justify">Justified text</Text>);
    text = screen.getByText('Justified text');
    expect(text).toBeInTheDocument();
  });

  test('applies gutterBottom prop correctly', () => {
    render(<Text gutterBottom>Text with gutter</Text>);
    const text = screen.getByText('Text with gutter');
    expect(text).toHaveClass('MuiTypography-gutterBottom');
  });

  test('applies noWrap prop correctly', () => {
    render(<Text noWrap>Text that should not wrap</Text>);
    const text = screen.getByText('Text that should not wrap');
    expect(text).toHaveClass('MuiTypography-noWrap');
  });

  test('applies component prop correctly for paragraph', () => {
    render(<Text component="p">Paragraph text</Text>);
    const text = screen.getByText('Paragraph text');
    expect(text.tagName).toBe('P');
  });

  test('applies custom className', () => {
    render(<Text className="custom-text">Custom text</Text>);
    const text = screen.getByText('Custom text');
    expect(text).toHaveClass('custom-text');
  });

  test('applies custom sx prop', () => {
    render(<Text sx={{ margin: '10px' }}>Text with sx</Text>);
    const text = screen.getByText('Text with sx');
    expect(text).toBeInTheDocument();
  });

  test('has correct default props', () => {
    render(<Text>Default text</Text>);
    const text = screen.getByText('Default text');

    expect(text).toHaveClass('MuiTypography-body1');
    expect(text).not.toHaveClass('MuiTypography-gutterBottom');
    expect(text).not.toHaveClass('MuiTypography-noWrap');
  });

  test('renders with different HTML elements based on variant', () => {
    const { rerender } = render(<Text variant="h1">Heading</Text>);
    let text = screen.getByText('Heading');
    expect(text.tagName).toBe('H1');

    rerender(<Text variant="h2">Heading 2</Text>);
    text = screen.getByText('Heading 2');
    expect(text.tagName).toBe('H2');

    rerender(<Text variant="body1">Body</Text>);
    text = screen.getByText('Body');
    expect(text.tagName).toBe('P');
  });
});
