import React from 'react';

import globalStyles from 'assets/stylesheets/global-styles.module.scss';
import { AppLink } from 'routes/app-link';
import { RouteName } from 'routes/routes';

import styles from './about.module.scss';

const About = () => (
  <div className={globalStyles.genericContainer}>
    <h1 className={styles.title}>
      This is the About Page.
      <AppLink routeName={RouteName.Home}>Home</AppLink>
    </h1>
  </div>
);

export { About };
