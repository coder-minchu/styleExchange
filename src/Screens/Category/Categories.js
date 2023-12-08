import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppColor } from '../../utils/AppColor';
import { height, responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';

const Categories = ({ navigation }) => {

  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryListRef = useRef(null);

  const handleCategoryPress = useCallback(async (categoryId, index) => {
    setSelectedCategory(categoryId);

    // Scroll to the selected category in the main category list horizontally
    if (categoryListRef.current) {
      categoryListRef.current.scrollToIndex({ index, animated: true });
    }
  }, []);

  const CategoryItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => handleCategoryPress(item.id, index)}
        style={[
          styles.flatlistContainer,
          { backgroundColor: item.id === selectedCategory ? '#E2D1C3' : null },
        ]}>
        <Image style={styles.imageStyle} source={{ uri: 'https://gkdukaan.com/wp-content/uploads/2023/10/61utX8kBDlL._UY695_.jpg' }} />
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
          <Text style={styles.textStyle}>yash</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const navigateToProductList = useCallback((id) => {
    navigation.navigate('ProductList', {
      categoryId: id,
    });
  }, [navigation]);

  const renderSubcategoryItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigateToProductList(item.id)} style={styles.subcategoryContainer}>
        <View style={styles.subcategoryImageContainer}>
          <Image
            style={styles.subcategoryImage}
            source={{
              uri: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1694673510/Croma%20Assets/Communication/Mobiles/Images/300679_0_bsmo8n.png?tr=w-400',
            }}
          />
        </View>
        <Text numberOfLines={1} style={styles.subcategoryText}>
          yash
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flatlist1}>
        <FlatList
          ref={categoryListRef} // Assign the ref to the FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => <CategoryItem item={item} index={index} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.flatlist2}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderSubcategoryItem}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent:'center',
    // alignItems:'center'
  },
  flatlist1: {
    height: '100%',
    width: width / 4,
    // backgroundColor: '#E2D1C3',
    backgroundColor: '#fff',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  flatlist2: {
    height: height,
    width: width / 1.34,
    // backgroundColor: '#F5EEF8'
  },
  flatlistContainer: {
    height: height / 8,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'grey',
    borderBottomWidth: 0.3,
    borderColor: 'lightgrey',
    width: '98%',
    alignSelf: 'center',
    padding: 5
  },
  textStyle: {
    fontFamily: Fonts.poppins.medium,
    fontSize: responsiveFontSize(1.2),
    color: AppColor.blueViolet

  },
  imageStyle: {
    resizeMode: 'contain',
    height: 55,
    width: 55,
  },
  subcategoryContainer: {
    justifyContent: 'center',
    margin: 5,
    width: '30%',
    alignItems: 'center',
    height: height / 7,
  },

  subcategoryImageContainer: {
    height: width / 6,
    width: width / 6,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  subcategoryImage: {
    resizeMode: 'contain',
    height: 40,
    width: 40,
  },

  subcategoryText: {
    fontFamily: Fonts.poppins.medium,
    fontSize: responsiveFontSize(1.35),
    textAlign: 'center',
    paddingTop: 5,
  },
  subcategoryRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subcategoryImageSkeleton: {
    height: 70,
    width: 70,
    backgroundColor: 'lightgray',
  },

  subcategoryTextSkeleton: {
    width: '60%',
    height: '10%',
    marginTop: 5,
    backgroundColor: 'lightgray',
  }

});
