import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { height, width } from '../../utils/Dimensions/Dimension';
import { AppColor } from '../../utils/AppColor';

const Data = [
  {
    id: 1,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
    price: 'Rs-20000',
    location: 'Vijay Nagar',
  },
  {
    id: 2,
    image:
      'https://png.pngtree.com/png-vector/20190501/ourmid/pngtree-vector-office-building-icon-png-image_1015906.jpg',
    title: 'PROPERTIES',
    price: 'Rs-20000',
    location: 'Vijay Nagar',
  },
  {
    id: 3,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
    price: 'Rs-20000',
    location: 'Vijay Nagar',
  },
  {
    id: 4,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
    price: 'Rs-20000',
    location: 'Vijay Nagar',
  },
  {
    id: 5,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
    price: 'Rs-20000',
    location: 'Vijay Nagar',
  },
  {
    id: 6,
    image:
      'https://png.pngtree.com/png-vector/20190501/ourmid/pngtree-vector-office-building-icon-png-image_1015906.jpg',
    title: 'PROPERTIES',
    price: 'Rs-20000',
    location: 'Vijay Nagar',
  },
  {
    id: 7,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
    price: 'Rs-20000',
    location: 'Vijay Nagar',
  },
  {
    id: 8,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
    price: 'Rs-20000',
    location: 'Vijay Nagar',
  },
];

const FreshRecommendations = ({ fetchProductRes }) => {
  const navigation = useNavigation();
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (fetchProductRes) {
  //     setData(fetchProductRes.products);
  //   }
  // }, [fetchProductRes]);

  return (
    <View
      style={{
        // backgroundColor: 'blue',
        alignSelf: 'center',
        // width: '100%',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={fetchProductRes}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          // let img;
          // if (item.image) {
          //   let images = item?.image?.split(':');
          //   // console.log(images[2])
          //   img = `https://fashiononrent.appwizards.in/uploads/images/${images[2]}`;
          // }

          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetails', { item: item })
              }>
              <View style={styles.card}>
                <View style={{ alignItems: 'center' }}>
                  {/* <Image style={{position:'absolute',zIndex:999,right:0,width:30,height:30}} source={require('../assets/Products/heart_img.png')}/> */}
                  <View
                    style={{
                      width: width / 14,
                      height: width / 14,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      elevation: 2,
                      backgroundColor: 'white',
                      position: 'absolute',
                      zIndex: 999,
                      right: 0,
                    }}>
                    <TouchableOpacity style={{ titleColor: 'red' }}>
                      <Icon name="heart-outline" size={20} />
                    </TouchableOpacity>
                  </View>
                  {/* <Image
                    source={{
                      uri: item.image
                        ? img
                        : 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
                    }}
                    style={{
                      height: width / 2.5,
                      width: width / 2.5,
                      resizeMode: 'contain',
                    }}
                  /> */}
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      padding: 2,
                      color: AppColor.black,
                    }}>
                    {item.price}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      padding: 2,
                      color: AppColor.titleColor,
                    }}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 15,
                    }}>
                    <Icon name="location-outline" size={20} />
                    <Text style={{ fontSize: 16, padding: 2 }}>
                      {item.location}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FreshRecommendations;

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: AppColor.borderColor,
    borderRadius: 5,
    margin: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '48%',
    width: width / 2.1,
    padding: 10,
    // height: height / 3.5,
  },
});
