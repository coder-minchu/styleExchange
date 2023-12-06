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
import { height, responsiveFontSize, width } from '../utils/Dimensions/Dimension';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const StyleExchange = ({ navigation }) => {
    const [text, setText] = useState('');
    const [activeButton, setActiveButton] = useState('Women');
    const inputRef = useRef(null);

    const handleSearch = () => {
        console.log('Inside border clicked');
        searchBottomSheetOpen();
    };
    const searchBottomSheetOpen = () => {
        navigation.navigate('SearchScreen');
    };

    const Item = ({ title, description }) => (
        <View style={styles.itemContainer}>
            <View
                style={{
                    backgroundColor: AppColor.smokeWhite,
                    flex: 1,
                    margin: 1,
                    borderRadius: 10,
                    padding: 5,
                }}>
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

    const renderItem = ({ item, index }) => {
        console.log("🚀 ~ file: StyleExchange.js:58 ~ renderItem ~ item:", item)

        return (
            <Item title={item} description={item.description} />
        )
    };

    const renderCategoryButton = () => {
        return (
            <View style={styles.buttonRowContainer}>
                <LinearGradient
                    colors={activeButton === 'Women' ? AppColor.LinearGradient1 : ['#F5F5F5', '#F8F8FF']}
                    style={[styles.button]}
                >
                    <TouchableOpacity style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setActiveButton('Women')}>
                        <Text style={{ fontSize: responsiveFontSize(1.6), fontFamily: Fonts.lobster.regular, color: activeButton === 'Women' ? AppColor.white : AppColor.black }}>Women's</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                    colors={activeButton === 'Men' ? AppColor.LinearGradient1 : ['#F5F5F5', '#F8F8FF']}
                    style={[styles.button]}
                >
                    <TouchableOpacity style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setActiveButton('Men')}>
                        <Text style={{ fontSize: responsiveFontSize(1.6), fontFamily: Fonts.lobster.regular, color: activeButton === 'Men' ? AppColor.white : AppColor.black }}>Men's</Text>
                    </TouchableOpacity>
                </LinearGradient>

            </View>
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <FlatList
                    numColumns={2}
                    data={Array.from({ length: 10 }, (_, index) => index + 1)}
                    ListHeaderComponent={() => (
                        <View style={styles.searchContainer}>
                            <View style={styles.inputContainer}>
                                <TouchableOpacity onPress={handleSearch}>
                                    <Icon
                                        name="search"
                                        size={height / 50}
                                        color={AppColor.titleColor}
                                    />
                                </TouchableOpacity>
                                <TextInput
                                    ref={inputRef}
                                    placeholder="Search item or member"
                                    placeholderTextColor={AppColor.titleColor}
                                    value={text}
                                    onChangeText={setText}
                                    style={styles.input}
                                    onFocus={searchBottomSheetOpen}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                {renderCategoryButton()}
                            </View>
                        </View>
                    )}
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
    itemContentContainer: {
        backgroundColor: AppColor.smokeWhite,
        flex: 1,
        margin: 1,
        borderRadius: 10,
        padding: 5,
    },
    searchContainer: {
        height: height / 12,
        // backgroundColor: 'orange',
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    inputContainer: {
        width: width - 28,
        alignSelf: 'center',
        backgroundColor: AppColor.smokeWhite,
        height: '45%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderRadius: 20,
        alignItems: 'center',
        paddingLeft: 10,
        // marginTop: 5,
    },
    input: {
        width: '90%',
        marginLeft: 6,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1,
    },
    buttonContainer: {
        width: width - 28,
        // backgroundColor: 'red',
        // marginTop: 5,
        height: '42%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRowContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    button: {
        height: '85%',
        width: '49%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
        borderRadius: 20,
    },
    buttonTouchable: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: responsiveFontSize(1.6),
        fontFamily: Fonts.lobster.regular,
        color: AppColor.white,
    },
});
