import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { AppColor } from '../../utils/AppColor';
import { height, responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';
import { customStyles } from '../../utils/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { BrandsAction } from '../../Redux/Action/GetBrandsAction';
import Icon from 'react-native-vector-icons/Ionicons';

export default FilteredBottomSheet = ({ filters }) => {
    const dispatch = useDispatch();

    const [dummyFilters, setDummyFilters] = useState(filters);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [allBrands, setAllBrands] = useState([]);
    const brandRes = useSelector((state) => state.BrandsReducer.BRANDSGET);
    const toggleFilter = (filterName) => {
        const updatedFilters = dummyFilters.map((filter) => {
            if (filter.filterName === filterName) {
                const hasSelectedSubFilter = filter.sub_filters.some((subFilter) => subFilter.isSubSelected);

                return {
                    ...filter,
                    isVisible: !filter.isVisible,
                    isSelected: hasSelectedSubFilter,
                };
            } else {
                return {
                    ...filter,
                    isVisible: false,
                };
            }
        });


        setDummyFilters(updatedFilters);
    };

    const handleSubFilterOption = (filterName, subFilterName, subIndex) => {
        const updatedFilters = dummyFilters.map((filter) => {
            if (filter.filterName === filterName) {
                const updatedSubFilters = filter.sub_filters.map((subFilter, index) => {
                    if (index === subIndex) {
                        return {
                            ...subFilter,
                            isSubSelected: !subFilter.isSubSelected,
                        };
                    } else {
                        return subFilter;
                    }
                });

                const hasSelectedSubFilter = updatedSubFilters.some((subFilter) => subFilter.isSubSelected);

                return {
                    ...filter,
                    sub_filters: updatedSubFilters,
                    isSelected: hasSelectedSubFilter,
                };
            } else {
                return filter;
            }
        });

        setDummyFilters(updatedFilters);
    };


    const handleClearAll = () => {
        setSearchQuery('');
        setSelectedBrands([]);
        const clearedFilters = dummyFilters.map((filter) => ({
            ...filter,
            isSelected: false,
            isVisible: false,
            sub_filters: filter.sub_filters.map((subFilter) => ({
                ...subFilter,
                isSubSelected: false,
            })),
        }));
        setDummyFilters(clearedFilters);
    };

    const handleApply = () => {
        const visibleSelectedFilters = dummyFilters
            .map(({ filterName, sub_filters }) => {
                const selectedValues = sub_filters
                    .filter((subFilter) => subFilter.isSubSelected)
                    .map((subFilter) => subFilter.sub_filterName);

                return {
                    key: filterName,
                    selectedValues: selectedValues,
                };
            })
            .filter(({ selectedValues }) => selectedValues.length > 0);

        // Include selected brands in the applied filters
        if (selectedBrands.length > 0) {
            visibleSelectedFilters.push({
                key: 'Brand', // You can customize the key as needed
                selectedValues: selectedBrands.map((brandId) => {
                    const selectedBrand = allBrands.find((brand) => brand._id === brandId);
                    return selectedBrand?.brand;
                }),
            });
        }

        console.log('dummyFilters:', dummyFilters);
        console.log('Selected Filters:', visibleSelectedFilters);
    };





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

    // const handleClearAll = () => {
    //     setSearchQuery('');
    //     setSelectedBrands([]);
    // };



    const handleCheckboxToggle = (brandId) => {
        const updatedSelectedBrands = selectedBrands.includes(brandId)
            ? selectedBrands.filter((id) => id !== brandId)
            : [...selectedBrands, brandId];

        // Update isSelected for the 'Brand' filter
        const updatedFilters = dummyFilters.map((filter) => {
            if (filter.filterName === 'Brand') {
                return {
                    ...filter,
                    isSelected: updatedSelectedBrands.length > 0,
                };
            } else {
                return filter;
            }
        });

        setSelectedBrands(updatedSelectedBrands);
        setDummyFilters(updatedFilters);
    };


    const filteredBrands = allBrands.filter(brand =>
        brand?.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("🚀 ~ file: FilteredBottomSheet.js:142 ~ filteredBrands:", filteredBrands)
    return (
        <View style={styles.bottomSheetContainer}>
            <View style={customStyles.headingView}>
                <Text style={customStyles.boldText}>Filter</Text>
            </View>
            <View style={styles.filtersContainer}>
                <View style={styles.filterButtonsContainer}>
                    {dummyFilters.map((val, index) => (
                        <TouchableOpacity
                            disabled={val.isVisible ? true : false}
                            key={index}
                            style={[
                                styles.filterButton,
                                {
                                    backgroundColor: val.isVisible ? AppColor.white : AppColor.smokeWhite,
                                    borderLeftWidth: val.isVisible ? 5 : 0,
                                    borderColor: val.isVisible ? AppColor.blueViolet : AppColor.borderColor,
                                    borderBottomWidth: 0.9
                                },
                            ]}
                            onPress={() => toggleFilter(val.filterName)}
                        >
                            <Text
                                style={[
                                    styles.filterOption,
                                    {
                                        color: val.isVisible ? AppColor.black : AppColor.grey,
                                    },
                                ]}
                            >
                                {val.filterName}
                            </Text>
                            {val.isSelected && <Text style={{ color: AppColor.blueViolet, position: 'absolute', right: 5 }}> • </Text>}
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.subFiltersContainer}>
                    {dummyFilters.map((vals, index) => (
                        vals.isVisible && (
                            <View key={index}>
                                <View style={customStyles.headingView}>
                                    <Text style={customStyles.boldText}>{vals.filterName}</Text>
                                </View>

                                {vals.filterName === 'Brand' ?
                                    <ScrollView>
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
                                    </ScrollView> : (

                                        vals.sub_filters.map((item, subIndex) => (
                                            <View key={subIndex} style={styles.subFilterRow}>
                                                <Checkbox.Android
                                                    color={AppColor.blueViolet}
                                                    status={item.isSubSelected ? 'checked' : 'unchecked'}
                                                    onPress={() => handleSubFilterOption(vals.filterName, item.sub_filterName, subIndex)}
                                                />
                                                <Text style={styles.subFilterOption}>{item.sub_filterName}</Text>
                                            </View>
                                        ))

                                    )}

                            </View>
                        )
                    ))}
                </View>
            </View>
            <View style={styles.bottomButtonsContainer}>
                <Button mode="contained" textColor="black" buttonColor={AppColor.smokeWhite} style={styles.button} onPress={handleClearAll}>
                    Clear All
                </Button>
                <Button mode="contained" buttonColor={AppColor.blueViolet} style={styles.button} onPress={handleApply}>
                    Apply
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomSheetContainer: {
        flex: 1,
        justifyContent: 'flex-start',
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
    filterOption: {
        fontSize: responsiveFontSize(1.3),
        fontFamily: Fonts.poppins.semiBold,
        paddingLeft: 10,
        color: 'grey',
    },
    filterButton: {
        padding: 15,
        width: width / 3,
        justifyContent: 'center',
        // borderBottomWidth: 1,
        // borderColor: AppColor.borderColor,
    },
    filtersContainer: {
        flexDirection: 'row',
    },
    filterButtonsContainer: {
        width: width / 3,
        backgroundColor: AppColor.smokeWhite,
        height: height / 1.6
    },
    subFiltersContainer: {
        padding: 10,
        width: '65%',
        // backgroundColor:'orange'
    },
    subFilterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    subFilterOption: {
        color: 'grey',
        fontSize: responsiveFontSize(1.5),
    },
    searchbarView: {
        height: height / 16,
        justifyContent: 'center',
        width: '100%'
    },
    searchbarContainer: {
        flexDirection: 'row',
        backgroundColor: AppColor.smokeWhite,
        height: height / 24,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 8,
        alignSelf: 'center'
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
})
