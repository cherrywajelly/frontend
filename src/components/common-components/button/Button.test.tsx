import { render, screen } from '@testing-library/react';

import Button from './Button';

describe('Button Component', () => {
  it('renders correctly with children', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
  });

  it('applies correct shape class based on shape prop', () => {
    render(<Button shape="rounded">Rounded Button</Button>);
    const button = screen.getByText('Rounded Button');
    expect(button).toHaveClass('rounded-full');

    render(<Button shape="square">Square Button</Button>);
    const squareButton = screen.getByText('Square Button');
    expect(squareButton).toHaveClass('rounded-[10px]');
  });

  it('applies correct color class based on color prop', () => {
    render(<Button color="primary">Primary Button</Button>);
    const button = screen.getByText('Primary Button');
    expect(button).toHaveClass('bg-primary-main');

    render(<Button color="secondary">Secondary Button</Button>);
    const secondaryButton = screen.getByText('Secondary Button');
    expect(secondaryButton).toHaveClass('bg-secondary-main');
  });

  it('disables the button when color is set to disabled', () => {
    render(<Button color="disabled">Disabled Button</Button>);
    const button = screen.getByText('Disabled Button');
    expect(button).toHaveClass('bg-gray-10');
    expect(button).toBeDisabled();
  });

  it('renders icons correctly', () => {
    render(
      <Button
        startIcon={<span data-testid="start-icon">Start</span>}
        endIcon={<span data-testid="end-icon">End</span>}
      >
        Icon Button
      </Button>,
    );
    const button = screen.getByText('Icon Button');
    const startIcon = screen.getByTestId('start-icon');
    const endIcon = screen.getByTestId('end-icon');

    expect(button).toContainElement(startIcon);
    expect(button).toContainElement(endIcon);
  });
});
