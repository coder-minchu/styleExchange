import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ProductListAction } from '../../Redux/Action/GetAllProductListAction';
import { AppColor } from '../../utils/AppColor';
import { customStyles } from '../../utils/Styles';
import { ActivityIndicator } from 'react-native-paper';
import ProductCard from './ProductCard';

const numColumns = 2;


const ProductList = React.memo(({ search }) => {

    const dispatch = useDispatch();
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isEndReached, setIsEndReached] = useState(false);

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchedText, setSearchedText] = useState('');

    const productListRes = useSelector((state) => state.ProductListReducer.PRODUCTLIST);
    const subLoadingProductsRes = useSelector((state) => state.ProductListReducer.loading);

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

    const fetchProductListApiCall = useCallback(async (params) => {
        try {
            await dispatch(ProductListAction(params));
            // Additional logic after API call
        } catch (error) {
            // Handle error
        }
    }, [dispatch]);

    const handleWishListApi = (id) => {
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
        fetchProductListApiCall(params);
    }, [page, productList.length, search, fetchProductListApiCall]);


    const renderProductCard = useCallback(({ item, index }) => {
        return (
            <ProductCard
                key={index}
                item={item}
                onPressWishlist={() => handleWishListApi(item.id)}
                onPressProductDetails={() => navigation.navigate('ProductDetails', { item })}
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