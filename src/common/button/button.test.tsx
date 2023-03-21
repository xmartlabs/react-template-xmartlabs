// test for button component
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('should render successfully', async () => {
    const el = render(<Button />);
    expect(await el.findByText('Button')).toBeTruthy();
  });

  it('should render with icon', async () => {
    const el = render(<Button leftIcon={<span>Icon</span>} />);
    expect(await el.findByText('Icon')).toBeTruthy();
  });
});
