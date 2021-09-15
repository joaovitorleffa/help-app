import React from 'react';
import 'react-native-gesture-handler';
import { ScreenProvider } from 'responsive-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  NotoSansJP_400Regular,
  NotoSansJP_500Medium,
  NotoSansJP_700Bold,
} from '@expo-google-fonts/noto-sans-jp';
import AppLoading from 'expo-app-loading';
import './src/assets/locales/i18n';

import { ThemeProvider } from './src/styles/ThemeProvider';
import { Routes } from './src/routes/index.routes';
import { SignUpStepsProvider } from '@hooks/useSignUpSteps';

function App() {
  const [fontsLoaded] = useFonts({
    NotoSansJP_400Regular,
    NotoSansJP_500Medium,
    NotoSansJP_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <ScreenProvider baseFontSize={18}>
        <ThemeProvider>
          <SignUpStepsProvider>
            <Routes />
          </SignUpStepsProvider>
        </ThemeProvider>
      </ScreenProvider>
    </SafeAreaProvider>
  );
}

export default App;
