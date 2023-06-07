import { Navbar } from 'common/navbar';
import React from 'react';

enum LayoutType {
  // Add more layout types here
  Default = 'Default',
  NavAndFooter = 'NavAndFooter',
}

type LayoutProps = {
  children: React.ReactNode,
  layoutType: LayoutType,
};

const Layout = ({ layoutType, children }: LayoutProps) => {
  if (layoutType === LayoutType.Default) {
    return children;
  }
  if (layoutType === LayoutType.NavAndFooter) {
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
