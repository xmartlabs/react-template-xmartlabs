import { classnames } from 'helpers/utils';
import globalStyles from 'assets/stylesheets/global-styles.module.scss';
import styles from './home.module.scss';

const Home = () => (
  <div className={classnames(styles.container, globalStyles.genericContainer)}>
    <div>
      <p className={styles.header}>
        This is the homepage.
      </p>
      <p className={styles.subheader}>
        Feel free to spruce me up 😊
      </p>
    </div>
  </div>
);

export { Home };
