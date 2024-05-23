import {View, Text, Dimensions, ImageBackground} from 'react-native';
import React from 'react';
import {
  AvatarGroup,
  CardComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import {EventModel} from '../models/EventModel';
import {Bookmark, Bookmark2, Location} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  item: EventModel;
  type: 'list' | 'card';
  onPress?: () => void;
}

const EventItem = (props: Props) => {
  const {item, type, onPress} = props;
  console.log(item);

  return type === 'card' ? (
    <CardComponent
      isShadow
      styles={{width: Dimensions.get('window').width * 0.7}}
      onPress={() => {}}>
      <ImageBackground
        style={{flex: 1, marginBottom: 12, height: 131, padding: 10}}
        source={require('../assets/images/demo-event-image.png')}
        imageStyle={{
          padding: 10,
          resizeMode: 'cover',
          borderRadius: 12,
        }}>
        <RowComponent justify="space-between">
          <CardComponent
            styles={{
              alignItems: 'center',
              width: 45,
              height: 45,
              justifyContent: 'center',
              padding: 0,
              margin: 0,
              marginHorizontal: 0,
              marginVertical: 0,
            }}
            color="#ffffffB3">
            <TextComponent
              color={appColors.danger2}
              font={fontFamilies.bold}
              size={18}
              text="10"
            />
            <TextComponent
              color={appColors.danger2}
              font={fontFamilies.semiBold}
              size={10}
              text="June"
            />
          </CardComponent>
          <CardComponent styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
            <MaterialIcons
              name="bookmark"
              color={appColors.danger2}
              size={20}
            />
          </CardComponent>
        </RowComponent>
      </ImageBackground>
      <TextComponent numberOfLine={1} title size={18} text={item.title} />
      <AvatarGroup />
      <RowComponent>
        <Location size={18} color={appColors.text3} variant="Bold" />
        <SpaceComponent width={10} />
        <TextComponent
          flex={1}
          numberOfLine={1}
          text={item.location.address}
          color={appColors.text2}
        />
      </RowComponent>
    </CardComponent>
  ) : (
    <></>
  );
};

export default EventItem;
