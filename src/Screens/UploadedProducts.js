import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetUploadedProducts } from '../Redux/Action/GetUserAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { height, responsiveFontSize, width } from '../utils/Dimensions/Dimension';
import { Fonts } from '../utils/Fonts';

const UploadedProducts = ({ navigation }) => {
    const dispatch = useDispatch();
    const [productList, setProductList] = useState([]);
    const uploadedProductsRes = useSelector((state) => state.GetUserReducer.UPLOADEDPRODUCTS);
    const editedProductsRes = useSelector((state) => state.GetUserReducer.EDITEDPRODUCT);

    useEffect(() => {
        fetchUploadedProducts();
        return () => {
            dispatch({ type: 'EditedProduct', payload: '' });
        }
    }, []);

    useEffect(() => {
        if (editedProductsRes) {
            fetchUploadedProducts();
            dispatch({ type: 'EditedProduct', payload: '' });
        }
    }, [editedProductsRes]);

    useEffect(() => {
        if (uploadedProductsRes && uploadedProductsRes?.allData?.length > 0) {
            setProductList(uploadedProductsRes.allData);
        }
    }, [uploadedProductsRes]);

    const fetchUploadedProducts = async () => {
        const token = await AsyncStorage.getItem('Token');
        const parseToken = JSON.parse(token);
        dispatch(GetUploadedProducts(parseToken));
    };

    const onEditPress = (item) => {
        navigation.navigate('EditedProduct', { item })
        console.log(`Edit button pressed for product ID: ${item}`);
    };

    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.upload[0] ? item.upload[0] : 'https://source.unsplash.com/user/c_v_r/1900x800' }} style={styles.productImage} />
            </View>
            <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>Price: {item.price}</Text>
                <Text style={styles.productDetailsText}>Brand: {item.brand}</Text>
                <Text style={styles.productDetailsText}>Condition: {item.condition}</Text>
                <Text style={styles.productDetailsText}>Size: {item.size}</Text>
                <Text style={styles.productDetailsText}>Deposit Amount: {item.depositAmount}</Text>
                <Text style={styles.productDetailsText}>Status: {item.status}</Text>
                <Text style={styles.productDetailsText}>City: {item.city}</Text>
                <Text style={styles.productDetailsText}>State: {item.state}</Text>
                <Text style={styles.productDetailsText}>Address: {item.address}</Text>
                {/* Add/Edit button */}
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => onEditPress(item)}
                >
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {productList.length > 0 ? (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={productList}
                    keyExtractor={(item) => item._id}
                    renderItem={renderProductItem}
                />
            ) : (
                <Text style={styles.noProductsText}>No uploaded products found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    productItem: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    imageContainer: {
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: width / 4,
        height: height / 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        marginBottom: 10,
        resizeMode: 'contain'
    },
    productDetails: {
        padding: 10,
    },
    productTitle: {
        fontSize: responsiveFontSize(2),
        marginBottom: 5,
    },
    productDescription: {
        fontSize: responsiveFontSize(1),
        color: '#666',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: responsiveFontSize(1),
        fontFamily: Fonts.poppins.medium,
        marginBottom: 5,
        color: '#3498db',
    },
    productDetailsText: {
        fontSize: responsiveFontSize(1),
        marginBottom: 5,
    },
    editButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontFamily: Fonts.poppins.medium,
        fontSize: responsiveFontSize(1),

    },
    noProductsText: {
        textAlign: 'center',
        fontSize: responsiveFontSize(1),
        marginTop: 20,
    },
});

export default UploadedProducts;
