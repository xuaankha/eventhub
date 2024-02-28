import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {EyeSlash} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
interface Props {
  value: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
}
const InputComponent = (props: Props) => {
  const {value, onChange, affix, placeholder, suffix, isPassword} = props;
  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);
  return (
    <View>
      {affix ?? affix}
      <TextInput
        value={value}
        placeholder={placeholder ?? ''}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPass}
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')
        }>
        {isPassword ? (
          <EyeSlash size={22} color={appColors.gray} />
        ) : (
          value.length > 0 && (
            <AntDesign name="close" size={22} color={appColors.gray} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;
