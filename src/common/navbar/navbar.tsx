import { RouteName } from "routes/routes";
import globalStyles from "assets/stylesheets/global-styles.module.scss";
import { AppLink } from "common/app-link";
import { Avatar } from "common/avatar";
import { Container } from "common/container";
import styles from "./navbar.module.scss";

export const Navbar = () => (
  <div className={styles.container}>
    <Container>
      <div className={styles.internalContainer}>
        <div>
          <AppLink routeName={RouteName.Home}>Logo goes here</AppLink>
        </div>
        <div className={styles.rightContainer}>
          <nav>
            <AppLink className={globalStyles.link} routeName={RouteName.About}>
              About
            </AppLink>
          </nav>
          <Avatar size="s" />
        </div>
      </div>
    </Container>
  </div>
);
