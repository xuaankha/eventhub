import {View, Text} from 'react-native';
import React, {ReactNode} from 'react';
interface Props {
  value: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
}
const InputComponent = () => {
  return (
    <View>
      <Text>InputComponent</Text>
    </View>
  );
};

export default InputComponent;
