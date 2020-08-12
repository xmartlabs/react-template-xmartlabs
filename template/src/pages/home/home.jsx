import React from 'react';

import styles from './home.module.scss';

const Home = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>
      Welcome! This is the homepage.
    </h1>
  </div>
);

export { Home };
