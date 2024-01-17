import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Image, Platform, Modal, ScrollView, StyleSheet, TouchableOpacity, View, SafeAreaView, FlatList } from 'react-native';
import { Button, Text, TextInput, IconButton, Appbar, Checkbox, Portal, Title, } from 'react-native-paper';
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
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';

const Sell = ({ navigation }) => {
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [isFullScreenModalVisible, setFullScreenModalVisible] = useState(false);
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
  const [states, setStates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setcurrentImageIndex] = useState(0);
  const [selectedState, setSelectedState] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

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
  const addProductRes = useSelector((state) => state.SellReducer.SELLDATA);
  // console.log("🚀 ~ file: Sell.js:82 ~ Sell ~ addProductRes:", addProductRes);

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

  useEffect(() => {
    if (addProductRes.message === 'Add Products Successfully!') {
      setLoading(false);
      setSelectedData({
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
      })
      navigation.navigate('UploadedProducts');
      setCurrentStep(1)
    } else {
      setLoading(false);
    }
  }, [addProductRes]);

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
        getCityStateArea(position.coords.latitude, position.coords.longitude)
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

  const getCityStateArea = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAuotoEbFO5U5Dkq9b0Gc6d2Cv4Hvqihl8`
      );
      // console.log("🚀 ~ file: Sell.js:133 ~ getCityStateArea ~ response:", response)

      if (response.data.results.length > 0) {
        const addressComponents = response.data.results[0].address_components;
        let city = '';
        let state = '';
        let area = '';

        for (const component of addressComponents) {
          if (component.types.includes('locality')) {
            city = component.long_name;
          } else if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
          } else if (
            component.types.includes('sublocality') ||
            component.types.includes('neighborhood')
          ) {
            area = component.long_name;
          }
        }

        console.log(city, state, area);
        setSelectedData({ ...selectedData, city: city, state: state, address: area, latitude: latitude, longitude: longitude });

        return { city, state, area };
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
      return { city: '', state: '', area: '' };
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
    if (isValidData()) {
      setLoading(true);
      const token = await AsyncStorage.getItem('Token');
      const parseToken = JSON.parse(token);
      try {
        let params = {
          ...selectedData,
          token,
        };
        dispatch(SellAction(params, parseToken));
        console.log(params);
      } catch (error) {
        // Handle error
        setLoading(false);
      }
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

  const isValidData = () => {
    if (!selectedData.title) {
      Alert.alert('Please enter a title');
      return false;
    }

    if (!selectedData.description) {
      Alert.alert('Please enter a description');
      return false;
    }

    if (!selectedData.price) {
      Alert.alert('Please enter a price');
      return false;
    }

    if (!selectedData.depositAmount) {
      Alert.alert('Please enter a deposit amount');
      return false;
    }

    if (!selectedData.details) {
      Alert.alert('Please enter details');
      return false;
    }

    if (!selectedData.condition) {
      Alert.alert('Please enter a condition');
      return false;
    }

    if (!selectedData.brand) {
      Alert.alert('Please enter a brand');
      return false;
    }

    if (!selectedData.size) {
      Alert.alert('Please enter a size');
      return false;
    }

    if (!selectedData.purchasePrice) {
      Alert.alert('Please enter a purchase price');
      return false;
    }

    if (!selectedData.status) {
      Alert.alert('Please enter a status');
      return false;
    }

    // Add similar checks for other fields

    return true;
  };


  const handleNextButton = () => {
    switch (currentStep) {
      case 1:
        if (!selectedData.parentCategories_Id) {
          Alert.alert('Please select a category');
          return;
        } else {
          setCurrentStep(currentStep + 1);
        }
        break;
      case 2:
        if (!selectedData.subCategories_Id) {
          Alert.alert('Please select a Sub-category');
          return;
        } else {
          setCurrentStep(currentStep + 1);
        }
        break;
      case 3:
        if (!selectedData.sub_subCategories_Id) {
          Alert.alert('Please select a Sub-Sub-category');
          return;
        } else {
          setCurrentStep(currentStep + 1);
        }
        break;
      case 4:
        if (!selectedData.upload && selectedData.upload.length === 0) {
          Alert.alert('Please select Images');
          return;
        } else {
          setCurrentStep(currentStep + 1);
        }
        break;
      case 5:
        if (!selectedData.latitude && !selectedData.longitude && !selectedData.city && !selectedData.state) {
          Alert.alert('Please select a Current location');
          return;
        } else {
          setCurrentStep(currentStep + 1);
        }
        break;
      default:
        setCurrentStep(currentStep + 1);
        break;
    }
  };

  const setSelectedDataField = (field, value) => {
    setSelectedData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleFullScreenModalClose = () => {
    setFullScreenModalVisible(false);
  };
  const handleSelectLocation = (item) => {
    console.log('Selected location item:', item);
    getCityStateArea(item.lat, item.lon);
    setFullScreenModalVisible(!isFullScreenModalVisible);
  };
  const debouncedSearch = useCallback(
    debounce(async (text) => {
      const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=IN&q=${text}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }


    }, 200), []
  );

  const handleSearchTextChange = (text) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };
  const handleSearchSubmit = () => {
    // setFullScreenModalVisible(!isFullScreenModalVisible)
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }) => {
    console.log(flatListRef.current);
    setcurrentImageIndex(viewableItems[0].index)
  };
  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }])

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
            <View style={{ flex: 0.2 }}>

              <Button
                mode="outlined"
                labelStyle={[customStyles.semiBoldText, { color: AppColor.black }]}

                title="Select Image"
                onPress={handleSelectImage}
              >Select Image</Button>
            </View>

            <View style={{ flex: 0.8, backgroundColor: 'white', alignItems: 'center', width: width - 30 }}>
              <FlatList
                data={media}
                horizontal
                pagingEnabled
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Image
                    key={index}
                    ref={flatListRef}
                    source={{ uri: item.path }}
                    style={{ width: width - 30, height: width / 2, resizeMode:'contain' }}
                  />
                )}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                // ListFooterComponent={({ item, index }) => (
                //   <Title style={styles.title} >{`${index + 1}/${media && media.length}`}</Title>

                // )}
                showsHorizontalScrollIndicator={false}
              />
              {media && media.length > 0 && <Title style={styles.title} >{`${currentImageIndex + 1}/${media && media.length}`}</Title>
              }
            </View>
          </View>
        )}

        {currentStep === 5 && (
          <View style={styles.containerMap}>
            {/* <Button title="Current location" mode='outlined' style={{ width: width - 50 }} /> */}
            <TouchableOpacity onPress={requestLocationPermission} style={{ borderWidth: 1, borderColor: AppColor.borderColor, height: 35, width: width - 30, alignItems: 'center', borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 5 }}>
              <Icon name="my-location" color={AppColor.grey} size={height / 50} />
              <Text style={[customStyles.mediumText, { color: AppColor.grey, fontSize: responsiveFontSize(1.3) }]}>{`Current location: ${address} ${city}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setFullScreenModalVisible(!isFullScreenModalVisible);
              // fetchAllStates();
            }} style={{ borderWidth: 1, borderColor: AppColor.borderColor, height: 35, width: width - 30, alignItems: 'center', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[customStyles.mediumText, { color: AppColor.grey, fontSize: responsiveFontSize(1.3) }]}>Somewhere else</Text>
            </TouchableOpacity>
          </View>
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
            loading={loading}
          >
            Submit
          </Button>
        )}
      </View>
      <Modal visible={isFullScreenModalVisible} onDismiss={handleFullScreenModalClose} contentContainerStyle={styles.fullScreenModalContainer}>
        <View style={{ flex: 1 }}>
          <Appbar.Header mode='small'>
            <IconButton icon="arrow-left" onPress={handleFullScreenModalClose} />
            <Appbar.Content title="Location" />
          </Appbar.Header>
          <View>
            <TextInput
              mode='outlined'
              placeholder="Search"
              value={searchQuery}
              onChangeText={handleSearchTextChange}
              // onFocus={handleFocus}
              // onBlur={handleBlur}
              onSubmitEditing={handleSearchSubmit}

              style={{ marginHorizontal: 10, height: 40 }}
            />
          </View>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5,
                borderColor: AppColor.borderColor,
                paddingHorizontal: 5,
                // backgroundColor: 'red',
                marginHorizontal: 10
              }} >
                <TouchableOpacity onPress={() => handleSelectLocation(item)} style={[styles.suggestionItem, { flexDirection: 'row' }]}>
                  <Iconn
                    name="search"
                    size={height / 50}
                    color={"#ccc"}
                    style={styles.searchIcon}
                  />
                  <View style={{ width: '90%', justifyContent: 'center' }}>
                    <Text style={[styles.suggestionText]}>
                      {item.display_name}
                    </Text>
                  </View>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSearchQuery(item.display_name)} style={styles.suggestionItem}>
                  <Icons name="arrow-up-left" size={height / 50} color="#000" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </Modal>

    </View >
  );
};

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  containerMap: {
    flex: 1,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 20
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
  },
  fullScreenModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: responsiveFontSize(1.6),
    color: AppColor.grey,
    fontFamily: Fonts.poppins.regular,
  },
  suggestionItem: {
    padding: height / 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.poppins.semiBold,
  },
});

export default Sell;
