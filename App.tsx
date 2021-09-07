import React from 'react';
import { ScreenProvider } from 'responsive-native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  NotoSansJP_400Regular,
  NotoSansJP_500Medium,
  NotoSansJP_700Bold,
} from '@expo-google-fonts/noto-sans-jp';
import AppLoading from 'expo-app-loading';

import { SignIn } from './src/screens/Organization/SignIn';
import { ThemeProvider } from './src/styles/ThemeProvider';
import { Initial } from './src/screens/Organization/Initial';
import { FirstStep } from './src/screens/Organization/SignUp/FirstStep';

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
          <FirstStep />
        </ThemeProvider>
      </ScreenProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
