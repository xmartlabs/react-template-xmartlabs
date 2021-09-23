import React from 'react';

enum LayoutType {
  // Add more layout types here
  Home = 'Home',
}

type LayoutProps = {
  children: React.ReactNode,
  layoutType: LayoutType,
};

const Layout = ({ layoutType, children } : LayoutProps) => {
  if (layoutType === LayoutType.Home) {
    return (
      <>
        {children}
      </>
    );
  }
  return null;
};

export { Layout, LayoutType };
