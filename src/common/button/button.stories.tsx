import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './button';

export default {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    bSize: {
      control: {
        type: 'select',
      },
    },
    bStyle: {
      control: {
        type: 'select',
      },
    },
    bColor: {
      control: {
        type: 'select',
      },
    },
  },
  args: {
    children: 'Button',
    bStyle: 'filled',
    bColor: 'primary',
    bSize: 'm',
    disabled: false,
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

export const WithSize = Template.bind({});
WithSize.args = {
  bSize: 'xs',
};

export const WithStyle = Template.bind({});
WithStyle.args = {
  bStyle: 'stroke',
};

export const WithColor = Template.bind({});
WithColor.args = {
  bColor: 'secondary',
};

export const WithIconLeft = Template.bind({});
WithIconLeft.args = {
  leftIcon: <span>-</span>,
};

export const WithIconRight = Template.bind({});
WithIconRight.args = {
  rightIcon: <span>+</span>,
};

export const WithStateDisabled = Template.bind({});
WithStateDisabled.args = {
  disabled: true,
};

export const WithStateHover = Template.bind({});
WithStateHover.parameters = {
  pseudo: { hover: true },
};

export const WithStateFocus = Template.bind({});
WithStateFocus.parameters = {
  pseudo: { focus: true },
};

export const WithStatePressed = Template.bind({});
WithStatePressed.parameters = {
  pseudo: { active: true },
};
