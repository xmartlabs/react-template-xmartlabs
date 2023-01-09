// test for button component

import { render } from '@testing-library/react';
import { Avatar } from './avatar';

describe('Avatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Avatar />);
    expect(baseElement).toBeTruthy();
  });

  it('should render with size', () => {
    const { baseElement } = render(<Avatar size="xs" />);
    const avatar = baseElement.querySelector('.avatar');
    expect(avatar).toHaveClass('avatar-xs');
  });

  it('should render with colors', () => {
    const { baseElement } = render(<Avatar bgColor="#fff" color="#000" />);
    const avatar = baseElement.querySelector('.avatar');
    expect(avatar).toHaveAttribute('style', 'background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);');
  });

  it('should render with image', () => {
    const { baseElement } = render(<Avatar src="https://i.imgur.com/vXvQgtM.jpeg" />);
    const avatar = baseElement.querySelector('.avatar');
    const image = avatar?.querySelector('img');
    expect(image).toHaveAttribute('src', 'https://i.imgur.com/vXvQgtM.jpeg');
  });

  it('should render with icon', () => {
    const { baseElement } = render(<Avatar iconComponent={<span>+</span>} />);
    const avatarWrapper = baseElement.querySelector('.avatarWrapper');
    const icon = avatarWrapper?.querySelector('.avatarIcon');
    expect(icon).toHaveTextContent('+');
  });
});
