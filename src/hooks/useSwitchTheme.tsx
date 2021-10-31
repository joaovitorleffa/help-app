import React, { ReactNode, useEffect, createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SwitchThemeProviderProps {
  children: ReactNode;
}

interface SwitchThemeContextProps {
  checked: boolean;
  onChange: () => void;
}

const SwitchThemeContext = createContext({} as SwitchThemeContextProps);

const KEY = '@help-app:theme';

const SwitchThemeProvider = ({ children }: SwitchThemeProviderProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);

  const persist = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(value));
    } catch {
      console.log('erro');
      setIsChecked(!value);
    }
  };

  const onChange = async () => {
    setIsChecked((prev) => {
      const newChecked = !prev;
      persist(newChecked);
      return newChecked;
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem(KEY);
        if (data) {
          setIsChecked(JSON.parse(data));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <SwitchThemeContext.Provider value={{ checked: isChecked, onChange }}>
      {children}
    </SwitchThemeContext.Provider>
  );
};

const useSwitchTheme = () => useContext(SwitchThemeContext);

export { SwitchThemeProvider, useSwitchTheme };
