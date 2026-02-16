import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomepageButton } from './homepage-button';

describe('HomepageButton', () => {
  it('renders button text', () => {
    render(<HomepageButton buttonText="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('renders with href', () => {
    render(<HomepageButton buttonText="Link" href="https://example.com" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
