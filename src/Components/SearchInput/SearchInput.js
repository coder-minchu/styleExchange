import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AppColor } from '../../utils/AppColor';
import { height, responsiveFontSize, width } from '../../utils/Dimensions/Dimension';

const SearchInput = ({ placeholder, onChangeText, value }) => {

    const navigation = useNavigation();
    const handleFocus = () => {
        navigation.navigate('SearchScreen', { textSearch: value });
    };

    useEffect(() => {
        return () => {
        }
    }, [])


    return (
        <View
            style={styles.searchInput}>
            <Icon
                name="search"
                size={height / 60}
                color={AppColor.grey}
                style={styles.searchIcon}
            />
            <TextInput
                style={{
                    fontSize: responsiveFontSize(1.4),
                    padding: 0,
                    width: '80%',
                    height: height / 20
                }}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                onFocus={handleFocus}
            />
        </View>

    )
}

export default SearchInput

const styles = StyleSheet.create({
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AppColor.smokeWhite,
        borderRadius: 20,
        flex: 0.95,
        paddingLeft: 10,
        height: height / 20,
        marginLeft: 5,
        backgroundColor: AppColor.smokeWhite
    },
    searchIcon: {
        marginRight: 10,
    },

})