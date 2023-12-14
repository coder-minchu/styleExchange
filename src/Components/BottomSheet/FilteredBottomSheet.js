import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { AppColor } from '../../utils/AppColor';
import { responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';
import { customStyles } from '../../utils/Styles';

export default FilteredBottomSheet = ({ filters }) => {
    const [dummyFilters, setDummyFilters] = useState(filters);

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

        console.log('dummyFilters:', dummyFilters);
        console.log('Selected Filters:', visibleSelectedFilters);
    };


    return (
        <View style={styles.bottomSheetContainer}>
            <View style={customStyles.headingView}>
                <Text style={customStyles.boldText}>Filter</Text>
            </View>
            <View style={styles.filtersContainer}>
                <View style={styles.filterButtonsContainer}>
                    {dummyFilters.map((val, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.filterButton,
                                {
                                    backgroundColor: val.isVisible ? AppColor.white : AppColor.smokeWhite,
                                    borderLeftWidth: val.isVisible ? 5 : 0,
                                    borderColor: val.isVisible ? AppColor.blueViolet : null,
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
                                {vals.sub_filters.map((item, subIndex) => (
                                    <View key={subIndex} style={styles.subFilterRow}>
                                        <Checkbox.Android
                                            color={AppColor.blueViolet}
                                            status={item.isSubSelected ? 'checked' : 'unchecked'}
                                            onPress={() => handleSubFilterOption(vals.filterName, item.sub_filterName, subIndex)}
                                        />
                                        <Text style={styles.subFilterOption}>{item.sub_filterName}</Text>
                                    </View>
                                ))}
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
        fontSize: responsiveFontSize(1.5),
        fontFamily: Fonts.poppins.medium,
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
        backgroundColor: '#ececec',
    },
    subFiltersContainer: {
        padding: 10,
        width: '100%'
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
})
