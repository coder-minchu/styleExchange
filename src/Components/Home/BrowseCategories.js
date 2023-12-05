import { Image, StyleSheet, Text, FlatList, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';

const Data = [
  {
    id: 1,
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
  },
  {
    id: 2,
    // image: 'https://png.pngtree.com/png-vector/20190501/ourmid/pngtree-vector-office-building-icon-png-image_1015906.jpg',
    title: 'PROPERTIES',
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
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
    image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
    title: 'OLX AUTOS(CARS)',
  },
];

const BrowseCategories = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.CategoriesBox}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 10, alignSelf: 'center' }}>
        <Text style={{ fontSize: responsiveFontSize(2), color: 'black', fontFamily: Fonts.semibold }}>Browse categories</Text>
        <Text
          style={{ fontSize: responsiveFontSize(1.4), color: 'black', fontFamily: Fonts.regular }}
          onPress={() => navigation.navigate('Categories')}>
          See all
        </Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                padding: 2,
                // backgroundColor: 'red',
                margin: 2
              }}>
              <Image
                source={{
                  uri: `${item.image}`,
                }}
                style={{
                  height: width / 7,
                  width: width / 7,
                  // resizeMode: 'contain',
                }}
              />
              <Text style={{ fontSize: responsiveFontSize(1.2), color: 'black', fontFamily: Fonts.medium }}>{item.title}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default BrowseCategories;

const styles = StyleSheet.create({
  CategoriesBox: {
    padding: 5,
    width: width,
    // backgroundColor: 'orange'
    gap: 5
  },
});
