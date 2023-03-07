import { render, screen } from '@testing-library/react';
import { TextField, TextFieldStatus } from './text-field';
import { ReactComponent as MailSVG } from '../../assets/icons/mail.svg';
import { ReactComponent as CloseSVG } from '../../assets/icons/close.svg';

describe('TextField', () => {
  it('should render successfully', async () => {
    const el = render(<TextField name='email' onChange={()=> null}/>);
    expect(screen.getByTestId('input')).toBeTruthy();
  });

  it('should render with status', async () => {
    const el = render(<TextField name='email' status={TextFieldStatus.success} onChange={()=> null} />);
    expect(screen.getByTestId('input')).toHaveClass('inputStyle-success');
  });

  it('should render with Icons', async () => {
    const el = render(<TextField name='email' placeholder='Email' onChange={()=> null} LeftIcon={MailSVG} RightIcon={CloseSVG} />);
    expect(screen.getByTestId('left-icon')).toBeTruthy();
    expect(screen.getByTestId('right-icon')).toBeTruthy();
  });
});
