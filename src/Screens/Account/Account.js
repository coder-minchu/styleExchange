import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Image, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Header from '../../Components/Header/Header';
import { AppColor } from '../../utils/AppColor';
import { height, width } from '../../utils/Dimensions/Dimension';
import Icon from 'react-native-vector-icons/EvilIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { customStyles } from '../../utils/Styles';

const Account = ({ navigation }) => {

  const [ImagePicked, setImagePicked] = useState('https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250')
  const imagePickerFnc = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setImagePicked(image.path)
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'MyProfile'} />
      <View style={styles.mainContainer}>
        <View style={styles.firstContainer}>
          <View style={styles.profileView}>
            <ImageBackground
              resizeMode="cover"
              source={{
                uri: ImagePicked,
              }}
              style={styles.profileImage}
            >
            </ImageBackground>
            {/* <TouchableOpacity onPress={imagePickerFnc} style={styles.cameraView}>
              <Icon name="camera" size={height / 40} color={AppColor.black} />
            </TouchableOpacity> */}

          </View>
        </View>
        <View style={styles.secondContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.buttonView}>
            <Text style={customStyles.boldText}>Edit Profile</Text>
            <Icon name="chevron-right" size={height / 40} color={AppColor.black} />
          </TouchableOpacity>
          <View style={styles.buttonView}>
            <Text style={customStyles.boldText}>Edit Profile</Text>
            <Icon name="chevron-right" size={height / 40} color={AppColor.black} />
          </View>
          <View style={styles.buttonView}>
            <Text style={customStyles.boldText}>Edit Profile</Text>
            <Icon name="chevron-right" size={height / 40} color={AppColor.black} />
          </View>
          <View style={styles.buttonView}>
            <Text style={customStyles.boldText}>Edit Profile</Text>
            <Icon name="chevron-right" size={height / 40} color={AppColor.black} />
          </View>
          <View style={styles.buttonView}>
            <Text style={customStyles.boldText}>Edit Profile</Text>
            <Icon name="chevron-right" size={height / 40} color={AppColor.black} />
          </View>
          <View style={styles.buttonView}>
            <Text style={customStyles.boldText}>Log out</Text>
            <Icon name="chevron-right" size={height / 40} color={AppColor.black} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.blueViolet,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  firstContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  secondContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    // justifyContent: 'center',
    alignItems: 'center',

  },
  profileView: {
    borderRadius: (width * 0.3) / 2,
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: (width * 0.3) / 2
  },
  cameraView: {
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: (width * 0.07) / 2,
    backgroundColor: AppColor.smokeWhite,
    position: 'absolute',
    bottom: 20,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    width: width - 30,
    backgroundColor: AppColor.smokeWhite,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    flexDirection: 'row',
    margin: 5,
    alignSelf: 'center'
  },

});
