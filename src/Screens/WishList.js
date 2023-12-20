import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { height, responsiveFontSize, width } from '../utils/Dimensions/Dimension';
import { Fonts } from '../utils/Fonts';
import { AppColor } from '../utils/AppColor';
import { GetWishlistAction } from '../Redux/Action/WishlistAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const numColumns = 2;

const Wishlist = () => {
    const dispatch = useDispatch();
    // const [loading, setloading] = useState(false);
    // const [refreshing, setRefreshing] = useState(false);
    const [wishlistData, setWishlistData] = useState([]);
    const wishlistRes = useSelector(state => state.WishlistReducer.WISHLIST);
    console.log("🚀 ~ file: WishList.js:30 ~ Wishlist ~ wishlistRes:", wishlistRes)
    // const loadingWishlistRes = useSelector(state => state.WishListReducer.loading);
    // const removeWishlistRes = useSelector(state => state.WishListReducer.wishlistRemoveData);
    // console.log("🚀 ~ file: wishListScreen.js:24 ~ Wishlist ~ removeWishlistRes:", loadingWishlistRes)

    useEffect(() => {
        wishlistApi();
        return () => {
            // dispatch(wishlistRemoveSuccess(''))
        }
    }, [])

    useEffect(() => {
        if (wishlistRes) {
            let data = wishlistRes && wishlistRes[0] && wishlistRes[0].product_ids
            setWishlistData(data)
        }
    }, [wishlistRes])


    const wishlistApi = async () => {
        const token = await AsyncStorage.getItem('Token');
        const parseToken = JSON.parse(token);
        await dispatch(GetWishlistAction(parseToken));
    };

    const handleRemoveFromWishlist = async (itemId) => {
        // const wishlist = wishlistData;
        // const updatedWishlist = wishlist.filter((item) => item.id !== itemId);
        // let body = { "products": [itemId] }
        // await dispatch(wishlistRemoveGetApi(body));
        // setWishlistData(updatedWishlist)
        let index = wishlistData.indexOf(itemId)
        let wishlist = wishlistData.splice(1, index)
        setWishlistData(wishlist)
        console.log("🚀 ~ file: WishList.js:57 ~ handleRemoveFromWishlist ~ splice:", wishlist)
    };

    // const onRefresh = () => {
    //     setRefreshing(true);
    //     wishlistApi();
    //     setRefreshing(false);
    // };

    const renderItem = ({ item, index }) => {

        return (
            <SafeAreaView >
                <View style={styles.itemContainer}>
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemoveFromWishlist(item)}>
                        <Icon name="cross" size={height / 50} color={AppColor.borderColor} />
                    </TouchableOpacity>
                    <Image style={styles.itemImage} source={{ uri: item && item.upload && item.upload[0] }} />
                    <View style={styles.itemDetails}>
                        {/* <Text numberOfLines={1} style={styles.itemName}>{item}</Text> */}
                        <Text style={styles.itemPrice}>
                            ₹
                            <Text style={styles.regularPrice}>₹</Text>
                            <Text style={styles.discountPercent}>% Off</Text>
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.moveToBagButton}>
                        <Text style={styles.moveToBagButtonText}>Chat with saller</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={wishlistData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                numColumns={numColumns} // Display two columns
            // refreshControl={ // Add the RefreshControl component here
            //     <RefreshControl
            //         refreshing={refreshing}
            //         onRefresh={onRefresh}
            //     />
            // }
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
    },
    itemContainer: {
        width: width / numColumns - 8,
        // height: height / 3,
        margin: 1,
        padding: 5,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        alignSelf: 'center'
    },
    removeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        // backgroundColor: 'red',
        // borderRadius: 50,
        padding: 5,
        bottom: 0,
        height: 30, width: 30,
        zIndex: 99,
        // justifyContent: 'center',
        // alignItems: 'center',

    },
    removeIcon: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemImage: {
        width: '100%',
        aspectRatio: 1,
    },
    itemDetails: {
        padding: 8,
    },
    itemName: {
        fontSize: responsiveFontSize(1.6),
        fontFamily: Fonts.poppins.semiBold
    },
    itemPrice: {
        fontSize: responsiveFontSize(1.3),
        fontFamily: Fonts.poppins.semiBold
    },
    regularPrice: {
        textDecorationLine: 'line-through',
        color: 'gray',
        fontSize: responsiveFontSize(1.3),
        fontFamily: Fonts.poppins.bold
    },
    discountPercent: {
        color: 'green',
        fontSize: responsiveFontSize(1.6),
        fontFamily: Fonts.poppins.semiBold
    },
    moveToBagButton: {
        backgroundColor: AppColor.blueViolet,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',


    },
    moveToBagButtonText: {
        color: 'white',
        fontSize: responsiveFontSize(1.3),
        fontWeight: 'bold',
    },
});

export default Wishlist;
