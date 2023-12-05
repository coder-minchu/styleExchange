import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {AppColor} from '../../utils/AppColor';

const Data = [
  {
    id: 1,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
  },
  {
    id: 2,
    image:
      'https://png.pngtree.com/png-vector/20190501/ourmid/pngtree-vector-office-building-icon-png-image_1015906.jpg',
    title: 'PROPERTIES',
  },
  {
    id: 3,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
  },
  {
    id: 4,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
  },

  {
    id: 5,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
  },
  {
    id: 6,
    image:
      'https://png.pngtree.com/png-vector/20190501/ourmid/pngtree-vector-office-building-icon-png-image_1015906.jpg',
    title: 'PROPERTIES',
  },
  {
    id: 7,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
  },
  {
    id: 8,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
  },
  {
    id: 9,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
  },
  {
    id: 10,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
  },
];

const CategoriesItem = () => {
  return (
    <View style={styles.CategoriesBox}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor:'blue',
                // margin: 10,
              }}>
              <View
                style={{
                  marginBottom: 20,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  // backgroundColor:'white',
                  paddingTop:20,
                  gap: 20,
                }}>
                <Image
                  source={{
                    uri: `${item.image}`,
                  }}
                  style={{
                    height: 50,
                    width: 50,
                    // resizeMode: 'contain',
                  }}
                />
                <Text style={styles.text}>{item.title}</Text>
              </View>

              <Icon name="chevron-forward-outline" size={20} />
            </View>
          )}
        />
    </View>
  );
};

export default CategoriesItem;

const styles = StyleSheet.create({
  CategoriesBox: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontSize: 16,
    color: AppColor.grey,
  },
});
