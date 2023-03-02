import React, { useState, useEffect } from 'react';

import globalStyles from 'assets/stylesheets/global-styles.module.scss';
import { AppLink } from 'routes/app-link';
import { RouteName } from 'routes/routes';
import { Button } from 'common/button';
import { Avatar } from 'common/avatar';
import { Modal } from 'common/modal';
import { ModalSizes } from 'common/modal/modal';
import { TextField, TextFieldStatus } from 'common/text-field';
import styles from './home.module.scss';
import { ReactComponent as MailSVG } from '../../assets/icons/mail.svg';
import { ReactComponent as CloseSVG } from '../../assets/icons/close.svg';

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const closeModal: () => void = () => {
    setOpenModal(false);
  };
  const [inputState, setInputState] = useState('default@mail.com');
  const [helperState, setHelperState] = useState('');

  useEffect(() => {
    const mailformat = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!inputState.match(mailformat)) {
      setHelperState('Not a valid email format');
    } else {
      setHelperState('');
    }
  }, [inputState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
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
          <h3 style={{ backgroundColor: 'lightgray', marginBottom: '48px' }}>Input example</h3>
          <TextField
            status={TextFieldStatus.default}
            label="Email"
            LeftIcon={MailSVG}
            leftIconAction={() => setOpenModal(true)}
            RightIcon={CloseSVG}
            rightIconAction={handleClear}
            name="example"
            placeholder="Enter your email..."
            value={inputState}
            helperText={helperState}
            closeHelper={() => setHelperState('')}
            onChange={handleChange}
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
