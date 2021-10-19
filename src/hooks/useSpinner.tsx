import React, { ReactNode, createContext, useState, useContext } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

interface SpinnerProviderProps {
  children: ReactNode;
}

interface SpinnerContextProps {
  visibility: boolean;
}

const SpinnerContext = createContext<({ visibility }: SpinnerContextProps) => void>(() => false);

const SpinnerProvider = ({ children }: SpinnerProviderProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  const show = ({ visibility }: SpinnerContextProps) => {
    setIsVisible(visibility);
  };

  return (
    <>
      <SpinnerContext.Provider value={show}>{children}</SpinnerContext.Provider>
      <Spinner visible={isVisible} textContent={'Loading...'} />
    </>
  );
};

const useSpinner = () => useContext(SpinnerContext);

export { SpinnerProvider, useSpinner };
