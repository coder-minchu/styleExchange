import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Images} from '../../utils/Images';
import {AppColor} from '../../utils/AppColor';
import {width} from '../../utils/Dimensions/Dimension';
import BlackButton from '../Button/BlackButton';

const FavouritesComponent = () => {
  return (
    <View style={{backgroundColor: AppColor.white, height: '100%'}}>
      <View style={styles.imageBox}>
        <Image
          source={Images.favouriteImage}
          style={{width: 200, height: 200}}
        />
        <Text style={{fontSize: 20, color: AppColor.black}}>
          You haven't liked anything yet
        </Text>
        <Text>Collect all the things you like in one place</Text>
        <TouchableOpacity>
          <BlackButton title="Discover" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FavouritesComponent;

const styles = StyleSheet.create({
  imageBox: {
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  buttonView: {
    width: width / 1.5,
    backgroundColor: AppColor.black,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
});
