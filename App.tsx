import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SplashScreen} from './src/screens';
import AuthNavigator from './src/navigators/AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1200);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
