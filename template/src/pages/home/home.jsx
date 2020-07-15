import React from 'react';

import { withLayout } from 'src/hocs/with-layout';
import styles from './home.module.scss';

const Home = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>
      Welcome! This is the homepage.
    </h1>
  </div>
);

const WrappedHome = withLayout(Home);

export { WrappedHome as Home };
