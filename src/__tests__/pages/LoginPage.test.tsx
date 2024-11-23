import LoginPage from '@/app/login/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('LoginPage', () => {
  it('renders the TimeToast logo', () => {
    render(<LoginPage />);

    const logo = screen.getByAltText('timetoast');
    expect(logo).toBeInTheDocument();
  });

  it('renders the TimeToast heading', () => {
    render(<LoginPage />);

    const heading = screen.getByText('TimeToast');
    expect(heading).toBeInTheDocument();
  });
});
