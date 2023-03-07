import { render } from '@testing-library/react';
import { TextArea, TextAreaStatus } from './text-area';
import { ReactComponent as CloseSVG } from '../../assets/icons/close.svg';

describe('TextArea', () => {
  it('should render successfully', async () => {
    const el = render(<TextArea name="random" onChange={() => null} />);
    expect(el.getByTestId('textarea')).toBeTruthy();
  });

  it('should render with status', async () => {
    const el = render(<TextArea name="random" status={TextAreaStatus.success} onChange={() => null} />);
    expect(el.getByTestId('textarea')).toHaveClass('inputStyle-success');
  });

  it('should render with Label', async () => {
    const el = render(<TextArea name="random" label="Label" onChange={() => null} />);
    expect(el.findByText('Label')).toBeTruthy();
  });

  it('should render with Helper Text', async () => {
    const el = render(<TextArea name="email" helperText="Helper" onChange={() => null} HelperIcon={CloseSVG} />);
    expect(el.findByText('Helper')).toBeTruthy();
    expect(el.getByTestId('helper-icon')).toBeTruthy();
  });

  it('should render with MaxLength', async () => {
    const el = render(<TextArea name="email" maxLength={10} onChange={() => null} />);
    expect(el.findByText('/10')).toBeTruthy();
  });

  it('should render with Value and MaxLength', async () => {
    const el = render(<TextArea name="email" value="Hi" maxLength={10} onChange={() => null} />);
    expect(el.findByText('Hi')).toBeTruthy();
    expect(el.findByText('2/10')).toBeTruthy();
  });
});
