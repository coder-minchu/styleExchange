import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppColor } from '../../utils/AppColor';
import { responsiveFontSize, width } from '../../utils/Dimensions/Dimension';

const Search = () => {
  return (
    <View
      style={{
        backgroundColor: AppColor.appBackground,
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 5,
        justifyContent: 'space-between',
        width: width - 10,
        // borderBottomWidth: 1,
        // borderColor: AppColor.borderColor,
        alignSelf: 'center',
        margin: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'black',
          width: '85%',
          paddingLeft: 5,
          borderRadius: 5,
          paddingVertical: 6
        }}>
        <Icon name="search" size={20} />
        <TextInput
          style={{ paddingLeft: 5, fontSize: responsiveFontSize(1.6), width: '90%', height: 20 }}
          placeholder="Find Cars, Mobile Phones and mo...."
        />
      </View>
      <Icon name="notifications-outline" size={25} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
