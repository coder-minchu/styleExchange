import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { customStyles } from '../../utils/Styles';
import { AppColor } from '../../utils/AppColor';
import { height, responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { BrandsAction } from '../../Redux/Action/GetBrandsAction';

const BrandBottomSheet = ({ handleApply }) => {
    const dispatch = useDispatch();

    console.log('BrandBottomSheet');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [allBrands, setAllBrands] = useState([]);
    const brandRes = useSelector((state) => state.BrandsReducer.BRANDSGET);

    useEffect(() => {
        fetchBrands();
    }, [searchQuery])

    useEffect(() => {
        if (brandRes) {
            setAllBrands(brandRes)
        }
    }, [brandRes])
    const fetchBrands = () => {
        let params = {
            search: searchQuery
        }
        dispatch(BrandsAction(params))
    }
    const onChangeSearch = query => setSearchQuery(query);

    const handleClearAll = () => {
        setSearchQuery('');
        setSelectedBrands([]);
    };



    const handleCheckboxToggle = brandId => {
        const updatedSelectedBrands = selectedBrands.includes(brandId)
            ? selectedBrands.filter(id => id !== brandId)
            : [...selectedBrands, brandId];

        setSelectedBrands(updatedSelectedBrands);
    };

    const filteredBrands = allBrands.filter(brand =>
        brand?.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={customStyles.headingView}>
                <Text style={customStyles.boldText}>Brand</Text>
            </View>
            <View style={styles.searchbarView}>
                <View style={styles.searchbarContainer}>
                    <Icon name="search" size={height / 50} color={AppColor.borderColor} style={styles.searchIcon} />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                </View>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1, paddingLeft: 10 }}>

                {!searchQuery && selectedBrands.length > 0 && (
                    <View style={[customStyles.headingView, { borderBottomWidth: 0 }]}>
                        <Text style={[customStyles.mediumText, { color: AppColor.grey }]}>Selected Brands</Text>
                    </View>
                )}
                <View styles={styles.selectedBrandContainer}>
                    {!searchQuery && selectedBrands?.map((selectedBrandId, idx) => {
                        const selectedBrand = allBrands?.find(brand => brand._id === selectedBrandId);
                        return (
                            <View key={idx} style={styles.brandItem}>
                                <Checkbox.Android
                                    status={'checked'}
                                    onPress={() => handleCheckboxToggle(selectedBrand._id)}
                                    color={AppColor.blueViolet}
                                />
                                <Text style={styles.brandText}>{selectedBrand?.brand}</Text>
                            </View>
                        );
                    })}
                </View>
                <View style={styles.searchResultsContainer}>
                    <View style={[customStyles.headingView, { borderBottomWidth: 0 }]}>
                        <Text style={[customStyles.mediumText, { color: AppColor.grey }]}>All Brands</Text>
                    </View>
                    {filteredBrands.map(brand => (
                        <TouchableOpacity key={brand._id} onPress={() => handleCheckboxToggle(brand._id)}>
                            <View style={styles.brandItem}>
                                <Checkbox.Android
                                    status={selectedBrands.includes(brand._id) ? 'checked' : 'unchecked'}
                                    onPress={() => handleCheckboxToggle(brand._id)}
                                    color={AppColor.blueViolet}
                                />
                                <Text style={styles.brandText}>{brand.brand}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.bottomButtonsContainer}>
                <Button mode="contained" textColor="black" buttonColor={AppColor.smokeWhite} style={styles.button} onPress={handleClearAll}>
                    Clear All
                </Button>
                <Button mode="contained" buttonColor={AppColor.blueViolet} style={styles.button} onPress={() => handleApply(selectedBrands, allBrands)}>
                    Apply
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchbarView: {
        height: height / 15,
        justifyContent: 'center',
    },
    searchbarContainer: {
        flexDirection: 'row',
        backgroundColor: AppColor.smokeWhite,
        height: height / 22,
        alignItems: 'center',
        width: width - 20,
        alignSelf: 'center',
        borderRadius: 8,
    },
    searchIcon: {
        marginLeft: 10,
        marginHorizontal: 10
    },
    inputStyle: {
        flex: 1,
        fontSize: responsiveFontSize(1.2),
        fontFamily: Fonts.poppins.medium,
        height: '100%',
    },
    brandListContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    brandItem: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingVertical: 8,
    },
    brandText: {
        marginLeft: 10,
        fontSize: responsiveFontSize(1.2),
    },
    selectedBrandContainer: {
        paddingHorizontal: 10
    },
    selectedBrandText: {
        fontSize: responsiveFontSize(1.2),
        marginVertical: 5,
    },
    searchResultsContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopWidth: 0.3,
        borderTopColor: AppColor.borderColor,
    },
    button: {
        flex: 1,
        marginRight: 8,
        borderWidth: 1,
    },
});

export default BrandBottomSheet;
