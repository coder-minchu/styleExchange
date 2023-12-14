import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesAction } from '../../Redux/Action/CategoriesAction';
import { AppColor } from '../../utils/AppColor';
import { Fonts } from '../../utils/Fonts';
import { responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { customStyles } from '../../utils/Styles';

const Categories = ({ navigation }) => {
  const dispatch = useDispatch();

  const [activeButton, setActiveButton] = useState('Women');
  const [categoriesData, setCategoriesData] = useState([]);
  const categoriesRes = useSelector((state) => state.CategoriesReducer.CATEGORIES);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoriesRes && activeButton) {
      for (let item of categoriesRes?.categoriesTree) {
        if (item.title === 'Woman' && activeButton === 'Women') {
          setCategoriesData([categoriesRes?.categoriesTree[1]]);
        } else {
          setCategoriesData([categoriesRes?.categoriesTree[0]]);

        }
      }
    }
  }, [categoriesRes, activeButton]);

  useEffect(() => {
    if (categoriesRes) {
      setCategoriesData([categoriesRes?.categoriesTree[1]]);
    }
  }, [categoriesRes]);

  const fetchCategories = () => {
    try {
      dispatch(CategoriesAction());
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const renderCategoryButton = () => (
    <View style={styles.buttonRowContainer}>
      {renderButton('Women', "Women's")}
      {renderButton('Men', "Men's")}
    </View>
  );

  const renderButton = (buttonType, label) => (
    <LinearGradient
      colors={activeButton === buttonType ? AppColor.LinearGradient1 : ['#F5F5F5', '#F8F8FF']}
      style={styles.button}
    >
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => setActiveButton(buttonType)}
      >
        <Text style={[styles.buttonText, { color: activeButton === buttonType ? AppColor.white : AppColor.black }]}>
          {label}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  const renderSubCategoryCard = ({ item, index }) => {
    return (
      <View key={index} style={styles.subCategoriesContainer}>
        <Text style={customStyles.heading}>{item.title}</Text>
        <View style={styles.subCategoryContainer}>
          {item.children.map((val, inx, arr) => (
            <TouchableOpacity onPress={() => navigation.navigate('ProductListing')} key={inx} style={[styles.subCategory, arr.length > 4 && { height: '50%' }]}>
              <Image
                source={{ uri: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/005d8a86-0fb0-422a-9d1e-08a4cb885afb1701602275724-W--SAREES.jpg' }}
                style={styles.subCategoryImage}
              />
              <Text numberOfLines={1} style={customStyles.semiBoldText}>{val.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderCategoryItem = ({ item, index }) => (
    <View key={index} style={styles.categoryItem}>
      <FlatList
        data={item.children}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSubCategoryCard}
      />

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>{renderCategoryButton()}</View>
      <View style={{ flex: 0.9 }}>
        <FlatList
          data={categoriesData}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.1,
  },
  button: {
    height: '60%',
    width: '49%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonTouchable: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.lobster.regular,
    color: AppColor.white,
  },
  buttonRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  categoryItem: {
    marginBottom: 20,
  },
  subCategoriesContainer: {
    margin: 5,
  },
  subCategoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subCategory: {
    alignItems: 'center',
    backgroundColor: AppColor.smokeWhite,
    margin: 5,
    height: '100%',
    width: '22%',
    // width: width/5,
  },
  subCategoryImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});

export default Categories;
