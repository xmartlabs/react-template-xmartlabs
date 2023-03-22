import React, { useState, useEffect } from 'react';

import globalStyles from 'assets/stylesheets/global-styles.module.scss';
import { AppLink } from 'routes/app-link';
import { RouteName } from 'routes/routes';
import { Button } from 'common/button';
import { Avatar } from 'common/avatar';
import { Modal } from 'common/modal';
import { ModalSizes } from 'common/modal/modal';
import { TextField, TextFieldStatus } from 'common/text-field';
import { TextArea } from 'common/text-area';
import styles from './home.module.scss';
import { ReactComponent as MailSVG } from '../../assets/icons/mail.svg';
import { ReactComponent as CloseSVG } from '../../assets/icons/close.svg';

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const closeModal: () => void = () => {
    setOpenModal(false);
  };
  const [inputState, setInputState] = useState('');
  const [textAreaState, settextAreaState] = useState('random text');
  const [helperIState, setHelperIState] = useState('');
  const [helperTAState, setHelperTAState] = useState('');

  const charactersLimit = 35;

  useEffect(() => {
    const mailformat = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!inputState.match(mailformat) && inputState !== '') {
      setHelperIState('Not a valid email format');
    } else {
      setHelperIState('');
    }
  }, [inputState]);

  useEffect(() => {
    if (textAreaState?.length < 10 && textAreaState?.length > 0) {
      setHelperTAState('At least 10 characters needed');
    } else if (textAreaState?.length === charactersLimit) {
      setHelperTAState('Character limit reached');
    } else setHelperTAState('');
  }, [textAreaState]);

  const handleIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };
  const handletextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    settextAreaState(e.target.value);
  };
  const handleClear = () => {
    setInputState('');
  };
  return (
    <div className={globalStyles.genericContainer}>
      <h1 className={styles.title}>
        <Avatar size="xl" />
        <hr />
        Welcome! This is the HomePage.
        <AppLink routeName={RouteName.About}>About</AppLink>
        <Button onClick={() => setOpenModal(true)}>Hello World</Button>
      </h1>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <h3 style={{ backgroundColor: 'lightgray', marginBottom: '48px' }}>Text Field</h3>
          <TextField
            status={TextFieldStatus.success}
            label="Email"
            value={inputState}
            leftIcon={MailSVG}
            rightIcon={CloseSVG}
            onRightIconClick={handleClear}
            name="example"
            placeholder="Enter your email..."
            helperText={helperIState}
            helperIcon={MailSVG}
            onChange={handleIChange}
          />
        </form>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <h3 style={{ backgroundColor: 'lightgray', marginBottom: '48px' }}>Text Area</h3>
          <TextArea
            rows={5}
            cols={10}
            length={textAreaState?.length}
            maxLength={charactersLimit}
            label="Random Text"
            name="example"
            placeholder="Enter a nice message..."
            helperText={helperTAState}
            helperIcon={CloseSVG}
            onChange={handletextAreaChange}
          />
        </form>
      </div>
      {openModal && (
        <Modal isOpen={openModal} onClose={closeModal} size={ModalSizes.small}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Title</h3>
            <span>
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
              vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit
              amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
              placerat eleifend leo.
            </span>
            <div className={styles.modalFooter}>
              <Button bColor="secondary" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button>Accept</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export { Home };
