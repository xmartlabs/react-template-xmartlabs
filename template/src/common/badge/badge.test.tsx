// test for badge component

import { render } from '@testing-library/react';
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
    const { getByText } = render(<Badge bgColor="#FF0000" color="#FFFFFF" closeIconBgColor="#000000" closeIconColor="#FFFFFF" closeable closeIcon="X">Badge</Badge>);
    expect(getByText('Badge')).toHaveStyle('background-color: #FF0000');
    expect(getByText('Badge')).toHaveStyle('color: #FFFFFF');
    expect(getByText('X')).toHaveStyle('background-color: #000000');
    expect(getByText('X')).toHaveStyle('color: #FFFFFF');
  });

  it('should call the onClose function when the close icon is clicked', () => {
    const onClose = jest.fn();
    const { getByText } = render(<Badge closeable closeIcon="X" onClose={onClose} />);
    getByText('X').click();
    expect(onClose).toHaveBeenCalled();
  });
});
