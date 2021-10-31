import React, { ReactNode, createContext, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import { useTheme } from 'styled-components';

interface SpinnerProviderProps {
  children: ReactNode;
}

interface SpinnerContextProps {
  visibility: boolean;
}

const SpinnerContext = createContext<({ visibility }: SpinnerContextProps) => void>(() => false);

const SpinnerProvider = ({ children }: SpinnerProviderProps): JSX.Element => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const show = ({ visibility }: SpinnerContextProps) => {
    setIsVisible(visibility);
  };

  return (
    <>
      <SpinnerContext.Provider value={show}>{children}</SpinnerContext.Provider>
      <Spinner
        visible={isVisible}
        textContent={t('common.loading')}
        textStyle={{
          color: theme.colors.title,
        }}
      />
    </>
  );
};

const useSpinner = () => useContext(SpinnerContext);

export { SpinnerProvider, useSpinner };
