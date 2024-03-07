import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardType,
} from 'react-native';
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
  allowClear?: boolean;
  type?: KeyboardType;
  onEnd?: () => void;
}
const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    suffix,
    placeholder,
    isPassword,
    allowClear,
    type,
    onEnd,
  } = props;
  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);
  return (
    <View style={[styles.inputContainer]}>
      {affix ?? affix}
      <TextInput
        style={[styles.input]}
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
            <AntDesign name="close" size={22} color={appColors.text} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray3,
    width: '100%',
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: appColors.white,
    marginBottom: 19,
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 14,
    color: appColors.text,
  },
});
