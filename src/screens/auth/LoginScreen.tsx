import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ButtonComponent} from '../../components';

const LoginScreen = () => {
  const [email, setEmail] = useState('');

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Login Screen</Text>
      <ButtonComponent
        text="LOGIN"
        onPress={() => console.log('Login')}
        icon={<View>N</View>}
      />
    </View>
  );
};

export default LoginScreen;
