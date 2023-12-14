import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the search icon library
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { responsiveFontSize } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';

const SortBottomSheet = ({ closeBottomSheet, handleSortOption, bottomSheetRef, sortSnapPoints }) => (
    <BottomSheet ref={bottomSheetRef} snapPoints={sortSnapPoints} index={0} backdropComponent={(props) => <BottomSheetBackdrop {...props} />}>
        <View style={styles.bottomSheetContainer}>
            <TouchableOpacity onPress={closeBottomSheet}>
                <Icon name="close-outline" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.heading}>Sort</Text>
            <TouchableOpacity onPress={() => handleSortOption('price_high')}>
                <Text style={styles.sortOption}>High to Low</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSortOption('price_low')}>
                <Text style={styles.sortOption}>Low to High</Text>
            </TouchableOpacity>
        </View>
    </BottomSheet>
);

export default SortBottomSheet;

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
