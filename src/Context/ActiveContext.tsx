import React, { createContext, useContext, useState } from 'react';

interface ActiveContextType {
  activePath: string;
  setActivePath: (path: string) => void;
}

const ActiveContext = createContext<ActiveContextType | undefined>(undefined);

export const ActiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePath, setActivePath] = useState<string>('/'); 

  return (
    <ActiveContext.Provider value={{ activePath, setActivePath }}>
      {children}
    </ActiveContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useActive = (): ActiveContextType => {
  const context = useContext(ActiveContext);
  if (!context) {
    throw new Error("useActive must be used within an ActiveProvider");
  }
  return context;
};
