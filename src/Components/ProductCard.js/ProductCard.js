// ProductCard.js

import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { height, responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { AppColor } from '../../utils/AppColor';
import { Fonts } from '../../utils/Fonts';

const ProductCard = React.memo(({ item, onPressWishlist, onPressProductDetails }) => {

    console.log('ProductCard');
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={onPressWishlist} style={styles.favoriteButton}>
                <Icon
                    name="heart"
                    size={height / 40}
                    color={AppColor.GreyColor}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={onPressProductDetails}>
                <Image
                    source={{
                        uri: item.upload[0]
                    }}
                    style={styles.image}
                />
                <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.discountPercentage}>
                        % Off
                    </Text>
                    <Text style={styles.discount}>₹</Text>
                    <Text style={styles.price}>₹</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
});

const styles = {
    cardContainer: {
        width: width / 2 - 8,
        height: height / 3.2,
        borderWidth: 1,
        borderColor: AppColor.borderColor,
        borderRadius: 5,
        margin: 1,
        padding: 2,
        backgroundColor: AppColor.white,
        alignItems: 'flex-end',
    },
    favoriteButton: {
        margin: 2,
        alignItems: 'center',
        backgroundColor: AppColor.white,
        justifyContent: 'center',
        alignItems: 'center',
        height: (height - width) / 12,
        width: (height - width) / 12,
        borderRadius: (height - width) / 6,
        borderWidth: 0.5,
        borderColor: AppColor.borderColor
    },
    card: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    image: {
        width: '90%',
        height: '70%',
        resizeMode: 'contain',
    },
    title: {
        fontSize: responsiveFontSize(1.5),
        fontFamily: Fonts.poppins.bold,
        color: AppColor.BlackColor,
    },
    priceContainer: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
    },
    discountPercentage: {
        color: AppColor.discountColor,
        fontFamily: Fonts.poppins.bold,
        fontSize: responsiveFontSize(1.4),
    },
    discount: {
        textDecorationLine: 'line-through',
        color: AppColor.BlackColor,
        fontFamily: Fonts.poppins.regular,
        fontSize: responsiveFontSize(1.4),
        paddingLeft: 10,
    },
    price: {
        fontSize: responsiveFontSize(1.4),
        color: AppColor.BlackColor,
        fontFamily: Fonts.poppins.semiBold,
        paddingLeft: 10,
    },
};

export default memo(ProductCard);
