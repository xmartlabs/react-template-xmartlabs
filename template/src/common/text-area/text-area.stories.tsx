import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { TextArea, TextAreaStatus } from './text-area';
import { ReactComponent as CloseSVG } from '../../assets/icons/close.svg';

export default {
  title: 'Common/Text Area',
  component: TextArea,
  argTypes: {
    status: {
      control: {
        type: 'select',
      },
    },
  },
  args: {
    name: 'example',
    rows: 4,
    cols: 10,
  } as unknown as ComponentMeta<typeof TextArea>,
};

const Template: ComponentStory<typeof TextArea> = (args) => {
  const [inputState, setInputState] = useState('');
  const handleIChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputState(e.target.value);
  };
  return <TextArea {...args} onChange={handleIChange} value={inputState} />;
};

export const Default = Template.bind({});

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  HelperIcon: CloseSVG,
  helperText: 'This is just a recommendation',
};

export const WithStatusSuccess = Template.bind({});
WithStatusSuccess.args = {
  HelperIcon: CloseSVG,
  helperText: 'This is just a recommendation',
  status: TextAreaStatus.success,
};

export const WithStatusError = Template.bind({});
WithStatusError.args = {
  HelperIcon: CloseSVG,
  helperText: 'This is just a recommendation',
  status: TextAreaStatus.error,
};

export const WithPlaceHolder = Template.bind({});
WithPlaceHolder.args = {
  placeholder: 'Enter a nice messaje',
};

export const WithMaxLength = Template.bind({});
WithMaxLength.args = {
  maxLength: 20,
  helperText: 'Helper Text',
  HelperIcon: CloseSVG,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Label',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  HelperIcon: CloseSVG,
  helperText: 'Text Area disabled',
  maxLength: 100,
};
