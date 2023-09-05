"use client";
import React, { ReactNode } from "react";
import { Footer, Header } from ".";

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
    <main className="h-[100vh]  flex flex-col">
      <div className="flex-grow">
        <Header isSelected={isSelected} isHomePage={isHomePage} />
        <div>{children}</div>
      </div>
      <div className="mt-auto">
        <Footer isSelected={isSelected} />
      </div>
    </main>
  );
};

export default Layout;
