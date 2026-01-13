// App.js
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import i18n from './src/i18n';
import './src/db/database'; // ensure DB initializes

export default function App() {
  const scheme = useColorScheme();

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
        <RootNavigator />
      </NavigationContainer>
    </I18nextProvider>
  );
}
