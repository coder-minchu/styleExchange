import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput, IconButton, Appbar, Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesAction } from '../../Redux/Action/CategoriesAction';
import { AppColor } from '../../utils/AppColor';
import { height, responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';
import { customStyles } from '../../utils/Styles';
import ImagePicker from 'react-native-image-crop-picker';

const Sell = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState('');
  const [location, setLocation] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [media, setMedia] = useState('');
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedSubSubButton, setSelectedSubSubButton] = useState(null);

  const categoriesRes = useSelector((state) => state.CategoriesReducer.CATEGORIES);

  useEffect(() => {
    if (categoriesRes && categoriesRes.categoriesTree.length > 0) {
      setCategoriesData(categoriesRes.categoriesTree);
    }
  }, [categoriesRes]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    try {
      dispatch(CategoriesAction());
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setCurrentStep(currentStep + 1);
  };

  const handleSubCategorySelection = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setCurrentStep(currentStep + 1);
  };

  const handleSubSubCategorySelection = (subSubCategory) => {
    setSelectedSubSubCategory(subSubCategory);
    setCurrentStep(currentStep + 1);
  };

  const handleLocationInput = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleProductDetailsInput = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleMediaUpload = () => {
    // Perform media upload logic
    // After successful upload, navigate to user products page
    // navigation.navigate('UserProducts');
  };

  const handleBackButton = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Navigate back to the previous screen or handle as needed
      navigation.goBack();
    }
  };
  const handleSortClick = (sortOption) => {
    setSelectedButton(null)
    setSelectedSubSubButton(null)
    setSelectedCategory(sortOption.title);
    setSelectedSubCategory(sortOption.children);
  };

  const handleSubButtonPress = (index, val) => {
    setSelectedButton(index);
    setSelectedSubSubCategory(val.children);
  };

  const handleSubSubButtonPress = (index, val) => {
    setSelectedSubSubButton(index);
    // setSelectedSubSubCategory(val.children);
  };
  const handleSelectImage = async () => {
    try {
      ImagePicker.openPicker({
        multiple: true
      }).then(images => {
        console.log(images);
        setMedia(images)
      });
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };


  const handleNextButton = () => {
    switch (currentStep) {
      case 1:
        if (selectedCategory) {
          setCurrentStep(currentStep + 1);
        } else {
          Alert.alert('Please select a category');
        }
        break;
      case 2:
        if (selectedButton) {
          setCurrentStep(currentStep + 1);
        } else {
          Alert.alert('Please select a sub-category');
        }
        break;
        // case 3:
        //   if (selectedSubSubButton) {
        //     setCurrentStep(currentStep + 1);
        //   } else {
        //     Alert.alert('Please select a sub-sub-category');
        //   }
        break;
      default:
        setCurrentStep(currentStep + 1);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header mode='small'

      >
        {currentStep > 1 ? (
          <IconButton icon="arrow-left" onPress={handleBackButton} />
        ) : <IconButton icon="close" onPress={() => navigation.goBack()} />
        }
        <Appbar.Content title={currentStep === 1 ? "Select Category" : (currentStep === 2 ? "Select Sub-Category" : currentStep === 3 ? "Select Sub-Sub-Category" : currentStep === 4 ? "Select Images" : currentStep === 5 ? "Enter Location" : "Details")} />
      </Appbar.Header>

      <View style={styles.stepContainer}>
        {currentStep === 1 && (
          <View style={styles.bottomSheetContainer}>
            {categoriesData && categoriesData.length > 0 && categoriesData.map((val) => (
              <View key={val.id}>
                <View style={styles.sortOptionContainer}>
                  <Checkbox.Android
                    status={selectedCategory === val.title ? 'checked' : 'unchecked'}
                    onPress={() => handleSortClick(val)}
                    color={AppColor.blueViolet}
                  />
                  <Text style={styles.sortOption}>{val.title}'s</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {currentStep === 2 && (
          <View style={styles.subCategoryContainer}>
            {selectedSubCategory &&
              selectedSubCategory.map((val, index) => (
                <Button
                  key={index}
                  style={[
                    styles.subCategory,
                    { margin: 5, },
                  ]}
                  labelStyle={[customStyles.semiBoldText, { color: selectedButton === index ? AppColor.blue : AppColor.black }]}

                  mode="outlined"
                  onPress={() => handleSubButtonPress(index, val)}
                >
                  {val.title}
                </Button>
              ))}
          </View>
        )}

        {currentStep === 3 && (
          <View style={styles.subCategoryContainer}>
            {selectedSubSubCategory &&
              selectedSubSubCategory.map((val, index) => (
                <Button
                  key={index}
                  style={[
                    styles.subCategory,
                    { margin: 5, },
                  ]}
                  labelStyle={[customStyles.semiBoldText, { color: selectedSubSubButton === index ? AppColor.blue : AppColor.black }]}

                  mode="outlined"
                  onPress={() => handleSubSubButtonPress(index, val)}
                >
                  {val.title}
                </Button>
              ))}
          </View>
        )}

        {currentStep === 4 && (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{}}>

              <Button
                mode="outlined"
                labelStyle={[customStyles.semiBoldText, { color: AppColor.black }]}

                title="Select Image"
                onPress={handleSelectImage}
              >Select Image</Button>
            </View>

            <View style={{ flex: 1, backgroundColor: 'white', marginTop: 10, alignItems: 'center' }}>
              {media && media.map((val, idx) => (
                <Image key={idx} source={{ uri: val.path }} style={{ width: width / 4, height: width / 4, marginVertical: 20 }} />

              ))}
            </View>
          </View>
        )}

        {currentStep === 5 && (
          <View>
            <TextInput
              label="Location"
              value={location}
              onChangeText={(text) => setLocation(text)}
            />
          </View>

        )}

        {currentStep === 6 && (
          <View>
            <TextInput
              label="Product Details"
              value={productDetails}
              onChangeText={(text) => setProductDetails(text)}
            />
          </View>
        )}
      </View>
      <View style={{ height: height / 8 }}>
        {currentStep < 6 && (
          <Button
            mode="contained"
            onPress={handleNextButton}
            style={styles.button}
          >
            Next
          </Button>
        )}

        {currentStep === 6 && (
          <Button
            mode="contained"
            onPress={handleMediaUpload}
            style={styles.button}
          >
            Submit
          </Button>
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
    padding: 16,
  },
  stepText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    margin: 16,
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  sortOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortOption: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: Fonts.poppins.regular,
    padding: 10,
  },
  subCategoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subCategory: {
    alignItems: 'center',
    // backgroundColor: AppColor.smokeWhite,
    margin: 5,
    // width: '22%',
  },
  stepText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Sell;
