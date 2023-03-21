// test for button component
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { BaseButton } from './base-button';

describe('BaseButton', () => {
  it('should render successfully', async () => {
    const el = render(<BaseButton />);
    expect(await el.findByText('Button')).toBeTruthy();
  });

  it('should render successfully with children', async () => {
    const el = render(<BaseButton>Test</BaseButton>);
    expect(await el.findByText('Test')).toBeTruthy();
  });

  it('should render successfully with type', async () => {
    const el = render(<BaseButton type="submit">Test</BaseButton>);
    expect(await (await el.findByText('Test')).getAttribute('type')).toBe('submit');
  });
});
