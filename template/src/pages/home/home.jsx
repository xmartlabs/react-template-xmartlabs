import React from 'react';

import globalStyles from 'assets/stylesheets/global-styles.module.scss';
import styles from './home.module.scss';

const Home = () => (
  <div className={globalStyles.genericContainer}>
    <h1 className={styles.title}>
      Welcome! This is the homepage.
    </h1>
  </div>
);

export { Home };
