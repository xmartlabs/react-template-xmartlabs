import React from 'react';

import { withLayout, LAYOUT_TYPES } from '../../hocs/with-layout';
import styles from './home.module.scss';

const Home = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>
      Welcome! This is the homepage.
    </h1>
  </div>
);

const WrappedHome = withLayout(LAYOUT_TYPES.HOME, Home);

export { WrappedHome as Home };
