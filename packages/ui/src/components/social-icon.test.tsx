import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SocialIcon } from './social-icon';

describe('SocialIcon', () => {
  it('renders with icon and link', () => {
    render(<SocialIcon icon="fa-brands fa-github" href="https://github.com" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://github.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders text when provided', () => {
    render(<SocialIcon icon="fa-brands fa-github" href="https://github.com" text="GitHub" />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });
});
