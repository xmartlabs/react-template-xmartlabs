import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { TextField, TextFieldStatus } from './text-field';
import { ReactComponent as MailSVG } from '../../assets/icons/mail.svg';
import { ReactComponent as CloseSVG } from '../../assets/icons/close.svg';

const ICONS = {
  MailSVG,
  CloseSVG,
  undefined,
};

export default {
  title: 'Common/Text Field',
  component: TextField,
  argTypes: {
    status: {
      control: {
        type: 'select',
      },
    },
    leftIcon: {
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: 'select',
        labels: {
          undefined: 'None',
          MailSVG: 'Mail',
          CloseSVG: 'Close',
        },
      },
    },
    rightIcon: {
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: 'select',
        labels: {
          undefined: 'None',
          MailSVG: 'Mail',
          CloseSVG: 'Close',
        },
      },
    },
    helperIcon: {
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: 'select',
        labels: {
          undefined: 'None',
          MailSVG: 'Mail',
          CloseSVG: 'Close',
        },
      },
    },
  },
  args: {
    name: 'example',
  } as unknown as ComponentMeta<typeof TextField>,
};

const Template: ComponentStory<typeof TextField> = (args) => {
  const [inputState, setInputState] = useState('');
  const handleIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };
  return <TextField {...args} onChange={handleIChange} value={inputState} />;
};

export const Default = Template.bind({});

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  helperIcon: MailSVG,
  helperText: 'This is just a recommendation',
};

export const WithStatusSuccess = Template.bind({});
WithStatusSuccess.args = {
  helperIcon: MailSVG,
  helperText: 'This is just a recommendation',
  status: TextFieldStatus.success,
};

export const WithStatusError = Template.bind({});
WithStatusError.args = {
  helperIcon: MailSVG,
  helperText: 'This is just a recommendation',
  status: TextFieldStatus.error,
};

export const WithPlaceHolder = Template.bind({});
WithPlaceHolder.args = {
  placeholder: 'Enter a nice messaje',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Label',
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  leftIcon: MailSVG,
  rightIcon: CloseSVG,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  helperIcon: CloseSVG,
  helperText: 'Input disabled',
};
