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
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {children}
      </>
    );
  }
  return null;
};

export { Layout, LayoutType };
