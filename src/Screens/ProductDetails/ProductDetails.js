import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  Text,
  Button,
  Divider,
  Title,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import { AppColor } from '../../utils/AppColor';
import {
  height,
  responsiveFontSize,
  width,
} from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Entypo';
import ProductCard from '../../Components/ProductCard.js/ProductCard';
import Share from 'react-native-share';
import AboutUsOverlay from '../../Components/AboutUsOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddWishlistAction } from '../../Redux/Action/WishlistAction';
import { useDispatch, useSelector } from 'react-redux';
import LoginBottomSheet from '../../Components/BottomSheet/LoginBottomSheet';
import OtpBottomSheet from '../../Components/BottomSheet/OtpBottomSheet';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { OtpVerifyAction } from '../../Redux/Action/OtpVerifyAction';
import { LoginAction } from '../../Redux/Action/LoginAction';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { SingleProductAction } from '../../Redux/Action/GetAllProductListAction';
import socketServcies from '../../utils/socketServcies';

const CustomHeader = ({ navigation, setAboutUsOverlayVisible, aboutUsOverlayVisible, productId }) => {
  const shareApplication = async () => {
    try {
      const link = await dynamicLinks().buildLink({
        link: `https://styleexchange.page.link/ProductDetails?productId=${productId}`,
        domainUriPrefix: 'https://styleexchange.page.link',
        android: {
          packageName: 'com.styleexchange',
        },
        analytics: {
          campaign: 'banner',
        },
      });

      const options = {
        message: 'Check out this awesome Product!',
        url: link,
        title: 'Share App',
      };

      await Share.open(options);
    } catch (error) {
      console.error('Error sharing content:', error.message);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" color="black" size={height / 50} />
      </TouchableOpacity>
      <View style={styles.headerIconsContainer}>
        <TouchableOpacity onPress={shareApplication} style={styles.icon}>
          <Icon name="share-social-outline" color="black" size={height / 50} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAboutUsOverlayVisible(!aboutUsOverlayVisible)}>
          <Icons name="dots-three-vertical" color="black" size={height / 50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const EyeView = () => {
  return (
    <View style={styles.eyeViewContainer}>
      <Icon name="eye" color="black" size={height / 50} />
      <Text style={styles.eyeViewText}>4</Text>
    </View>
  );
};

const ImageSliderComponent = ({
  scrollViewRef,
  handleScroll,
  renderImages,
  item,
  activeIndex,
  scrollToIndex,
  handleWishListApi,
}) => {
  return (
    <View style={styles.imageSliderContainer}>
      <TouchableOpacity onPress={() => handleWishListApi(item?._id)} style={styles.favoriteButton}>
        <Icon name="heart-outline" size={height / 40} color={AppColor.white} />
      </TouchableOpacity>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={200}
        decelerationRate="fast">
        {renderImages()}
      </ScrollView>

      <View style={styles.pagination}>
        {item?.upload?.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  index === activeIndex ? AppColor.blueViolet : AppColor.grey,
              },
            ]}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
    </View>
  );
};

const ProductDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { product_id } = route.params;
  const [singleProduct, setSingleProduct] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [aboutUsOverlayVisible, setAboutUsOverlayVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [otpBottomSheetVisible, setOtpBottomSheetVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [userDetails, setUserDetails] = useState({});

  const bottomSheetRef = useRef(null);
  const otpBottomSheetRef = useRef(null);
  const scrollViewRef = useRef();

  const singleProductRes = useSelector(state => state.ProductListReducer.SINGLEPRODUCT);
  // console.log("🚀 ~ ProductDetails ~ singleProductRes:", singleProductRes)
  const wishlistProductRes = useSelector(state => state.WishlistReducer.ADDWISHLIST);
  const loginRes = useSelector(state => state.LoginReducer.LOGINDATA);
  const otpRes = useSelector(state => state.OtpVerifyReducer.OTPVERIFY);

  useEffect(() => {
    if (product_id) {
      fetchUserDetails();
      dispatch({ type: 'SingleProduct', payload: {} });
      fetchSingleProduct(product_id);
    }
    return () => { };
  }, [product_id]);

  useEffect(() => {
    if (singleProductRes) {
      setLoading(false);
      setSingleProduct(singleProductRes.single_product);
    }
  }, [singleProductRes]);

  useEffect(() => {
    if (wishlistProductRes && wishlistProductRes.message) {
      Alert.alert(wishlistProductRes.message);
      dispatch({ type: 'addWishlist', payload: '' });
    }
  }, [wishlistProductRes, dispatch]);

  useEffect(() => {
    if (loginRes && loginRes.message === 'login') {
      setOtp1('');
      setOtp2('');
      setOtp3('');
      setOtp4('');
      setLoadings(false);
      closeLoginBottomSheet();
      setOtpBottomSheetVisible(true);
      otpBottomSheetRef.current?.expand();
    } else {
      setLoadings(false);
      setErrorText(loginRes.message);
    }
  }, [loginRes]);

  useEffect(() => {
    if (otpRes && otpRes.token && otpRes.message === 'login successfully') {
      setLoadings(false);
      navigateToDashboard(otpRes);
    } else {
      setLoadings(false);
      setErrorText(otpRes.message);
      dispatch({ type: 'LoginData', payload: '' });
    }
    return () => { };
  }, [otpRes]);

  useEffect(() => {
    if (errorText !== '') {
      setErrorText('');
    }
  }, [phoneNumber, otp1, otp2, otp3, otp4]);

  const fetchSingleProduct = productId => {
    try {
      setLoading(true);
      let params = {
        product_Id: productId,
      };
      dispatch(SingleProductAction(params));
    } catch (error) { }
  };

  const fetchUserDetails = async () => {
    let details = await AsyncStorage.getItem('UserDetails');
    let userParse = JSON.parse(details);
    setUserDetails(userParse)
  }

  const navigateToDashboard = async otpRes => {
    // await AsyncStorage.setItem('Token', JSON.stringify(otpRes.token));
    closeOtpBottomSheet();
    // navigation.navigate('Tabs');
  };

  const closeLoginBottomSheet = () => {
    setBottomSheetVisible(false);
    bottomSheetRef.current?.close();
  };

  const closeOtpBottomSheet = () => {
    setOtpBottomSheetVisible(false);
    otpBottomSheetRef.current?.close();
  };

  const handleLogin = () => {
    try {
      setLoadings(true);
      dispatch(LoginAction(phoneNumber));
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleOtpContinue = async () => {
    try {
      dispatch({ type: 'LoginData', payload: '' });
      setLoadings(true);
      let otp = otp1 + otp2 + otp3 + otp4;
      dispatch(OtpVerifyAction(otp));
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleScroll = event => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / Dimensions.get('window').width);
    setActiveIndex(index);
  };

  const renderImages = () => {
    return singleProduct?.upload?.map((image, index) => (
      <Image key={index} source={{ uri: image }} style={styles.sliderImage} />
    ));
  };

  const scrollToIndex = index => {
    scrollViewRef.current.scrollTo({
      x: Dimensions.get('window').width * index,
      animated: true,
    });
  };

  const handleWishListApi = async id => {
    const token = await AsyncStorage.getItem('Token');
    const parseToken = JSON.parse(token);
    if (token) {
      let params = {
        product_id: id,
      };
      dispatch(AddWishlistAction(params, parseToken));
    } else {
      setBottomSheetVisible(true);
    }
  };
  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="small" color={AppColor.blueViolet} />
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader
          productId={singleProduct?._id}
          aboutUsOverlayVisible={aboutUsOverlayVisible}
          setAboutUsOverlayVisible={setAboutUsOverlayVisible}
          navigation={navigation}
        />
        <AboutUsOverlay
          visible={aboutUsOverlayVisible}
          onClose={() => setAboutUsOverlayVisible(false)}
        />
        <ScrollView>
          <EyeView />
          <ImageSliderComponent
            scrollViewRef={scrollViewRef}
            handleScroll={handleScroll}
            renderImages={renderImages}
            item={singleProduct}
            activeIndex={activeIndex}
            scrollToIndex={scrollToIndex}
            handleWishListApi={handleWishListApi}
          />
          <View style={styles.detailsColumnsContainer}>
            <View style={styles.column}>
              <Title style={styles.title}>Title</Title>
              <Paragraph style={styles.paragraph}>
                {singleProduct?.title}
              </Paragraph>

              <Title style={styles.title}>Price</Title>
              <Paragraph>₹{singleProduct?.price}</Paragraph>

              <Title style={styles.title}>Condition</Title>
              <Paragraph>{singleProduct?.condition}</Paragraph>
            </View>

            <View style={styles.column}>
              <Title style={styles.title}>Location</Title>
              <Paragraph>
                {singleProduct?.city}, {singleProduct?.state}
              </Paragraph>

              <Title style={styles.title}>Deposit Amount</Title>
              <Paragraph>₹{singleProduct?.depositAmount}</Paragraph>

              <Title style={styles.title}>Description</Title>
              <Paragraph>{singleProduct?.description}</Paragraph>
            </View>
          </View>

          <View style={styles.sellerInfoContainer}>
            <Title style={styles.title}>Details</Title>
            <Paragraph>{singleProduct?.details}</Paragraph>
          </View>

          <Divider style={styles.divider} />
          <View style={styles.sellerInfoContainer}>
            <Title style={styles.title}>Seller Information</Title>
            <View style={styles.sellerInfo}>
              <Image
                source={{
                  uri: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe5c2d1e-716c-4cec-a6bf-934b5e6bcc191701602275798-W--DRESSES.jpg',
                }}
                style={styles.sellerImage}
              />
              <Text>Seller: {singleProduct?.user_Id}</Text>
            </View>
          </View>
          <Divider style={styles.divider} />
        </ScrollView>
        {userDetails?._id !== singleProduct?.user_Id && <Button
          icon={({ size, color }) => (
            <IconButton icon="message" iconColor={color} size={size} />
          )}
          mode="contained"
          onPress={() => navigation.navigate('ChatDetailsScreen', { user_Id: singleProduct?.user_Id })}
          style={styles.chatButton}>
          Chat with Seller
        </Button>}
        {bottomSheetVisible && (
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={['25%', '50%']}
            onClose={closeLoginBottomSheet}
            backdropComponent={props => <BottomSheetBackdrop {...props} />}>
            <LoginBottomSheet
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              errorText={errorText}
              setErrorText={setErrorText}
              handleLogin={handleLogin}
              loading={loadings}
              closeBottomSheet={closeLoginBottomSheet}
            />
          </BottomSheet>
        )}

        {otpBottomSheetVisible && (
          <BottomSheet
            ref={otpBottomSheetRef}
            index={1}
            snapPoints={['25%', '50%']}
            onClose={closeOtpBottomSheet}
            backdropComponent={props => <BottomSheetBackdrop {...props} />}>
            <OtpBottomSheet
              otp1={otp1}
              otp2={otp2}
              otp3={otp3}
              otp4={otp4}
              setOtp1={setOtp1}
              setOtp2={setOtp2}
              setOtp3={setOtp3}
              setOtp4={setOtp4}
              errorText={errorText}
              handleOtpContinue={handleOtpContinue}
              loading={loadings}
              closeBottomSheet={closeOtpBottomSheet} />
          </BottomSheet>
        )}
      </SafeAreaView>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0.2,
    borderColor: AppColor.borderColor,
    paddingBottom: 10,
    height: 50,
  },
  headerIconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  eyeViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: AppColor.offwhite,
  },
  eyeViewText: {
    paddingLeft: 5,
    fontSize: responsiveFontSize(1.2),
  },
  imageSliderContainer: {
    backgroundColor: AppColor.offwhite,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 30 : 40,
    width: Platform.OS === 'ios' ? 30 : 40,
    borderRadius: Platform.OS === 'ios' ? 15 : 20,
    zIndex: 999,
  },
  sliderImage: {
    width: width,
    height: width - 100,
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 5,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  detailsColumnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.poppins.bold,
  },
  paragraph: {
    marginBottom: 8,
  },
  divider: {
    marginVertical: 10,
  },
  sellerInfoContainer: {
    padding: 16,
    marginBottom: 16,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatButton: {
    position: 'absolute',
    bottom: 40,
    width: '90%',
    alignSelf: 'center',
  },
});

export default ProductDetails;
