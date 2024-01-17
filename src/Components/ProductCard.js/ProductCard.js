import React, { memo } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Avatar, Button, Card, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { height, responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { AppColor } from '../../utils/AppColor';
import { Fonts } from '../../utils/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import { customStyles } from '../../utils/Styles';

const ProductCard = React.memo(({ item, onPressWishlist, array }) => {
    console.log("🚀 ~ file: ProductCard.js:46 ~ ProductCard ~ item:", item);

    const navigation = useNavigation();

    const handlePressProductDetails = () => {
        navigation.navigate('ProductDetails', { item, array, product_id: item._id });
    };

    return (
        <Card style={styles.cardContainer}>
            <TouchableOpacity onPress={handlePressProductDetails}>

                <Card.Cover resizeMode='contain' source={{ uri: item.upload[0] }} />
                <TouchableOpacity
                    onPress={onPressWishlist}
                    style={styles.favoriteButton}
                >
                    {item.addWishlist === "false" ?
                        < Icon
                            name="heart-outline"
                            size={height / 50}
                            color={AppColor.GreyColor}
                        />
                        :
                        <Icon
                            name="heart"
                            size={height / 50}
                            color={'red'}
                        />}
                </TouchableOpacity>

                <Card.Content>
                    <Text style={[customStyles.heading, { fontFamily: Fonts.poppins.semiBold, fontSize: responsiveFontSize(2) }]}>{item.title}</Text>
                    <Text style={[customStyles.mediumText, { color: 'grey' }]}>{item.brand}</Text>
                    <Text style={[customStyles.mediumText, { color: '#000' }]}>₹{item.price}</Text>
                </Card.Content>
            </TouchableOpacity>

        </Card>
    );
});

const styles = {
    cardContainer: {
        width: width / 2 - 8,
        height: height / 3.2,
        margin: 4,
        backgroundColor: AppColor.white,
        position: 'relative',
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        height: 24,
        width: 24,
        borderRadius: 12
    },
};

export default memo(ProductCard);
