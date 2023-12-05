import React, {memo, useCallback, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {width} from '../utils/Dimensions/Dimension';
import {Images} from '../utils/Images';

const Slider = ({
  data,
  navigation,
  bannerContainerStyle,
  bannerImageStyle,
  indicatorContainerStyle,
  indicatorStyle,
  click,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let imageUrl = data[0].image;
  // console.log('first', imageUrl);

  let img;
  if (imageUrl) {
    let images = imageUrl?.split(':');
    img = `https://fashiononrent.appwizards.in/uploads/images/${images[2]}`;
  }

  // const navigateToProductList = (id) => {
  //   if (click) {
  //     navigation.navigate('ProductListScreen', {
  //       categoryId: id,
  //     });
  //   }
  // };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={[styles.bannerContainer, bannerContainerStyle]}>
        <Image
          source={{
            uri: img
              ? img
              : 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
          }}
          style={[styles.bannerImage, bannerImageStyle]}
          // source={{
          //   uri: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
          // }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        pagingEnabled
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const x = e.nativeEvent.contentOffset.x;
          setCurrentIndex(Math.round(x / width));
        }}
      />
      <View style={[styles.indicatorContainer, indicatorContainerStyle]}>
        {data.map((item, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              indicatorStyle,
              {
                width: currentIndex === index ? 10 : 8,
                height: currentIndex === index ? 10 : 8,
                borderRadius: currentIndex === index ? 5 : 4,
                backgroundColor: currentIndex == index ? '#fff' : 'grey',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};
export default Slider;
const styles = StyleSheet.create({
  container: {
    height: width / 2,
    width: width,
    marginTop: 2,
  },
  bannerImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  bannerContainer: {
    height: width / 2,
    width: '98%',
    backgroundColor: '#F1EFEF',
    borderRadius: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  indicator: {
    backgroundColor: '#fff',
    marginLeft: 10,
    borderWidth: 0.2,
    bottom: 10,
  },
});
