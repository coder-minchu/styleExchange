import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ProductListAction } from '../../Redux/Action/GetAllProductListAction';
import { AppColor } from '../../utils/AppColor';
import { customStyles } from '../../utils/Styles';
import { ActivityIndicator } from 'react-native-paper';
import ProductCard from './ProductCard';
import { useNavigation } from '@react-navigation/native';
import { AddWishlistAction } from '../../Redux/Action/WishlistAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginBottomSheet from '../BottomSheet/LoginBottomSheet';
import OtpBottomSheet from '../BottomSheet/OtpBottomSheet';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { OtpVerifyAction } from '../../Redux/Action/OtpVerifyAction';
import { LoginAction } from '../../Redux/Action/LoginAction';

const numColumns = 2;


const ProductList = React.memo(({ search, selectedFiltersData }) => {
    // console.log("🚀 ~ file: ProductList.js:17 ~ ProductList ~ selectedFiltersData:", selectedFiltersData)

    const dispatch = useDispatch();

    const navigation = useNavigation();
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(1);
    // const [loading, setLoading] = useState(false);
    const [isEndReached, setIsEndReached] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchedText, setSearchedText] = useState('');
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [otpBottomSheetVisible, setOtpBottomSheetVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorText, setErrorText] = useState('');
    const [loadings, setLoadings] = useState(false);
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');

    const bottomSheetRef = useRef(null);
    const otpBottomSheetRef = useRef(null);

    const loginSnapPoints = useMemo(() => ['25%', '50%'], []);
    const otpSnapPoints = useMemo(() => ['25%', '50%'], []);

    const productListRes = useSelector((state) => state.ProductListReducer.PRODUCTLIST);
    const subLoadingProductsRes = useSelector((state) => state.ProductListReducer.loading);
    const wishlistProductRes = useSelector(state => state.WishlistReducer.ADDWISHLIST);
    const loginRes = useSelector((state) => state.LoginReducer.LOGINDATA);
    const otpRes = useSelector((state) => state.OtpVerifyReducer.OTPVERIFY);
    console.log("🚀 ~ file: Tabs.js:139 ~ Tabs ~ loginRes:", otpRes)

    useEffect(() => {
        if (wishlistProductRes && wishlistProductRes.message) {
            Alert.alert(wishlistProductRes.message);
        }
        return () => {
            dispatch({ type: 'addWishlist', payload: '' });
        }
    }, [wishlistProductRes])

    useEffect(() => {
        setProductList([]);
        let params = {
            page: page,
            perPage: 10,
            search: search
        }
        fetchProductListApiCall(params)
        return () => {
            setProductList([]);
            dispatch({ type: 'ProductList', payload: '' });
        }
    }, [])

    useEffect(() => {
        if (selectedFiltersData && selectedFiltersData.length > 0) {
            let params = {
                page: 1,
                perPage: 10,
                search: search
            }
            selectedFiltersData.forEach(({ key, selectedValues }) => {
                params[key.toLowerCase()] = selectedValues.join(',');
            });
            setPage(1);
            fetchProductListApiCall(params)
        }
    }, [selectedFiltersData])

    useEffect(() => {
        if (productListRes) {
            // if (productListRes.length === 0 && productListRes.length < 1) {
            //   setSearchedText("")
            // }
            if (page === 1) {
                setProductList(productListRes.filteredProducts);
                setIsRefreshing(false);

            } else {
                setIsEndReached(false);
                setProductList((prev) => [...prev, ...productListRes.filteredProducts]);
                setIsRefreshing(false);
            }
        }
    }, [productListRes]);

    useEffect(() => {
        if (loginRes && loginRes.message === "login") {
            setOtp1('');
            setOtp2('');
            setOtp3('');
            setOtp4('');
            setLoadings(false)
            closeLoginBottomSheet();
            setOtpBottomSheetVisible(true);
            otpBottomSheetRef.current?.expand();
        } else {
            setLoadings(false)
            setErrorText(loginRes.message)
        }

        return () => {

        }
    }, [loginRes])

    useEffect(() => {
        if (otpRes && otpRes.token && otpRes.message === "login successfully") {
            setLoadings(false)
            navigateToDashboard(otpRes)
        } else {
            setLoadings(false)
            setErrorText(otpRes.message)
            dispatch({ type: 'LoginData', payload: '' });
        }

        return () => {

        }
    }, [otpRes])

    useEffect(() => {
        if (errorText !== '') {
            setErrorText('')
        }
    }, [phoneNumber, otp1, otp2, otp3, otp4])

    const navigateToDashboard = async (otpRes) => {
        await AsyncStorage.setItem('Token', JSON.stringify(otpRes.token));
        closeOtpBottomSheet();
        // navigation.navigate('Tabs');
    }
    const closeLoginBottomSheet = () => {
        setBottomSheetVisible(false);
        bottomSheetRef.current?.close();
    };

    const closeOtpBottomSheet = () => {
        setOtpBottomSheetVisible(false);
        otpBottomSheetRef.current?.close();
    };

    const handleLogin = () => {
        console.log('Logging in with phone number:', phoneNumber);
        try {
            setLoadings(true)
            dispatch(LoginAction(phoneNumber))
        } catch (error) {
            Alert.alert(error.message)
        }
    };

    const handleOtpContinue = async () => {
        try {
            dispatch({ type: 'LoginData', payload: '' });
            setLoadings(true)
            let otp = otp1 + otp2 + otp3 + otp4;
            dispatch(OtpVerifyAction(otp))
        } catch (error) {
            Alert.alert(error.message)
        }
    };


    const fetchProductListApiCall = useCallback(async (params) => {
        try {
            await dispatch(ProductListAction(params));
            // Additional logic after API call
        } catch (error) {
            // Handle error
        }
    }, [dispatch]);

    const handleWishListApi = async (id) => {
        const token = await AsyncStorage.getItem('Token');
        const parseToken = JSON.parse(token);
        if (token) {
            let params = {
                product_id: id
            };
            console.log(id);
            dispatch(AddWishlistAction(params, parseToken))
        } else {
            setBottomSheetVisible(true)
        }
    }


    const onRefresh = () => {
        if (!isEndReached) {
            setPage(1);
            setIsRefreshing(true);
            setIsEndReached(false);
        }
    };

    const onEndReached = useCallback(() => {
        if (productList.length < 10 && page !== 0) {
            return;
        }
        const newPage = page + 1;
        setPage(newPage);

        let params = {
            page: newPage,
            perPage: 10,
            search: search
        };
        selectedFiltersData.forEach(({ key, selectedValues }) => {
            params[key.toLowerCase()] = selectedValues.join(',');
        });
        fetchProductListApiCall(params);
    }, [page, selectedFiltersData, productList.length, search, fetchProductListApiCall]);


    const renderProductCard = useCallback(({ item, index }) => {
        return (
            <ProductCard
                key={index}
                item={item}
                onPressWishlist={() => handleWishListApi(item._id)}
                array={productList}
            />
        );
    }, [productList]);

    return (
        <View style={styles.productListContainer}>
            {
                productList.length > 0 ? (
                    <FlatList
                        data={productList}
                        renderItem={renderProductCard}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={numColumns}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={onRefresh}
                                colors={[AppColor.blueViolet]}
                            />
                        }
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={() => {
                            if (subLoadingProductsRes) {
                                return (
                                    <View style={{}}>
                                        <ActivityIndicator size="large" color={AppColor.blueViolet} />
                                    </View>
                                );
                            } else {
                                return null;
                            }
                        }}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <>
                            <Text style={customStyles.mediumText}>Fetching Products....</Text>
                            <ActivityIndicator size="large" color={AppColor.blueViolet} />
                        </>
                    </View>
                )
            }
            {bottomSheetVisible && (
                <BottomSheet ref={bottomSheetRef} index={1} snapPoints={loginSnapPoints} onClose={closeLoginBottomSheet} backdropComponent={(props) => <BottomSheetBackdrop {...props} />}>
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
                <BottomSheet ref={otpBottomSheetRef} index={1} snapPoints={otpSnapPoints} onClose={closeOtpBottomSheet} backdropComponent={(props) => <BottomSheetBackdrop {...props} />}>
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
                        closeBottomSheet={closeOtpBottomSheet}
                    />
                </BottomSheet>
            )}
        </View>
    )
});

export default ProductList

const styles = StyleSheet.create({
    productListContainer: {
        marginTop: 5,
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },

})