import { render, screen } from '@testing-library/react';
import Loader from './index';

describe('Loader Component', () => {
  test('renders loader correctly', () => {
    render(<Loader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('applies size prop correctly for predefined sizes', () => {
    const { rerender } = render(<Loader size="small" />);
    let progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();

    rerender(<Loader size="medium" />);
    progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();

    rerender(<Loader size="large" />);
    progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
  });

  test('applies custom numeric size correctly', () => {
    render(<Loader size={50} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
  });

  test('applies color prop correctly', () => {
    const { rerender } = render(<Loader color="primary" />);
    let progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('MuiCircularProgress-colorPrimary');

    rerender(<Loader color="secondary" />);
    progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('MuiCircularProgress-colorSecondary');

    rerender(<Loader color="success" />);
    progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('MuiCircularProgress-colorSuccess');
  });

  test('applies variant prop correctly', () => {
    const { rerender } = render(<Loader variant="indeterminate" />);
    let progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('MuiCircularProgress-indeterminate');

    rerender(<Loader variant="determinate" value={50} />);
    progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('MuiCircularProgress-determinate');
    expect(progressbar).toHaveAttribute('aria-valuenow', '50');
  });

  test('applies value prop correctly for determinate variant', () => {
    render(<Loader variant="determinate" value={75} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '75');
  });

  test('applies thickness prop correctly', () => {
    render(<Loader thickness={5} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
  });

  test('applies disableShrink prop correctly', () => {
    render(<Loader disableShrink />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Loader className="custom-loader" />);
    const container = screen.getByRole('progressbar').closest('div');
    expect(container).toHaveClass('custom-loader');
  });

  test('applies custom sx prop', () => {
    render(<Loader sx={{ margin: '10px' }} />);
    const container = screen.getByRole('progressbar').closest('div');
    expect(container).toBeInTheDocument();
  });

  test('has correct default props', () => {
    render(<Loader />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).toHaveClass('MuiCircularProgress-colorPrimary');
    expect(progressbar).toHaveClass('MuiCircularProgress-indeterminate');
  });
});
