import {StyleSheet, Text, View} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

const CustumTabButton = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 4,
          backgroundColor: 'blue',
          position: 'relative',
          zIndex: 999,
          top: -10,
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2,
            backgroundColor: 'white',
            position: 'absolute',
            zIndex: 999,
          }}>
          <IconEntypo name="plus" size={25} color="black" />
        </View>
      </View>
    </View>
  );
};

export default CustumTabButton;

const styles = StyleSheet.create({});
