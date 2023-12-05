import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState, useRef, useMemo } from 'react';
import { Fonts } from '../utils/Fonts';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the search icon library
import { AppColor } from '../utils/AppColor';
import { height, width } from '../utils/Dimensions/Dimension';
import { FlatList } from 'react-native-gesture-handler';

const StyleExchange = ({ navigation }) => {
    const [text, setText] = useState('');
    const inputRef = useRef(null);

    const handleSearch = () => {
        console.log('Inside border clicked');
        searchBottomSheetOpen();
    };
    const searchBottomSheetOpen = () => {
        navigation.navigate('SearchScreen')
    };

    const Item = ({ title, description }) => (
        <View style={styles.itemContainer}>
            <View style={{ backgroundColor: AppColor.smokeWhite, flex: 1, margin: 1, borderRadius: 10, padding: 5 }}>
                <Text style={styles.title}>{title}</Text>
                <Text>{description}</Text>
                <Text>{description}</Text>
                <Text>{description}</Text>
                <Text>{description}</Text>
                <Text>{description}</Text>
                <Text>{description}</Text>
                <Text>{description}</Text>
                <Text>{description}</Text>
                <Text>{description}</Text>
                <Text>{description}</Text>
                <Text>{description}</Text>
                <Text>{description}</Text>
            </View>
        </View>
    );

    const renderItem = ({ item, index }) => (
        <Item title={item} description={item.description} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}
            >
                <FlatList
                    numColumns={2}
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    ListHeaderComponent={() => {
                        return (
                            <View style={styles.searchContainer}>
                                <View style={styles.inputContainer}>
                                    <TouchableOpacity onPress={handleSearch}>
                                        <Icon name="search" size={height / 50} color={AppColor.titleColor} />
                                    </TouchableOpacity>
                                    <TextInput
                                        ref={inputRef}
                                        placeholder="Search item or member"
                                        placeholderTextColor={AppColor.titleColor}
                                        value={text}
                                        onChangeText={text => setText(text)}
                                        style={styles.input}
                                        onFocus={searchBottomSheetOpen}
                                    />
                                </View>
                            </View>
                        )
                    }}
                    // ListFooterComponent={() => {
                    //     return (
                    //         <View style={{ backgroundColor: 'red' }}>
                    //             <Text>yash</Text>
                    //         </View>
                    //     )
                    // }}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
};

export default StyleExchange;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColor.white,
    },
    searchContainer: {
        height: height / 20,
        // backgroundColor: 'orange',
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: width - 28,
        alignSelf: 'center',
        backgroundColor: AppColor.smokeWhite,
        height: '80%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderRadius: 20,
        alignItems: 'center',
        paddingLeft: 10
    }, input: {
        width: '90%',
        marginLeft: 6
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1,
    },
});
