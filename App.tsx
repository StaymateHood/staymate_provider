import './global.css';
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/navigator/RootNavigator';

const navTheme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, background: '#F1F5F6', primary: '#0E7C86'},
};

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
