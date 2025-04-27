"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ScreenSize = "sm" | "md" | "lg";

type ScreenSizeContextType = {
  screenSize: ScreenSize;
  setScreenSize: (size: ScreenSize) => void;
};

const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(
  undefined
);

export function ScreenSizeProvider({ children }: { children: ReactNode }) {
  const [screenSize, setScreenSize] = useState<ScreenSize>("lg");

  return (
    <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
      {children}
    </ScreenSizeContext.Provider>
  );
}

export function useScreenSize() {
  const context = useContext(ScreenSizeContext);

  if (context === undefined) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  }

  return context;
}
