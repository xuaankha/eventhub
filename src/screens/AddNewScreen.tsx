import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ChoiceLocation,
  ContainerComponent,
  DateTimePicker,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';

const initValues = {
  title: '',
  description: '',
  location: {
    title: '',
    address: '',
  },
  imageUrl: '',
  users: [''],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};

const AddNewScreen = () => {
  const auth = useSelector(authSelector);

  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });

  const handleChangeValue = (key: string, value: string | Date) => {
    const items = {...eventData};
    items[`${key}`] = value;
    setEventData(items);
  };
  const handleAddEvent = async () => {
    console.log(eventData);
  };

  const handleLocation = (val: any) => {
    const items = {...eventData};
    items.position = val.postion;
    items.locationAddress = val.address;

    setEventData(items);
  };
  return (
    <ContainerComponent isScroll>
      <SpaceComponent height={10} />
      <SectionComponent>
        <TextComponent text="Add New Event" title />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          placeholder="Title"
          value={eventData.title}
          allowClear
          onChange={val => handleChangeValue('title', val)}
        />
        <InputComponent
          placeholder="Description"
          value={eventData.description}
          multiline
          numberOfLine={3}
          allowClear
          onChange={val => handleChangeValue('description', val)}
        />

        <RowComponent>
          <DateTimePicker
            label="Start at:"
            type="time"
            onSelect={val => handleChangeValue('startAt', val)}
            selected={eventData.startAt}
          />
          <SpaceComponent width={20} />
          <DateTimePicker
            label="End at:"
            type="time"
            onSelect={val => handleChangeValue('endAt', val)}
            selected={eventData.endAt}
          />
        </RowComponent>
        <DateTimePicker
          label="Date"
          type="date"
          onSelect={val => handleChangeValue('date', val)}
          selected={eventData.date} 
        />
        <InputComponent
          placeholder="Title Address"
          allowClear
          value={eventData.location.title}
          onChange={val => {
            handleChangeValue('location', {...eventData.location, title: val});
          }}
        />
        <ChoiceLocation onSelect={val => handleLocation(val)} />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          text="Add New"
          onPress={handleAddEvent}
          type="primary"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
