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
    LeftIcon: {
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
    RightIcon: {
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
    HelperIcon: {
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
  HelperIcon: MailSVG,
  helperText: 'This is just a recommendation',
};

export const WithStatusSuccess = Template.bind({});
WithStatusSuccess.args = {
  HelperIcon: MailSVG,
  helperText: 'This is just a recommendation',
  status: TextFieldStatus.success,
};

export const WithStatusError = Template.bind({});
WithStatusError.args = {
  HelperIcon: MailSVG,
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
  LeftIcon: MailSVG,
  RightIcon: CloseSVG,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  HelperIcon: CloseSVG,
  helperText: 'Input disabled',
};
