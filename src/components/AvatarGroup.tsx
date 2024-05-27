import React from 'react';
import {Image} from 'react-native';
import {RowComponent, SpaceComponent, TextComponent} from '.';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  size?: number;
}

const AvatarGroup = (props: Props) => {
  const {size} = props;
  const photoUrl =
    'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg';
  return (
    <RowComponent justify="flex-start" styles={{marginVertical: 12}}>
      {Array.from({length: 3}).map((item, index) => (
        <Image
          key={`img${index}`}
          source={{uri: photoUrl}}
          style={{
            width: size ?? 24,
            height: size ?? 24,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: appColors.white,
            marginLeft: index > 0 ? -8 : 0,
          }}
        />
      ))}
      <SpaceComponent width={12} />
      <TextComponent
        text="+20 Going"
        size={12 + (size ? (size - 24) / 5 : 0)}
        color={appColors.primary}
        font={fontFamilies.semiBold}
      />
    </RowComponent>
  );
};

export default AvatarGroup;
