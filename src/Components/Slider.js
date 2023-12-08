import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { width, height } from '../utils/Dimensions/Dimension'; // Assuming you have a height utility
import { AppColor } from '../utils/AppColor';

const Slider = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.bannerContainer}>
        <Image
          style={styles.bannerImage}
          source={{
            uri: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_600,c_limit,fl_progressive/assets/images/2023/12/3/6a304928-5d9d-4e4c-bc68-1995baf2ead41701627623311-OOM--1-.gif'
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        pagingEnabled
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          setCurrentIndex(Math.round(x / width));
        }}
      />
      <View style={styles.indicatorContainer}>
        {data.map((item, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                width: currentIndex === index ? 10 : 8,
                height: currentIndex === index ? 10 : 8,
                borderRadius: currentIndex === index ? 5 : 4,
                backgroundColor:
                  currentIndex === index ? AppColor.white : 'grey',
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
    flex: 1,
  },
  bannerImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  bannerContainer: {
    backgroundColor: '#F1EFEF',
    // borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    // justifyContent: 'center',
    // height: height / 6,
    width: width,

  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 4,
    left: 0,
    right: 0,
  },
  indicator: {
    backgroundColor: '#fff',
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'grey',
    height: 10,
  },
});
