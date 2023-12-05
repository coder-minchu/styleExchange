import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const ProductDetailsNabvar = () => {
  return (
    <View>
      <LinearGradient colors={[ 'rgba(0,0,0,0.1)' ,'transparent']}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 15,
          }}>
          <View>
            <Icon name="arrow-back-outline" size={25} />
          </View>
          <View>
            <Icon name="share-social-outline" size={25} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ProductDetailsNabvar;

const styles = StyleSheet.create({});
