import {
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Fonts } from '../utils/Fonts';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the search icon library
import { AppColor } from '../utils/AppColor';
import { height, responsiveFontSize, width } from '../utils/Dimensions/Dimension';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '../Components/Slider';
import { customStyles } from '../utils/Styles';

const dummyData = [
    {
        category: "Women's",
        category_description: "Women's Fashion",
        sub_categories: [
            {
                name: "Kurta Sets",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/7824150f-e7e5-423d-a8a0-13a6532118401701602275748-W--KURTA-SETS.jpg",
            },
            {
                name: "Dresses",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe5c2d1e-716c-4cec-a6bf-934b5e6bcc191701602275798-W--DRESSES.jpg",
            },
            {
                name: "Sarees",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/005d8a86-0fb0-422a-9d1e-08a4cb885afb1701602275724-W--SAREES.jpg",
            },
            {
                name: "Tops & Tees",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/09761455-ea73-4edc-bf32-e95ee52597061701602275706-W--TOPS---TEES.jpg",
            },
            {
                name: "Kurta Sets",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/7824150f-e7e5-423d-a8a0-13a6532118401701602275748-W--KURTA-SETS.jpg",
            },
            {
                name: "Dresses",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe5c2d1e-716c-4cec-a6bf-934b5e6bcc191701602275798-W--DRESSES.jpg",
            },
            {
                name: "Sarees",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/005d8a86-0fb0-422a-9d1e-08a4cb885afb1701602275724-W--SAREES.jpg",
            },
            {
                name: "Tops & Tees",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/09761455-ea73-4edc-bf32-e95ee52597061701602275706-W--TOPS---TEES.jpg",
            },
            {
                name: "Kurta Sets",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/7824150f-e7e5-423d-a8a0-13a6532118401701602275748-W--KURTA-SETS.jpg",
            },
            {
                name: "Dresses",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe5c2d1e-716c-4cec-a6bf-934b5e6bcc191701602275798-W--DRESSES.jpg",
            },
            {
                name: "Sarees",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/005d8a86-0fb0-422a-9d1e-08a4cb885afb1701602275724-W--SAREES.jpg",
            },
            {
                name: "Tops & Tees",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/09761455-ea73-4edc-bf32-e95ee52597061701602275706-W--TOPS---TEES.jpg",
            },
            {
                name: "Kurta Sets",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/7824150f-e7e5-423d-a8a0-13a6532118401701602275748-W--KURTA-SETS.jpg",
            },
            {
                name: "Dresses",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe5c2d1e-716c-4cec-a6bf-934b5e6bcc191701602275798-W--DRESSES.jpg",
            },
            {
                name: "Sarees",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/005d8a86-0fb0-422a-9d1e-08a4cb885afb1701602275724-W--SAREES.jpg",
            },
            {
                name: "Tops & Tees",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/09761455-ea73-4edc-bf32-e95ee52597061701602275706-W--TOPS---TEES.jpg",
            }
        ],
        Saree: [
            {
                name: 'Harbor Georgette Saree',
                uploadedBy: 'John Doe',
                contactNumber: '123-456-7890',
                location: 'Indore, India',
                image:
                    'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/20582038/2022/11/2/1c6954c5-9d6a-4eb1-802b-04a22277e51a1667372754043HarborGreyGeorgetteSaree1.jpg',
            },
            {
                name: 'Zari Kanjeevaram Saree',
                uploadedBy: 'John Doe',
                contactNumber: '123-456-7890',
                location: 'Indore, India',
                image:
                    'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/21563994/2023/3/8/df01a8d8-fec5-40f3-a11f-4ea3afba5d2c1678272617151-KARAGIRI-Ethnic-Motifs-Zari-Kanjeevaram-Saree-23916782726168-1.jpg',
            },
            {
                // name: 'KARAGIRI Green Gold-Toned Ethnic Motifs Zari Silk Blend Kanjeevaram Saree',
                name: 'Green Kanjeevaram Saree',
                uploadedBy: 'John Doe',
                contactNumber: '123-456-7890',
                location: 'Indore, India',
                image:
                    'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/22404340/2023/3/17/6d421461-6955-4a58-a0b4-f88245fb09651679059349160KARAGIRIGreenGold-TonedEthnicMotifsZariSilkBlendKanjeevaramS1.jpg',
            },
            {
                name: 'Silk Blend Saree',
                uploadedBy: 'John Doe',
                contactNumber: '123-456-7890',
                location: 'Indore, India',
                image:
                    'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/16514094/2022/7/22/0d44eb69-749e-4c8c-bd47-7b5b942fb2e61658463492377KARAGIRIRedGold-TonedPaisleyZariSilkBlendKanjeevaramSaree1.jpg',
            },
        ],
        daily_wear_products: [],
    },
    {
        category: "Men's",
        category_description: "Men's Fashion",
        sub_categories: [
            {
                name: "Jeans",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe7d1c96-512a-4b28-972a-b797486bc7301701601965564-M--JEANS.jpg",
            },
            {
                name: "Sweatshirt",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/ef6f833c-37bf-40ff-9b23-956c211671ab1701601965514-M--SWEATSHIRT.jpg",
            },
            {
                name: "Shirts",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/70acc32d-b72f-4727-88e3-e835c67ff5e01701601965541-M--SHIRTS.jpg",
            },
            {
                name: "T-shirt",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/f415d418-10f2-4b96-8ea8-2b6c22a8781a1701601965496-M--TSHIRT.jpg",
            },
            {
                name: "Jeans",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe7d1c96-512a-4b28-972a-b797486bc7301701601965564-M--JEANS.jpg",
            },
            {
                name: "Sweatshirt",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/ef6f833c-37bf-40ff-9b23-956c211671ab1701601965514-M--SWEATSHIRT.jpg",
            },
            {
                name: "Shirts",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/70acc32d-b72f-4727-88e3-e835c67ff5e01701601965541-M--SHIRTS.jpg",
            },
            {
                name: "T-shirt",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/f415d418-10f2-4b96-8ea8-2b6c22a8781a1701601965496-M--TSHIRT.jpg",
            },
            {
                name: "Jeans",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe7d1c96-512a-4b28-972a-b797486bc7301701601965564-M--JEANS.jpg",
            },
            {
                name: "Sweatshirt",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/ef6f833c-37bf-40ff-9b23-956c211671ab1701601965514-M--SWEATSHIRT.jpg",
            },
            {
                name: "Shirts",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/70acc32d-b72f-4727-88e3-e835c67ff5e01701601965541-M--SHIRTS.jpg",
            },
            {
                name: "T-shirt",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/f415d418-10f2-4b96-8ea8-2b6c22a8781a1701601965496-M--TSHIRT.jpg",
            },
            {
                name: "Jeans",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe7d1c96-512a-4b28-972a-b797486bc7301701601965564-M--JEANS.jpg",
            },
            {
                name: "Sweatshirt",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/ef6f833c-37bf-40ff-9b23-956c211671ab1701601965514-M--SWEATSHIRT.jpg",
            },
            {
                name: "Shirts",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/70acc32d-b72f-4727-88e3-e835c67ff5e01701601965541-M--SHIRTS.jpg",
            },
            {
                name: "T-shirt",
                imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/f415d418-10f2-4b96-8ea8-2b6c22a8781a1701601965496-M--TSHIRT.jpg",
            },
        ],
        Shirts: [
            {
                name: 'Casual Jeans',
                uploadedBy: 'John Doe',
                contactNumber: '123-456-7890',
                location: 'Indore, India',
                image: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/20421124/2022/10/17/2dd1cc94-8bed-4f0f-8c95-a785a9910a3c1665981279300HERENOWMenMulticolouredSlimFitPrintedCasualShirt1.jpg',
            },
            {
                name: 'Formal Shirts',
                uploadedBy: 'John Doe',
                contactNumber: '123-456-7890',
                location: 'Indore, India',
                image: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/21281958/2022/12/22/dd0b1338-7711-4d5c-958a-21662250a8ab1671723030313Shirts1.jpg',
            },
            {
                name: 'Sporty T-shirts',
                uploadedBy: 'John Doe',
                contactNumber: '123-456-7890',
                location: 'Indore, India',
                image: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2127876/2017/11/23/11511431472633-Roadster-Men-Black-Regular-Fit-Solid-Casual-Shirt-8801511431472500-1.jpg',
            },
            {
                name: 'Classical Shirts',
                uploadedBy: 'John Doe',
                contactNumber: '123-456-7890',
                location: 'Indore, India',
                image:
                    'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/10673544/2019/9/24/6b9c7688-7ca2-4d11-9e5b-a3745ecd8f761569310358973-The-Indian-Garage-Co-Men-Shirts-8481569310357131-1.jpg',
            },
        ],
        daily_wear_products: [],
    },
];


const StyleExchange = ({ navigation }) => {
    const [text, setText] = useState('');
    const [activeButton, setActiveButton] = useState('Women');
    const [mainData, setMainData] = useState([]);
    const inputRef = useRef(null);


    useEffect(() => {
        if (activeButton === 'Women') {
            let data = [];
            data.push(dummyData[0])
            setMainData(data)
        } else if (activeButton === 'Men') {
            let data = [];
            data.push(dummyData[1])
            setMainData(data)
        }
    }, [activeButton])

    const handleSearch = () => {
        console.log('Inside border clicked');
        searchBottomSheetOpen();
    };
    const searchBottomSheetOpen = () => {
        navigation.navigate('SearchScreen');
    };

    const renderCategoryButton = () => (
        <View style={styles.buttonRowContainer}>
            {renderButton('Women', 'Women\'s')}
            {renderButton('Men', 'Men\'s')}
        </View>
    );

    const renderButton = (buttonType, label) => (
        <LinearGradient
            colors={activeButton === buttonType ? AppColor.LinearGradient1 : ['#F5F5F5', '#F8F8FF']}
            style={styles.button}
        >
            <TouchableOpacity
                style={styles.buttonTouchable}
                onPress={() => setActiveButton(buttonType)}
            >
                <Text style={[styles.buttonText, {
                    color: activeButton === buttonType ? AppColor.white : AppColor.black,
                }]}>{label}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );

    const renderSubCategoryItem = ({ item }) => {
        const hexagonSize = '100%'; // Customize the size of the hexagon as needed

        return (
            <View style={styles.subCategoryContainer}>
                <View style={styles.hexagon}>
                    <ImageBackground
                        resizeMode='contain'
                        source={{ uri: item.imageUrl }}
                        style={{ width: hexagonSize, height: hexagonSize, }}
                    >
                        {/* You can add additional content inside the hexagon if needed */}
                    </ImageBackground>
                </View>
                {/* <View style={styles.additionalCategories}>
                    <Text style={{ fontFamily: Fonts.lobster.regular }}>{item}</Text> */}
                {/* Add additional categories or content below the hexagon */}
                {/* </View> */}
            </View>
        );
    };

    const ProductCard = ({ product }) => {
        const { name, uploadedBy, contactNumber, location, image } = product;
        return (
            <View style={styles.cardContainer}>
                <Image source={{ uri: image }} style={styles.productImage} />
                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.productDetails}>
                    Uploaded by: {uploadedBy} {'\n'}
                    Contact number: {contactNumber} {'\n'}
                    Location: {location}
                </Text>
            </View>
        );
    };


    const renderItem = ({ item }) => {
        return (
            <View>
                <View style={styles.subCategoryFlatlist}>
                    <FlatList
                        horizontal
                        data={item.sub_categories.slice(0, 8)} // Display the first 8 subcategories in the first line
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderSubCategoryItem}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={styles.subCategoryFlatlist}>
                    <FlatList
                        horizontal
                        data={item.sub_categories.slice(8)} // Display the remaining subcategories in the second line
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderSubCategoryItem}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={{ height: height / 6.5, width: width }}>
                    <Slider data={[1, 2, 3, 4, 5, 611]} />
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={[customStyles.heading, {
                        marginLeft: 10,
                    }]}>{item.Saree ? 'Sarees' : 'Shirts'}</Text>
                    <FlatList
                        data={item.Saree || item.Shirts}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <ProductCard product={item} />}
                    />
                </View>
            </View>
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <FlatList
                    numColumns={2}
                    data={mainData}
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
    subCategoryContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 5,
        backgroundColor: AppColor.smokeWhite
    },
    hexagon: {
        aspectRatio: 1,
        overflow: 'hidden',
        width: 100,
        height: 100,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    additionalCategories: {
        alignItems: 'center',
    },
    subCategoryItem: {
        // Customize hexagon styles as needed
    },
    subCategoryText: {
        fontSize: responsiveFontSize(1.6),
        fontFamily: Fonts.lobster.regular,
        color: AppColor.black,
    },
    categoryContainer: {
        margin: 10,
        backgroundColor: AppColor.white,
        borderRadius: 10,
        padding: 10,
    },
    subCategoryFlatlist: {
        // backgroundColor: 'red',
        width: width,
        height: 'auto'
    },
    cardContainer: {
        // borderWidth: 1,
        // borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        margin: 5,
        backgroundColor: AppColor.smokeWhite
    },
    productImage: {
        // width: width / 2,
        height: width / 2,
        resizeMode: 'contain',
        borderRadius: 8,
    },
    productName: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.lobster.regular,
        marginTop: 10,
        color: AppColor.black
    },
    productDetails: {
        fontSize: responsiveFontSize(1),
        marginTop: 5,
        fontFamily: Fonts.poppins.medium,
        color: AppColor.titleColor
    },
});
