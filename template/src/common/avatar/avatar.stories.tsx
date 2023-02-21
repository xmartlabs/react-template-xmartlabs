import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar } from './avatar';

export default {
  title: 'Common/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
    },
    color: {
      control: {
        type: 'color',
      },
    },
  },
  args: {
    size: 'xl',
    alt: 'Avatar',
    bgColor: '#EE1A64',
    color: '#FFF',
    src: '',
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});

export const WithImage = Template.bind({});
WithImage.args = {
  src: 'https://i.imgur.com/vXvQgtM.jpeg',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  iconComponent: <span>+</span>,
};

export const WithImageAndIcon = Template.bind({});
WithImageAndIcon.args = {
  src: 'https://i.imgur.com/vXvQgtM.jpeg',
  iconComponent: <span>+</span>,
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  children: <span>SB</span>,
};

export const WithFailedImage = Template.bind({});
WithFailedImage.args = {
  src: 'https://somebrokenurl.com/',
  alt: 'Broken image',
};
