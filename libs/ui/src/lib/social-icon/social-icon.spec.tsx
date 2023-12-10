import { render } from '@testing-library/react';

import SocialIcon from './social-icon';

describe('SocialIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SocialIcon />);
    expect(baseElement).toBeTruthy();
  });
});
