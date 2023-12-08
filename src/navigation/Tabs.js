import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Account, Categories, Chats, Home, MyAds, Sell } from '../Screens';
import { responsiveFontSize } from '../utils/Dimensions/Dimension';
import { Fonts } from '../utils/Fonts';
import { AppColor } from '../utils/AppColor';
import BottomSheet from '@gorhom/bottom-sheet';
import MyTabBar from './BottomTabs/MyTabBar';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { customStyles } from '../utils/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    marginBottom: 20,
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
    height: 40,
    marginLeft: 10,
    color: AppColor.black,
    fontSize: responsiveFontSize(1.2),
    fontFamily: Fonts.poppins.semiBold,
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

const CustomPhoneInput = ({ value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <Text style={{ marginRight: 10, color: AppColor.black, fontSize: responsiveFontSize(1.2), fontFamily: Fonts.poppins.semiBold }}>+91</Text>
    <TextInput
      maxLength={10}
      style={styles.input}
      placeholder="Enter your mobile number"
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const CustomLoginButton = ({ phoneNumber, onPress }) => (
  <TouchableOpacity disabled={!phoneNumber} style={styles.loginButton} onPress={onPress}>
    <Text style={styles.loginButtonText}>Login</Text>
  </TouchableOpacity>
);

const Tabs = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const otpBottomSheetRef = useRef(null);
  const otp1Ref = useRef();
  const otp2Ref = useRef();
  const otp3Ref = useRef();
  const otp4Ref = useRef();

  const loginSnapPoints = useMemo(() => ['25%', '50%'], []);
  const otpSnapPoints = useMemo(() => ['25%', '50%'], []);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [otpBottomSheetVisible, setOtpBottomSheetVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');

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
    closeLoginBottomSheet();
    setOtpBottomSheetVisible(true);
    otpBottomSheetRef.current?.expand();
  };

  const handleOtpContinue = async () => {
    await AsyncStorage.setItem('Token', 'kajsdfksakjfksakfjaklsjflkjsadlkfkafkhiopaisfjijsfsjidiajsdf');
    closeOtpBottomSheet();
    navigation.navigate('Tabs');
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
          component={Home}
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
            title: '',
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
        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={loginSnapPoints} onClose={closeLoginBottomSheet}>
          <LinearGradient colors={AppColor.LinearGradient1} style={styles.container}>
            <TouchableOpacity
              onPress={closeLoginBottomSheet}
              style={{
                position: 'absolute',
                top: Platform.OS === 'ios' ? 30 : 20,
                right: Platform.OS === 'ios' ? 20 : 15,
              }}>
              <Icon
                name="close-outline"
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <Text style={[customStyles.boldText, { color: AppColor.white, fontSize: responsiveFontSize(2.5), padding: 15 }]}>
              India's #1 Online Thrift Store
            </Text>
            <CustomPhoneInput value={phoneNumber} onChangeText={setPhoneNumber} />
            <CustomLoginButton phoneNumber={phoneNumber} onPress={handleLogin} />
          </LinearGradient>

        </BottomSheet>
      )}
      {otpBottomSheetVisible && (
        <BottomSheet ref={otpBottomSheetRef} index={1} snapPoints={otpSnapPoints} onClose={closeOtpBottomSheet}>
          <LinearGradient colors={AppColor.LinearGradient1} style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                closeOtpBottomSheet();
                setBottomSheetVisible(true);
                bottomSheetRef.current?.expand();
              }}
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
              }}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>Back</Text>
            </TouchableOpacity>

            <Text style={[customStyles.boldText, { color: AppColor.white, fontSize: responsiveFontSize(2.5), padding: 20 }]}>Enter OTP</Text>

            <View style={styles.inputContainer1}>
              <TextInput
                placeholder="_"
                style={styles.otpinput}
                maxLength={1}
                keyboardType="numeric"
                value={otp1}
                onChangeText={(text) => {
                  setOtp1(text);
                  handleOtpChange(text, otp2Ref);
                }}
                ref={otp1Ref}
              />
              <TextInput
                placeholder="_"
                style={styles.otpinput}
                maxLength={1}
                keyboardType="numeric"
                value={otp2}
                onChangeText={(text) => {
                  setOtp2(text);
                  handleOtpChange(text, otp3Ref);
                }}
                ref={otp2Ref}
              />
              <TextInput
                placeholder="_"
                style={styles.otpinput}
                maxLength={1}
                keyboardType="numeric"
                value={otp3}
                onChangeText={(text) => {
                  setOtp3(text);
                  handleOtpChange(text, otp4Ref);
                }}
                ref={otp3Ref}
              />
              <TextInput
                placeholder="_"
                style={styles.otpinput}
                maxLength={1}
                keyboardType="numeric"
                value={otp4}
                onChangeText={(text) => setOtp4(text)}
                ref={otp4Ref}
              />
            </View>

            <TouchableOpacity onPress={handleOtpContinue} style={styles.contineuButton} >
              <Text style={[customStyles.boldText, { color: AppColor.white, fontSize: responsiveFontSize(2) }]}>Continue</Text>
            </TouchableOpacity>
          </LinearGradient>
        </BottomSheet>
      )}
    </View>

  );
};

export default Tabs;
