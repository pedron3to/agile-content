import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  isSelected?: boolean;
  children: ReactNode;
  isHomePage?: boolean;
}
const Layout = ({
  isSelected = false,
  children,
  isHomePage = false,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Header isSelected={isSelected} isHomePage={isHomePage} />
        {children}
      </div>
      <div className="mt-auto">
        <Footer isSelected={isSelected} />
      </div>
    </div>
  );
};

export default Layout;
