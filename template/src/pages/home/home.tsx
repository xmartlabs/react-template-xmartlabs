import { useState } from 'react';

import globalStyles from 'assets/stylesheets/global-styles.module.scss';
import { AppLink } from 'routes/app-link';
import { RouteName } from 'routes/routes';
import { Button } from 'common/button';
import { Avatar } from 'common/avatar';
import { Modal } from 'common/modal';
import { ModalSizes } from 'common/modal/modal';
import styles from './home.module.scss';

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const closeModal: () => void = () => { setOpenModal(false); };
  return (
    <div className={globalStyles.genericContainer}>
      <h1 className={styles.title}>
        <Avatar size="xl" />
        <hr />
        Welcome! This is the homepage.
        <AppLink routeName={RouteName.About}>About</AppLink>
        <Button onClick={() => setOpenModal(true)}>Hello World</Button>
      </h1>
      {openModal && (
        <Modal
          isOpen={openModal}
          onClose={closeModal}
          size={ModalSizes.small}
        >
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Title</h3>
            <span>
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
              sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies
              mi vitae est. Mauris placerat eleifend leo.
            </span>
            <div className={styles.modalFooter}>
              <Button bColor="secondary" onClick={() => setOpenModal(false)}>Cancel</Button>
              <Button>Accept</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export { Home };
