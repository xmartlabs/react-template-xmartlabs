import type React from "react";
import { Footer } from "common/footer";
import { Navbar } from "common/navbar";
import styles from "./layout.module.scss";

enum LayoutType {
  // Add more layout types here
  Default = "Default",
  NavAndFooter = "NavAndFooter",
  Nav = "Nav",
}

interface LayoutProps {
  children: React.ReactNode;
  layoutType: LayoutType;
}

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

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export { Layout, LayoutType };
