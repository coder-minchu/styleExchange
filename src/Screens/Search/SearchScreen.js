

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, FlatList, Text, Image, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { Fonts } from '../../utils/Fonts';
import { AppColor } from '../../utils/AppColor';
import { responsiveFontSize, height, width } from '../../utils/Dimensions/Dimension';
import { SearchSuggetionsAction } from '../../Redux/Action/SearchSuggetionsAction';

const SearchScreen = ({ navigation, ...props }) => {
    console.log("🚀 ~ file: SearchScreen.js:14 ~ SearchScreen ~ props:", props)
    const searchRef = useRef(null);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const suggetionsRes = useSelector((state) => state.SearchSuggetionsReducer.SEARCHSUGGETIONS);
    console.log("🚀 ~ file: SearchScreen.js:19 ~ SearchScreen ~ suggetionsRes:", suggetionsRes)


    useEffect(() => {
        searchRef.current.focus();
        return () => {
            dispatch({ type: 'SearchSuggetions', payload: [] });
        }
    }, [])

    useEffect(() => {
        if (props && props.route && props.route.params && props.route.params.textSearch) {
            setSearchText(props.route.params.textSearch)
        }
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
            // console.log('Perform search with text:', text);
            let params = {
                search: text
            }
            dispatch(SearchSuggetionsAction(params))
        }, 200), []
    );

    const handleSearchTextChange = (text) => {
        setSearchText(text);
        debouncedSearch(text);
    };

    const handleSearchSubmit = () => {
        navigation.navigate('ProductListing',
            { search: searchText },
        );
    };
    const handleSuggestionPressSubmit = (suggestion) => {
        navigation.navigate('ProductListing',
            { search: suggestion },
        );
    };
    const handleSuggestionPress = (suggestion) => {
        setSearchText(suggestion);
        searchRef.current.focus();
        dispatch(SearchSuggetionsAction({ search: suggestion }));
    };
    const isBrand = (item) => suggetionsRes.brand.includes(item);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackButtonPress}>
                    <Icon name="arrow-back" size={height / 40}
                        color="#000" />
                </TouchableOpacity>
                <View
                    style={[
                        styles.searchContainer,
                        // isFocused ? styles.focusedTextInput : null,
                    ]}
                >
                    <Icon
                        name="search"
                        size={height / 50}
                        color={AppColor.grey}
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
            {suggetionsRes && suggetionsRes.brand && suggetionsRes.brand.length > 0 && (
                <FlatList
                    data={[...suggetionsRes.brand, ...suggetionsRes.subCategories]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5,
                            borderColor: AppColor.borderColor,
                            paddingHorizontal: 5
                        }} >
                            <TouchableOpacity onPress={() => handleSuggestionPressSubmit(item)} style={[styles.suggestionItem, { flexDirection: 'row' }]}>
                                <Icon
                                    name="search"
                                    size={height / 50}
                                    color={"#ccc"}
                                    style={styles.searchIcon}
                                />
                                <Text style={[styles.suggestionText]}>
                                    {item}
                                </Text>
                                {
                                    isBrand(item) ? <Text style={styles.brandText}>  Brand</Text> : <Text style={styles.brandText}>  Sub-category</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.suggestionItem}>
                                <Icons name="arrow-up-left" size={height / 50} color="#000" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
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
        // padding: 5,
        backgroundColor: '#fff',
        marginHorizontal: 5,
        alignSelf: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AppColor.smokeWhite,
        borderRadius: 5,
        flex: 0.95,
        paddingLeft: 10,
        height: height / 20,
        marginLeft: 5,
        backgroundColor: AppColor.smokeWhite
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
        borderColor: AppColor.blueViolet, // Change border color when focused
        borderWidth: 2, // Change border width when focused
    },
    suggestionItem: {
        padding: height / 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 5,
    },
    suggestionText: {
        fontSize: responsiveFontSize(1.6),
        color: AppColor.grey,
        fontFamily: Fonts.PoppinsRegular,
    },
    suggestionText: {
        fontSize: responsiveFontSize(1.5),
        color: 'grey',
    },
    brandText: {
        fontSize: responsiveFontSize(1),
        color: 'blue',
    },
    subCategoryText: {
        color: 'black',
    },
});

export default SearchScreen;
