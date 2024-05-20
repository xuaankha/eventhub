import {View, Text, ViewStyle, StyleProp} from 'react-native';
import React, {ReactNode} from 'react';
import {RowComponent, TextComponent} from '.';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';

interface Props {
  onPress: () => void;
  label: string;
  icon?: ReactNode;
  textColor?: string;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}

const TagComponent = (props: Props) => {
  const {onPress, label, icon, textColor, bgColor, styles} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.row,
        {backgroundColor: bgColor ?? appColors.white},
        styles,
      ]}>
      {icon && icon}
      <TextComponent
        text={label}
        styles={{marginLeft: icon ? 8 : 0}}
        color={textColor ?? appColors.white}
      />
    </TouchableOpacity>
  );
};

export default TagComponent;
