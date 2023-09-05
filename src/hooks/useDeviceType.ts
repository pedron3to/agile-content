"use client";
import { useState, useEffect } from "react";

const useDeviceType = () => {
  const mobileSize = 768;
  const tabletSize = 1024;

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= mobileSize
  );
  const [isTablet, setIsTablet] = useState(
    typeof window !== "undefined" &&
      window.innerWidth > mobileSize &&
      window.innerWidth <= tabletSize
  );

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth <= mobileSize);
      setIsTablet(windowWidth > mobileSize && windowWidth <= tabletSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileSize, tabletSize]);

  return { isMobile, isTablet };
};

export default useDeviceType;
