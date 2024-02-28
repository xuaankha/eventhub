import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ButtonComponent, InputComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  
  return (
    <View
      style={[
        globalStyles.container,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <InputComponent />
    </View>
  );
};

export default LoginScreen;
