import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {TextInput} from 'react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import {ArrowRight} from 'iconsax-react-native';
import {globalStyles} from '../../styles/globalStyles';
import authenticationAPI from '../../apis/authApi';
import {LoadingModal} from '../../modals';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Verification = ({navigation, route}: any) => {
  const {code, email, password, username} = route.params;
  const [currentCode, setCurrentCode] = useState<string>(code);
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [limit, setLimit] = useState(120);
  const [newCode, setNewCode] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      limit > 0 && setLimit(limit => limit - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [limit]);
  useEffect(() => {
    let item = ``;
    codeValues.forEach(val => (item += val));

    setNewCode(item);
  }, [codeValues]);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;
    setCodeValues(data);
  };
  const handleResendVerification = async () => {
    setCodeValues(['', '', '', '']);
    setNewCode('');

    const api = `/verification`;
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );
      setLimit(120);
      setCurrentCode(res.data.code);
      setIsLoading(false);
      console.log(res.data.code);
    } catch (error) {
      console.log(`Can not send verification code ${error}`);
    }
  };

  const handleVerification = async () => {
    if (limit > 0) {
      if (parseInt(newCode) !== parseInt(currentCode)) {
        setErrorMessage('Invalid code!');
      } else {
        setErrorMessage('');
        const api = `/register`;
        const data = {
          email,
          password,
          username: username ?? '',
        };
        try {
          const res: any = await authenticationAPI.HandleAuthentication(
            api,
            data,
            'post',
          );
          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        } catch (error) {
          setErrorMessage('User has already exist!');
          console.log(`Can not create new user ${error}`);
        }
      }
    } else {
      setErrorMessage('Time out verification code, please resend new code!');
    }
  };

  return (
    <ContainerComponent back isImageBackground isScroll>
      <SectionComponent>
        <TextComponent text="Verification" title />
        <SpaceComponent height={12} />
        <SpaceComponent height={12} />
        <TextComponent
          text={`We're are send you the verification code on ${email.replace(
            /.{1,6}/,
            (m: any) => '*'.repeat(m.length),
          )}`}
        />
        <SpaceComponent height={26} />
        <RowComponent justify="space-around">
          <TextInput
            value={codeValues[0]}
            keyboardType="number-pad"
            ref={ref1}
            style={[styles.input]}
            maxLength={1}
            onChangeText={val => {
              val.length > 0 && ref2.current.focus();
              handleChangeCode(val, 0);
            }}
            placeholder="-"
          />
          <TextInput
            value={codeValues[1]}
            keyboardType="number-pad"
            ref={ref2}
            style={[styles.input]}
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 1);
              val.length > 0 && ref3.current.focus();
            }}
            placeholder="-"
          />
          <TextInput
            value={codeValues[2]}
            keyboardType="number-pad"
            ref={ref3}
            style={[styles.input]}
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 2);
              val.length > 0 && ref4.current.focus();
            }}
            placeholder="-"
          />
          <TextInput
            value={codeValues[3]}
            keyboardType="number-pad"
            ref={ref4}
            style={[styles.input]}
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 3);
            }}
            placeholder="-"
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{marginTop: 40}}>
        <ButtonComponent
          disable={newCode.length !== 4}
          onPress={handleVerification}
          text="Continue"
          type="primary"
          iconFlex="right"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor:
                    newCode.length !== 4 ? appColors.gray : appColors.primary,
                },
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
        />
      </SectionComponent>
      {errorMessage && (
        <SectionComponent>
          <TextComponent
            styles={{textAlign: 'center'}}
            text={errorMessage}
            color={appColors.danger}
          />
        </SectionComponent>
      )}
      <SectionComponent>
        {limit > 0 ? (
          <RowComponent justify="center">
            <TextComponent text="Re-send code in " flex={0} />
            <TextComponent
              text={`${(limit - (limit % 60)) / 60}:${
                limit - (limit - (limit % 60))
              }`}
              flex={0}
              color={appColors.link}
            />
          </RowComponent>
        ) : (
          <RowComponent>
            <ButtonComponent
              type="link"
              text="Resend email verification"
              onPress={handleResendVerification}
            />
          </RowComponent>
        )}
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default Verification;

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    textAlign: 'center',
  },
});
