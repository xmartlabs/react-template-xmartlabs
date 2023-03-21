import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './avatar';

describe('Avatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Avatar />);
    expect(baseElement).toBeTruthy();
  });

  it('should render with figure', () => {
    render(<Avatar size="xs" />);
    const avatar = screen.getByRole('figure');
    expect(avatar).toBeTruthy();
  });

  it('should render with color and bgColor', () => {
    render(<Avatar bgColor="#fff" color="#000" />);
    const avatar = screen.getByRole('figure');
    expect(avatar.style.backgroundColor).toBe('rgb(255, 255, 255)');
    expect(avatar.style.color).toBe('rgb(0, 0, 0)');
  });

  it('should render with image src', () => {
    render(<Avatar src="https://i.imgur.com/vXvQgtM.jpeg" />);
    const avatar = screen.getByRole('figure');
    const image = avatar?.querySelector('img');
    expect(image?.src).toBe('https://i.imgur.com/vXvQgtM.jpeg');
  });

  it('should render with icon', () => {
    render(<Avatar iconComponent={<span>+</span>} />);
    const icon = screen.getByText('+');
    expect(icon).toBeTruthy();
  });
});
