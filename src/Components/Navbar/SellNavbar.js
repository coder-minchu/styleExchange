import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppColor } from '../../utils/AppColor';
import {useNavigation} from '@react-navigation/native';


const SellNavbar = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: AppColor.borderColor,
        padding: 10,
      }}>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Icon name="close-outline" size={50}/>
      </TouchableOpacity>
      <Text style={{fontSize: 25, paddingLeft: 20}}>
        What are you offering?
      </Text>
    </View>
  );
};

export default SellNavbar;

const styles = StyleSheet.create({});
