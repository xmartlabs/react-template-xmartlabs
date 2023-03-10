import React from 'react';
import { render } from '@testing-library/react';

import { App } from 'app';

describe('App', () => {
  it('should render correctly', () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
