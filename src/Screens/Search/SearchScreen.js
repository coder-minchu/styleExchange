

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, FlatList, Text, Image, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { Fonts } from '../../utils/Fonts';
import { AppColor } from '../../utils/AppColor';
import { responsiveFontSize, height } from '../../utils/Dimensions/Dimension';

const SearchScreen = ({ navigation, ...props }) => {
    const searchRef = useRef(null);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);


    useEffect(() => {
        searchRef.current.focus();
    }, [])

    const handleBackButtonPress = () => {
        navigation.goBack();
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const debouncedSearch = useCallback(
        debounce((text) => {
            console.log('Perform search with text:', text);
            // let params = {
            //     search: text
            // }
            // dispatch(fetchSubCategoriesProducts(params))
        }, 200), []
    );

    const handleSearchTextChange = (text) => {
        setSearchText(text);
        debouncedSearch(text);
    };

    const handleSearchSubmit = () => {
        navigation.navigate('Home', {
            screen: 'ProductListScreen',
            params: {
                search: searchText,
            },
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackButtonPress}>
                    <Icon name="arrow-back" size={30} color="#000" />
                </TouchableOpacity>
                <View
                    style={[
                        styles.searchContainer,
                        isFocused ? styles.focusedTextInput : null,
                    ]}
                >
                    <Icon
                        name="search"
                        size={25}
                        color={isFocused ? '#4A00E0' : "#ccc"}
                        style={styles.searchIcon}
                    />
                    <TextInput
                        ref={searchRef}
                        style={styles.textInput}
                        placeholder="Search..."
                        value={searchText}
                        onChangeText={handleSearchTextChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onSubmitEditing={handleSearchSubmit}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        // marginHorizontal: 5
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        flex: 0.95,
        paddingLeft: 10,
        height: height / 20
    },
    searchIcon: {
        marginRight: 10,
    },
    textInput: {
        // flex: 1,
        fontSize: responsiveFontSize(1.4),
        padding: 0,
        // backgroundColor: 'red',
        width: '80%',
        height: height / 20

    },
    focusedTextInput: {
        borderColor: '#4A00E0', // Change border color when focused
        borderWidth: 2, // Change border width when focused
    },
    productContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        width: '96%',
        alignSelf: 'center',
    },
    productImage: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    productName: {
        fontSize: responsiveFontSize(1.7),
        color: AppColor.black,
        fontFamily: Fonts.PoppinsSemiBold,
        paddingLeft: 10,
    },
    price: {
        fontSize: responsiveFontSize(1.4),
        color: 'green',
        fontFamily: Fonts.poppins.semiBold,
        paddingLeft: 10,
    },
});

export default SearchScreen;
