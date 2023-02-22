import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar } from 'common/avatar';
import { Badge } from './badge';

export default {
  title: 'Common/Badge',
  component: Badge,
  args: {
    children: 'Badge',
    closeable: false,
    bgColor: '#FAFCFD',
    color: '#1D1616',
    closeIconBgColor: '#CCCCCC',
    closeIconColor: '#FFFFFF',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Default = Template.bind({});

export const Closeable = Template.bind({});
Closeable.args = {
  closeable: true,
};

export const WithLeftElement = Template.bind({});
WithLeftElement.args = {
  leftElement: <Avatar size="xs" />,
};

export const WithLeftElementAndCloseable = Template.bind({});
WithLeftElementAndCloseable.args = {
  leftElement: <Avatar size="xs" />,
  closeable: true,
};

export const WithCustomCloseIcon = Template.bind({});
WithCustomCloseIcon.args = {
  closeable: true,
  closeIcon: 'X',
};

export const WithCustomColors = Template.bind({});
WithCustomColors.args = {
  closeable: true,
  bgColor: '#FF0000',
  color: '#FFFFFF',
  closeIconBgColor: '#000000',
  closeIconColor: '#FFFFFF',
};
