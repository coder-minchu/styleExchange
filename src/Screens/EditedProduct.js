import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { TextInput, Button, Avatar, Card, IconButton } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import { responsiveFontSize, width } from '../utils/Dimensions/Dimension';
import { Fonts } from '../utils/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { UploadedProductAction } from '../Redux/Action/GetUserAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditedProduct = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { item } = route.params;
    console.log("🚀 ~ file: EditedProduct.js:14 ~ EditedProduct ~ item:", item)

    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [details, setDetails] = useState('');
    const [condition, setCondition] = useState('');
    const [size, setSize] = useState('');
    const [purchase, setPurchase] = useState('');
    const [status, setStatus] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state

    const uploadedProductsRes = useSelector(
        state => state.GetUserReducer.EDITEDPRODUCT,
    );

    useEffect(() => {
        if (item) {
            setTitle(item.title || '');
            setBrand(item.brand || '');
            setDescription(item.description || '');
            setPrice(item.price && item.price || '');
            setDepositAmount(item.depositAmount || '');
            setDetails(item.details || '');
            setCondition(item.condition || '');
            setSize(item.size || '');
            setPurchase(item.purchase || '');
            setStatus(item.status || '');
            setAddress(item.address || '');
            setCity(item.city || '');
            setState(item.state || '');

            // Assuming 'images' is an array of image URLs
            setSelectedImages(item.upload || []);
        }
    }, [item]);

    useEffect(() => {
        if (
            uploadedProductsRes &&
            uploadedProductsRes?.message === 'Update Product Successfully!'
        ) {
            navigation.goBack();
        }
    }, [uploadedProductsRes]);

    const pickImage = async () => {
        try {
            ImagePicker.openPicker({
                multiple: true,
            }).then(images => {
                console.log(images);
                setSelectedImages(images);
            });
        } catch (error) {
            console.log('ImagePicker Error: ', error);
        }
    };

    const updateProduct = async () => {
        try {
            setLoading(true);

            const token = await AsyncStorage.getItem('Token');
            const parseToken = JSON.parse(token);

            let params = {
                product_id: item._id,
                title: title,
                brand: brand,
                description: description,
                price: price,
                depositAmount: depositAmount,
                details: details,
                condition: condition,
                size: size,
                purchase: purchase,
                status: status,
                address: address,
                city: city,
                state: state,
                upload: selectedImages,
            };

            dispatch(UploadedProductAction(params, parseToken));
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderImageItem = ({ item }) => (
        <Card style={styles.imageCard}>
            <Card.Cover source={{ uri: item.path }} />
            <IconButton
                icon="close"
                style={styles.deleteButton}
                color="red"
                size={20}
                onPress={() => handleDeleteImage(item)}
            />
        </Card>
    );

    const handleDeleteImage = image => {
        setSelectedImages(prevImages =>
            prevImages.filter(i => i.path !== image.path),
        );
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                label="Title"
                mode="outlined"
                value={title}
                onChangeText={text => setTitle(text)}
                style={styles.input}
            />
            <TextInput
                label="Brand"
                mode="outlined"
                value={brand}
                onChangeText={text => setBrand(text)}
                style={styles.input}
            />
            <TextInput
                label="Description"
                mode="outlined"
                value={description}
                onChangeText={text => setDescription(text)}
                style={styles.input}
            />
            <TextInput
                label="Price"
                mode="outlined"
                value={price.toString()}
                onChangeText={text => setPrice(text)}
                style={styles.input}
            />
            <TextInput
                label="Deposit Amount"
                mode="outlined"
                value={depositAmount}
                onChangeText={text => setDepositAmount(text)}
                style={styles.input}
            />
            <TextInput
                label="Details"
                mode="outlined"
                value={details}
                onChangeText={text => setDetails(text)}
                style={styles.input}
            />
            <TextInput
                label="Condition"
                mode="outlined"
                value={condition}
                onChangeText={text => setCondition(text)}
                style={styles.input}
            />
            <TextInput
                label="Size"
                mode="outlined"
                value={size}
                onChangeText={text => setSize(text)}
                style={styles.input}
            />
            <TextInput
                label="Purchase"
                mode="outlined"
                value={purchase}
                onChangeText={text => setPurchase(text)}
                style={styles.input}
            />
            <TextInput
                label="Status"
                mode="outlined"
                value={status}
                onChangeText={text => setStatus(text)}
                style={styles.input}
            />
            <TextInput
                label="Address"
                mode="outlined"
                value={address}
                onChangeText={text => setAddress(text)}
                style={styles.input}
            />
            <TextInput
                label="City"
                mode="outlined"
                value={city}
                onChangeText={text => setCity(text)}
                style={styles.input}
            />
            <TextInput
                label="State"
                mode="outlined"
                value={state}
                onChangeText={text => setState(text)}
                style={styles.input}
            />

            <Button mode="contained" onPress={pickImage} style={styles.button}>
                Pick Image
            </Button>
            {selectedImages.length > 0 && (
                <FlatList
                    data={selectedImages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderImageItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            )}
            <Button
                loading={loading}
                mode="contained"
                onPress={updateProduct}
                style={styles.button}>
                Update Product
            </Button>
        </ScrollView>
    );
};
export default EditedProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        marginBottom: 5,
        fontFamily: Fonts.poppins.medium,
        fontSize: responsiveFontSize(1.5),
    },
    button: {
        marginVertical: 16,
    },
    imageCard: {
        margin: 4,
        width: width / 3,
        height: width / 2,
        position: 'relative',
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
});
