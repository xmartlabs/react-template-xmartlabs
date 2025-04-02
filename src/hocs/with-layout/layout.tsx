import type React from "react";
import { Footer } from "common/footer";
import { Navbar } from "common/navbar";

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

const Layout = ({
  layoutType,
  children,
}: LayoutProps): React.JSX.Element | null => {
  if (layoutType === LayoutType.Default) {
    return <div>{children}</div>;
  }
  if (layoutType === LayoutType.NavAndFooter) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col">
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
