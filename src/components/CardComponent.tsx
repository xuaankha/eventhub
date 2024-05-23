import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';

interface Props {
  onPress?: () => void;
  children: ReactNode;
  color?: string;
  styles?: StyleProp<ViewStyle>;
  isShadow?: boolean;
}

const CardComponent = (props: Props) => {
  const {onPress, children, color, styles, isShadow} = props;

  const localStyles: StyleProp<ViewStyle>[] = [
    globalStyles.card,
    isShadow ? globalStyles.shadow : undefined,
    {backgroundColor: color ?? appColors.white},
    styles,
  ];

  return (
    <TouchableOpacity onPress={onPress} style={localStyles}>
      {children}
    </TouchableOpacity>
  );
};

export default CardComponent;
