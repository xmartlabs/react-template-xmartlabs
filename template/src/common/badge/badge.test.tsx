// test for badge component

import { render } from '@testing-library/react';
import {
  describe, expect, it, vi,
} from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Badge />);
    expect(baseElement).toBeTruthy();
  });

  it('should render with the correct text', () => {
    const { getByText } = render(<Badge>Badge</Badge>);
    expect(getByText('Badge')).toBeTruthy();
  });

  it('should render with the correct left element', () => {
    const { getByText } = render(<Badge leftElement={<span>Left Element</span>} />);
    expect(getByText('Left Element')).toBeTruthy();
  });

  it('should render with the correct close icon', () => {
    const { getByText } = render(<Badge closeable closeIcon="X" />);
    expect(getByText('X')).toBeTruthy();
  });

  it('should render with the correct colors', () => {
    const { getByText } = render(<Badge bgColor="rgb(255, 0, 0)" color="rgb(255, 255, 255)" closeIconBgColor="rgb(0, 0, 0)" closeIconColor="rgb(255, 255, 255)" closeable closeIcon="X">Badge</Badge>);
    expect(getByText('Badge').style.backgroundColor).toBe('rgb(255, 0, 0)');
    expect(getByText('Badge').style.color).toBe('rgb(255, 255, 255)');
    expect(getByText('X').style.backgroundColor).toBe('rgb(0, 0, 0)');
    expect(getByText('X').style.color).toBe('rgb(255, 255, 255)');
  });

  it('should call the onClose function when the close icon is clicked', () => {
    const onClose = vi.fn();
    const { getByText } = render(<Badge closeable closeIcon="X" onClose={onClose} />);
    getByText('X').click();
    expect(onClose).toHaveBeenCalled();
  });
});
