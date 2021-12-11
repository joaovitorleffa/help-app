import React from 'react';
import 'react-native-gesture-handler';
import { ScreenProvider } from 'responsive-native';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  NotoSansJP_400Regular,
  NotoSansJP_500Medium,
  NotoSansJP_700Bold,
} from '@expo-google-fonts/noto-sans-jp';
import AppLoading from 'expo-app-loading';

import './src/assets/locales/i18n';
import { AuthProvider } from '@hooks/useAuth';
import { Routes } from './src/routes/index.routes';
import { ThemeProvider } from './src/styles/ThemeProvider';
import { SignUpStepsProvider } from '@hooks/useSignUpSteps';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SpinnerProvider } from '@hooks/useSpinner';
import { LogBox } from 'react-native';
import { SwitchThemeProvider } from '@hooks/useSwitchTheme';

LogBox.ignoreLogs(['Setting a timer']);

function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    NotoSansJP_400Regular,
    NotoSansJP_500Medium,
    NotoSansJP_700Bold,
  });

  const queryClient = new QueryClient();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <ScreenProvider baseFontSize={16}>
        <SwitchThemeProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <SpinnerProvider>
                <SignUpStepsProvider>
                  <AuthProvider>
                    <Routes />
                    <FlashMessage position="top" />
                  </AuthProvider>
                </SignUpStepsProvider>
              </SpinnerProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </SwitchThemeProvider>
      </ScreenProvider>
    </SafeAreaProvider>
  );
}

export default App;
