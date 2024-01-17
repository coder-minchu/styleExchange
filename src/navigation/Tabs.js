import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Account, Categories, Chats, Home, MyAds, Sell } from '../Screens';
import { responsiveFontSize } from '../utils/Dimensions/Dimension';
import { Fonts } from '../utils/Fonts';
import { AppColor } from '../utils/AppColor';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import MyTabBar from './BottomTabs/MyTabBar';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { customStyles } from '../utils/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../Redux/Action/LoginAction';
import { OtpVerifyAction } from '../Redux/Action/OtpVerifyAction';
import StyleExchange from '../Drawer/StyleExchange';
import CustomPhoneInput from '../Components/CustomPhoneInput';
import CustomLoginButton from '../Components/CustomLoginButton';
import OtpBottomSheet from '../Components/BottomSheet/OtpBottomSheet';
import LoginBottomSheet from '../Components/BottomSheet/LoginBottomSheet';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    width: Platform.OS === 'ios' ? 30 : 40,
    height: Platform.OS === 'ios' ? 30 : 40,
    borderRadius: Platform.OS === 'ios' ? 15 : 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white',
    width: '90%',
    marginTop: '10%',
  },
  inputContainer1: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: Platform.OS === 'ios' ? 30 : 40,
    marginLeft: 10,
    color: AppColor.black,
    fontSize: responsiveFontSize(1.2),
    fontFamily: Fonts.poppins.semiBold,
  },
  errorView: {
    marginBottom: 20,
    // backgroundColor: 'red',
    width: '90%',
    padding: 1
  },
  loginButton: {
    backgroundColor: AppColor.blueViolet,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '90%',
  },
  loginButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.poppins.bold,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
  },
  otpinput: {
    width: 50,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  contineuButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 14,
    paddingVertical: 14,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 10,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const CustomPhoneInput = ({ value, onChangeText }) => (
//   <View style={styles.inputContainer}>
//     <Text style={{ marginRight: 10, color: AppColor.black, fontSize: responsiveFontSize(1.2), fontFamily: Fonts.poppins.semiBold }}>+91</Text>
//     <TextInput
//       maxLength={10}
//       style={styles.input}
//       placeholder="Enter your mobile number"
//       keyboardType="numeric"
//       value={value}
//       onChangeText={onChangeText}
//     />
//   </View>
// );

// const CustomLoginButton = ({ phoneNumber, onPress, loading }) => (
//   <TouchableOpacity disabled={!phoneNumber} style={styles.loginButton} onPress={onPress}>
//     {loading ? <ActivityIndicator size='small' color={AppColor.white} /> : <Text style={styles.loginButtonText}>Login</Text>}
//   </TouchableOpacity>
// );

const Tabs = ({ navigation }) => {
  const dispatch = useDispatch();

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [otpBottomSheetVisible, setOtpBottomSheetVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');

  const bottomSheetRef = useRef(null);
  const otpBottomSheetRef = useRef(null);

  const loginSnapPoints = useMemo(() => ['25%', '50%'], []);
  const otpSnapPoints = useMemo(() => ['25%', '50%'], []);

  const loginRes = useSelector((state) => state.LoginReducer.LOGINDATA);
  const otpRes = useSelector((state) => state.OtpVerifyReducer.OTPVERIFY);
  console.log("🚀 ~ file: Tabs.js:139 ~ Tabs ~ loginRes:", otpRes)

  useEffect(() => {
    if (loginRes && loginRes.message === "login") {
      setOtp1('');
      setOtp2('');
      setOtp3('');
      setOtp4('');
      setLoading(false)
      closeLoginBottomSheet();
      setOtpBottomSheetVisible(true);
      otpBottomSheetRef.current?.expand();
    } else {
      setLoading(false)
      setErrorText(loginRes.message)
    }

    return () => {

    }
  }, [loginRes])

  useEffect(() => {
    if (otpRes && otpRes.token && otpRes.message === "login successfully") {
      setLoading(false)
      navigateToDashboard(otpRes)
    } else {
      setLoading(false)
      setErrorText(otpRes.message)
      dispatch({ type: 'LoginData', payload: '' });
    }

    return () => {

    }
  }, [otpRes])

  useEffect(() => {
    if (errorText !== '') {
      setErrorText('')
    }
  }, [phoneNumber, otp1, otp2, otp3, otp4])

  const navigateToDashboard = async (otpRes) => {
    await AsyncStorage.setItem('Token', JSON.stringify(otpRes.token));
    closeOtpBottomSheet();
    navigation.navigate('Tabs');
  }
  const handleOtpChange = (text, ref) => {
    if (text !== '' && ref.current) {
      ref.current.focus();
    }
  };

  const closeLoginBottomSheet = () => {
    setBottomSheetVisible(false);
    bottomSheetRef.current?.close();
  };

  const closeOtpBottomSheet = () => {
    setOtpBottomSheetVisible(false);
    otpBottomSheetRef.current?.close();
  };

  const handleLogin = () => {
    console.log('Logging in with phone number:', phoneNumber);
    try {
      setLoading(true)
      dispatch(LoginAction(phoneNumber))
    } catch (error) {
      Alert.alert(error.message)
    }
  };

  const handleOtpContinue = async () => {
    try {
      dispatch({ type: 'LoginData', payload: '' });
      setLoading(true)
      let otp = otp1 + otp2 + otp3 + otp4;
      dispatch(OtpVerifyAction(otp))
    } catch (error) {
      Alert.alert(error.message)
    }
  };
  const closeBottomSheet = () => {
    if (bottomSheetVisible) {
      closeLoginBottomSheet();
    }
    // if (otpBottomSheetVisible) {
    //   closeOtpBottomSheet();
    // }
  };
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={{
          tabBarStyle: { height: 80 },
        }}>
        <Tab.Screen
          name="Home"
          component={StyleExchange}
          options={{
            header: () => null,
            title: '',
            iconName: 'home',
          }}
        />
        <Tab.Screen
          name="Categories"
          component={Categories}
          options={{
            header: () => null,
            title: 'Categories',
            iconName: 'heart-outline',
            bottomSheetRef: bottomSheetRef,
            bottomSheetVisible: setBottomSheetVisible
          }}
        />

        <Tab.Screen
          name="Sell"
          component={Sell}
          options={{
            header: () => null,
            title: '',
            iconName: 'heart-outline',
            bottomSheetRef: bottomSheetRef,
            bottomSheetVisible: setBottomSheetVisible
          }}
        />

        <Tab.Screen
          name="Chats"
          component={Chats}
          options={{
            header: () => null,
            title: '',
            iconName: 'chatbubble-outline',
            bottomSheetRef: bottomSheetRef,
            bottomSheetVisible: setBottomSheetVisible
          }}
        />

        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            header: () => null,
            title: '',
            iconName: 'person-outline',
            bottomSheetRef: bottomSheetRef,
            bottomSheetVisible: setBottomSheetVisible
          }}
        />
      </Tab.Navigator>

      {bottomSheetVisible && (
        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={loginSnapPoints} onClose={closeLoginBottomSheet} backdropComponent={(props) => <BottomSheetBackdrop {...props} />}>
          <LoginBottomSheet
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            errorText={errorText}
            setErrorText={setErrorText}
            handleLogin={handleLogin}
            loading={loading}
            closeBottomSheet={closeLoginBottomSheet}
          />
        </BottomSheet>
      )}

      {otpBottomSheetVisible && (
        <BottomSheet ref={otpBottomSheetRef} index={1} snapPoints={otpSnapPoints} onClose={closeOtpBottomSheet} backdropComponent={(props) => <BottomSheetBackdrop {...props} />}>
          <OtpBottomSheet
            otp1={otp1}
            otp2={otp2}
            otp3={otp3}
            otp4={otp4}
            setOtp1={setOtp1}
            setOtp2={setOtp2}
            setOtp3={setOtp3}
            setOtp4={setOtp4}
            errorText={errorText}
            handleOtpContinue={handleOtpContinue}
            loading={loading}
            closeBottomSheet={closeOtpBottomSheet}
          />
        </BottomSheet>
      )}
    </View>
  );
};

export default Tabs;
