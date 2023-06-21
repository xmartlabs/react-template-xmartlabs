import React from 'react';
import { Footer } from 'common/footer';
import { Navbar } from 'common/navbar';
import styles from './layout.module.scss';

enum LayoutType {
  // Add more layout types here
  Default = 'Default',
  NavAndFooter = 'NavAndFooter',
  Nav = 'Nav',
}

type LayoutProps = {
  children: React.ReactNode,
  layoutType: LayoutType,
};

const Layout = ({ layoutType, children }: LayoutProps): JSX.Element | null => {
  if (layoutType === LayoutType.Default) {
    return <div>{children}</div>;
  }
  if (layoutType === LayoutType.NavAndFooter) {
    return (
      <div className={styles.container}>
        <div className={styles.internalContainer}>
          <Navbar />
          {children}
        </div>
        <Footer />
      </div>
    );
  }
  if (layoutType === LayoutType.Nav) {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }
  return null;
};

export { Layout, LayoutType };
