import { render } from '@testing-library/react';
import { TextField, TextFieldStatus } from './text-field';
import { ReactComponent as MailSVG } from '../../assets/icons/mail.svg';
import { ReactComponent as CloseSVG } from '../../assets/icons/close.svg';

describe('TextField', () => {
  it('should render successfully', async () => {
    const el = render(<TextField name="email" onChange={() => null} />);
    expect(el.getByTestId('input')).toBeTruthy();
  });

  it('should render with status', async () => {
    const el = render(<TextField name="email" status={TextFieldStatus.success} onChange={() => null} />);
    expect(el.getByTestId('input')).toHaveClass('inputStyle-success');
  });

  it('should render with Icons', async () => {
    const el = render(<TextField name="email" placeholder="Email" onChange={() => null} LeftIcon={MailSVG} RightIcon={CloseSVG} />);
    expect(el.getByTestId('left-icon')).toBeTruthy();
    expect(el.getByTestId('right-icon')).toBeTruthy();
  });

  it('should render with Label', async () => {
    const el = render(<TextField name="email" label="Label" onChange={() => null} />);
    expect(el.findByText('Label')).toBeTruthy();
  });

  it('should render with Helper Text', async () => {
    const el = render(<TextField name="email" helperText="Helper" onChange={() => null} HelperIcon={CloseSVG} />);
    expect(el.findByText('Helper')).toBeTruthy();
    expect(el.getByTestId('helper-icon')).toBeTruthy();
  });
});
