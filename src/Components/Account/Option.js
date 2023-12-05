import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColor} from '../../utils/AppColor';
import {Icon} from 'react-native-vector-icons/Ionicons'

const Option = ({heading,title,icon,iconAerrow}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth:1,
        paddingTop:20,
        paddingBottom:20,
        borderColor:AppColor.borderColor
      }}>
      <View style={{flexDirection: 'row', gap: 20}}>
        {/* <Icon name={icon} size={25} /> */}
        <View>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.Title}>{title}</Text>
        </View>
      </View>
      {/* <Icon name={iconAerrow} size={25} /> */}
    </View>
  );
};

export default Option;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    color: AppColor.black,
  },
  Title: {
    fontSize: 15,
  },
});
