import {View, Text, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../../redux/reducers/authReducer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const auth = useSelector(authSelector);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HomeScreen</Text>
      <Button
        title="Logout"
        onPress={async () => {
          await AsyncStorage.clear();
          await GoogleSignin.signOut();
          LoginManager.logOut();
          dispatch(removeAuth({}));
        }}
      />
    </View>
  );
};

export default HomeScreen;
