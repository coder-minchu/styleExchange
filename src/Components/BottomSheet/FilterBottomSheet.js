import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the search icon library
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { responsiveFontSize } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';

const FilterBottomSheet = ({ bottomSheetFilterRef, closeBottomSheetFilter, handleFilterOption, FilterSnapPoints }) => (
    <BottomSheet ref={bottomSheetFilterRef} snapPoints={FilterSnapPoints} index={0} backdropComponent={(props) => <BottomSheetBackdrop {...props} />}>
        <View style={styles.bottomSheetContainer}>
            <TouchableOpacity onPress={closeBottomSheetFilter}>
                <Icon name="close-outline" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.heading}>Filter</Text>
            <TouchableOpacity onPress={() => handleFilterOption('price_high')}>
                <Text style={styles.sortOption}>brand</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterOption('price_low')}>
                <Text style={styles.sortOption}>condition</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterOption('price_low')}>
                <Text style={styles.sortOption}>size</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterOption('price_low')}>
                <Text style={styles.sortOption}>price</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterOption('price_low')}>
                <Text style={styles.sortOption}>condition</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterOption('price_low')}>
                <Text style={styles.sortOption}>condition</Text>
            </TouchableOpacity>
        </View>
    </BottomSheet>
);

export default FilterBottomSheet;


const styles = {
    bottomSheetContainer: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
    },
    heading: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.poppins.semiBold,
        paddingLeft: 10,
    },
    sortOption: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.poppins.regular,
        padding: 15,
    },
};
