import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import OlxNavbar from '../../Components/Navbar/OlxNavbar';
import {AppColor} from '../../utils/AppColor';
import Icon from 'react-native-vector-icons/Ionicons';
import Option from '../../Components/Account/Option';
import {width} from '../../utils/Dimensions/Dimension';
import BlackButton from '../../Components/Button/BlackButton';
import { Fonts } from '../../utils/Fonts';

const Account = () => {
  return (
    <View>
      <OlxNavbar />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 40,
            paddingLeft: 30,
          }}>
          <View style={styles.imageView}>
            <Image
              style={styles.Image}
              source={require('../../../assets/Images/headerLeft_img.png')}
            />
          </View>
          <Text
            style={{
              fontSize: 25,
              paddingLeft: 20,
              fontWeight: 'bold',
              color: AppColor.black,
            }}>
            OLX User
          </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.buttonView}>
            <BlackButton title="View and Edit Profile" />
          </View>
        </TouchableOpacity>
        <View style={{padding: 15, marginTop: 20, gap: 10}}>
          <Text style={{fontSize: 18, color: AppColor.black}}>
            5 steps left
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              gap: 5,
            }}>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
          </View>
          <Text>
            We are built on trust.Help one another to get to know each other
            better.
          </Text>
          <Option
            heading="Buy Pakages & My Orders"
            title="Pakages,Orders,billing and invoices"
            icon="settings-outline"
            iconAerrow="chevron-forward-outline"
          />
          <Option
            heading="Settings"
            title="Privacy and Logout"
            icon="settings-outline"
            iconAerrow="chevron-forward-outline"
          />
          <Option
            heading="Help & Support"
            title="Help center and legal terms"
            icon="settings-outline"
            iconAerrow="chevron-forward-outline"
          />
          <Option
            heading="Select Language / "
            title="English"
            icon="settings-outline"
            iconAerrow="chevron-forward-outline"
          />
          <Option
            heading="Buy Pakages & My Orders"
            title="Pakages,Orders,billing and invoices"
            icon="settings-outline"
            iconAerrow="chevron-forward-outline"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  imageView: {
    width: width / 4,
    height: width / 4,
    backgroundColor: 'skyblue',
    borderRadius: 50,
  },
  Image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  buttonView: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  box: {
    width: width / 7,
    height: width / 35,
    backgroundColor: AppColor.grey,
  },
});
