import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EventsScreen} from '../screens';

const EventNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
    </Stack.Navigator>
  );
};

export default EventNavigator;
