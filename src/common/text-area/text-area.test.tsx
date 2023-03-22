import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TextArea } from './text-area';
import { ReactComponent as CloseSVG } from '../../assets/icons/close.svg';

describe('TextArea', () => {
  it('should render successfully', async () => {
    const el = render(<TextArea name="random" onChange={() => null} />);
    expect(el.getByTestId('textarea')).toBeTruthy();
  });

  it('should render with Label', async () => {
    const el = render(<TextArea name="random" label="Label" onChange={() => null} />);
    expect(el.findByText('Label')).toBeTruthy();
  });

  it('should render with Helper Text', async () => {
    const el = render(<TextArea name="email" helperText="Helper" onChange={() => null} helperIcon={CloseSVG} />);
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
