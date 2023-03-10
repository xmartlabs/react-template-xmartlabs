import { ComponentStory, ComponentMeta } from '@storybook/react';
import styles from 'pages/home/home.module.scss';
import { Button } from 'common/button';
import { useState } from 'react';
import { Modal, ModalSizes } from './modal';

export default {
  title: 'Common/Modal',
  component: Modal,
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
    },
  },
  args: {
    size: ModalSizes.medium,
    hideCloseButton: false,
    isOpen: true,
    children:
  <span>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
    deserunt mollit anim id est laborum.
  </span>,
  },
} as unknown as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  return isOpen ? <Modal {...args} onClose={() => setIsOpen(false)} /> : <div />;
};

export const Default = Template.bind({});

export const WithSizeBig = Template.bind({});
WithSizeBig.args = {
  size: ModalSizes.big,
};

export const WithSizeSmall = Template.bind({});
WithSizeSmall.args = {
  size: ModalSizes.small,
};

export const WithoutCloseButton = Template.bind({});
WithoutCloseButton.args = {
  hideCloseButton: true,
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  children:
  <div className={styles.modalContent}>
    <h3 className={styles.modalTitle}>Title</h3>
    <span>
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
      turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
      sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies
      mi vitae est. Mauris placerat eleifend leo.
    </span>
    <div className={styles.modalFooter}>
      <Button bColor="secondary">Cancel</Button>
      <Button>Accept</Button>
    </div>
  </div>
  ,
};
