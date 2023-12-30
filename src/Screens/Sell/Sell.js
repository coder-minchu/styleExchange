import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput, IconButton, Appbar, Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesAction } from '../../Redux/Action/CategoriesAction';
import { AppColor } from '../../utils/AppColor';
import { height, responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';
import { customStyles } from '../../utils/Styles';
import ImagePicker from 'react-native-image-crop-picker';
import { SellAction } from '../../Redux/Action/SellAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

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
  const [selectedData, setSelectedData] = useState({
    parentCategories_Id: "",
    subCategories_Id: "",
    sub_subCategories_Id: "",
    title: "",
    description: "",
    price: "",
    depositAmount: "",
    details: "",
    condition: "",
    brand: "",
    size: "",
    purchasePrice: "",
    status: "",
    longitude: "",
    latitude: "",
    address: "",
    city: "",
    state: "",
    upload: "",
  });
  console.log("🚀 ~ file: Sell.js:25 ~ Sell ~ location:", location)
  const {
    parentCategories_Id,
    subCategories_Id,
    sub_subCategories_Id,
    title,
    description,
    price,
    depositAmount,
    details,
    condition,
    brand,
    size,
    purchasePrice,
    status,
    longitude,
    latitude,
    address,
    city,
    state,
    upload,
  } = selectedData;

  const categoriesRes = useSelector((state) => state.CategoriesReducer.CATEGORIES);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoriesRes && categoriesRes.categoriesTree.length > 0) {
      setCategoriesData(categoriesRes.categoriesTree);
    }
  }, [categoriesRes]);



  const fetchCategories = () => {
    try {
      dispatch(CategoriesAction());
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.log('Error getting location:', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const requestLocationPermission = async () => {
    try {
      const result = await requestPlatformSpecificPermission();

      if (result === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const requestPlatformSpecificPermission = async () => {
    let permission;

    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    } else if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    }

    const result = await request(permission);
    return result;
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

  const handleSubmitButton = async () => {
    let token = await AsyncStorage.getItem('Token');
    try {
      let params = {
        ...selectedData,
        token
      }
      dispatch(SellAction(params))
      console.log(params);
    } catch (error) {

    }
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
    setSelectedData({ ...selectedData, parentCategories_Id: sortOption.id });
    setSelectedButton(null)
    setSelectedSubSubButton(null)
    setSelectedCategory(sortOption.title);
    setSelectedSubCategory(sortOption.children);
  };

  const handleSubButtonPress = (index, val) => {
    setSelectedData({ ...selectedData, subCategories_Id: val.id });

    setSelectedButton(index);
    setSelectedSubSubCategory(val.children);
  };

  const handleSubSubButtonPress = (index, val) => {
    setSelectedData({ ...selectedData, sub_subCategories_Id: val.id });
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
        setSelectedData({ ...selectedData, upload: images });
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

  const setSelectedDataField = (field, value) => {
    setSelectedData((prevData) => ({ ...prevData, [field]: value }));
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
        {currentStep === 5 && (
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

        {location && currentStep === 1 && (
          <View style={styles.containerMap}>
            <MapView
              showsUserLocation
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: parseFloat(location?.latitude),
                longitude: parseFloat(location?.longitude),
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
            </MapView>
          </View>
          // <View>
          //   <TextInput
          //     label="Latitude"
          //     value={selectedData.latitude}
          //     style={styles.Textinput}
          //     mode="outlined"
          //     onChangeText={(text) => setSelectedData({ ...selectedData, latitude: text })}
          //     keyboardType="numeric"
          //   />
          //   <TextInput
          //     label="Longitude"
          //     value={selectedData.longitude}
          //     style={styles.Textinput}
          //     mode="outlined"
          //     onChangeText={(text) => setSelectedData({ ...selectedData, longitude: text })}
          //     keyboardType="numeric"
          //   />
          //   <TextInput
          //     label="State"
          //     value={selectedData.state}
          //     style={styles.Textinput}
          //     mode="outlined"
          //     onChangeText={(text) => setSelectedData({ ...selectedData, state: text })}
          //   />
          //   <TextInput
          //     label="City"
          //     value={selectedData.city}
          //     style={styles.Textinput}
          //     mode="outlined"
          //     onChangeText={(text) => setSelectedData({ ...selectedData, city: text })}
          //   />
          //   <TextInput
          //     label="Address"
          //     value={selectedData.address}
          //     style={styles.Textinput}
          //     mode="outlined"
          //     onChangeText={(text) => setSelectedData({ ...selectedData, address: text })}
          //   />
          // </View>
        )}


        {currentStep === 6 && (
          <ScrollView>
            <TextInput
              label="Title"
              value={title}
              style={styles.Textinput}
              mode="outlined"
              onChangeText={(text) => setSelectedDataField('title', text)}
            />
            <TextInput
              label="Description"
              value={description}
              style={styles.Textinput}
              mode="outlined"
              onChangeText={(text) => setSelectedDataField('description', text)}
            />
            <TextInput
              label="Price"
              value={price}
              style={styles.Textinput}
              mode="outlined"
              onChangeText={(text) => setSelectedDataField('price', text)}
              keyboardType="numeric"
            />
            <TextInput
              label="Deposit Amount"
              value={depositAmount}
              style={styles.Textinput}
              mode="outlined"
              onChangeText={(text) => setSelectedDataField('depositAmount', text)}
              keyboardType="numeric"
            />
            <TextInput
              label="Details"
              value={details}
              style={styles.Textinput}
              mode="outlined"
              onChangeText={(text) => setSelectedDataField('details', text)}
            />
            <TextInput
              label="Condition"
              value={condition}
              style={styles.Textinput}
              mode="outlined"
              onChangeText={(text) => setSelectedDataField('condition', text)}
            />
            <TextInput
              label="Size"
              value={size}
              style={styles.Textinput}
              mode="outlined"
              onChangeText={(text) => setSelectedDataField('size', text)}
            />
            <TextInput
              label="Brand"
              value={brand}
              style={styles.Textinput}
              mode="outlined"
              onChangeText={(text) => setSelectedDataField('brand', text)}
            />
            <TextInput
              label="Purchase Price"
              value={purchasePrice}
              style={styles.Textinput}
              mode="outlined"
              onChangeText={(text) => setSelectedDataField('purchasePrice', text)}
              keyboardType="numeric"
            />
            <TextInput
              label="Status"
              value={status}
              style={styles.Textinput}
              mode="outlined"
              onChangeText={(text) => setSelectedDataField('status', text)}
            />
          </ScrollView>
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
            onPress={handleSubmitButton}
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
    backgroundColor: AppColor.white,
  },
  containerMap: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
  Textinput: {
    margin: 10
  }
});

export default Sell;
