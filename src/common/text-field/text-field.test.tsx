import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TextField } from './text-field';
import { ReactComponent as MailSVG } from '../../assets/icons/mail.svg';
import { ReactComponent as CloseSVG } from '../../assets/icons/close.svg';

describe('TextField', () => {
  it('should render successfully', async () => {
    const el = render(<TextField name="email" onChange={() => null} />);
    expect(el.getByTestId('input')).toBeTruthy();
  });

  it('should render with Icons', async () => {
    const el = render(<TextField name="email" placeholder="Email" onChange={() => null} leftIcon={MailSVG} rightIcon={CloseSVG} />);
    expect(el.getByTestId('left-icon')).toBeTruthy();
    expect(el.getByTestId('right-icon')).toBeTruthy();
  });

  it('should render with Label', async () => {
    const el = render(<TextField name="email" label="Label" onChange={() => null} />);
    expect(el.findByText('Label')).toBeTruthy();
  });

  it('should render with Helper Text', async () => {
    const el = render(<TextField name="email" helperText="Helper" onChange={() => null} helperIcon={CloseSVG} />);
    expect(el.findByText('Helper')).toBeTruthy();
    expect(el.getByTestId('helper-icon')).toBeTruthy();
  });
});
