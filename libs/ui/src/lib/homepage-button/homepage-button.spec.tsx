import { render } from '@testing-library/react';

import HomepageButton from './homepage-button';

describe('HomepageButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomepageButton />);
    expect(baseElement).toBeTruthy();
  });
});
