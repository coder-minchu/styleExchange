import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveFontSize } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';
import { customStyles } from '../../utils/Styles';
import { Checkbox } from 'react-native-paper';
import { AppColor } from '../../utils/AppColor';

const SortedBottomSheet = ({ handleSortOption }) => {
    const [selectedSort, setSelectedSort] = useState(null);

    const handleSortClick = (sortOption) => {
        setSelectedSort(sortOption);
        handleSortOption(sortOption);
    };

    return (
        <View style={styles.bottomSheetContainer}>
            <View style={customStyles.headingView}>
                <Text style={customStyles.boldText}>Sort</Text>
            </View>
            <TouchableOpacity onPress={() => handleSortClick('price_high')}>
                <View style={styles.sortOptionContainer}>
                    <Checkbox.Android
                        status={selectedSort === 'price_high' ? 'checked' : 'unchecked'}
                        onPress={() => handleSortClick('price_high')}
                        color={AppColor.blueViolet}// Customize the color as needed
                    />
                    <Text style={styles.sortOption}>High to Low</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSortClick('price_low')}>
                <View style={styles.sortOptionContainer}>
                    <Checkbox.Android
                        status={selectedSort === 'price_low' ? 'checked' : 'unchecked'}
                        onPress={() => handleSortClick('price_low')}
                        color={AppColor.blueViolet}// Customize the color as needed
                    />
                    <Text style={styles.sortOption}>Low to High</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomSheetContainer: {
        backgroundColor: 'white',
        flex: 1,
    },
    sortOptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortOption: {
        fontSize: responsiveFontSize(1.5),
        fontFamily: Fonts.poppins.regular,
        padding: 10,
    },
});

export default SortedBottomSheet;
