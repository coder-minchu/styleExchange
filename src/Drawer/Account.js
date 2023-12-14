

// import React from 'react';
// import { Platform, StyleSheet, Text, View } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Account, Chats, Home, MyAds, Sell } from '../Screens';
// import CustumTabButton from '../Components/Home/CustumTabButton';
// import { height, responsiveFontSize } from '../utils/Dimensions/Dimension';
// import { Fonts } from '../utils/Fonts';
// import { AppColor } from '../utils/AppColor';
// import LinearGradient from 'react-native-linear-gradient';

// const Tab = createBottomTabNavigator();

// const styles = StyleSheet.create({
//   tabContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     top: Platform.OS === 'ios' ? 10 : 5,
//   },
//   linearGradient: {
//     width: Platform.OS === 'ios' ? 30 : 40,
//     height: Platform.OS === 'ios' ? 30 : 40,
//     borderRadius: Platform.OS === 'ios' ? 15 : 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//     backgroundColor: 'white',
//   },
//   iconText: {
//     fontSize: responsiveFontSize(1.2),
//     fontFamily: Fonts.lobster.regular,
//     paddingTop: Platform.OS === 'ios' ? 1 : 10,
//   },
// });

// const TabItem = ({ name, component, iconName, customButton }) => ({
//   name,
//   component,
//   options: {
//     header: () => null,
//     title: '',
//     tabBarIcon: ({ focused }) => (
//       <View style={styles.tabContainer}>
//         {customButton ? customButton() :
//           <LinearGradient
//             colors={focused ? AppColor.LinearGradient1 : ['transparent', 'transparent']}
//             style={styles.linearGradient}>
//             <Icon
//               name={iconName}
//               size={height / 50}
//               color={focused ? 'white' : 'grey'}
//               style={{ zIndex: 999 }}
//             />
//           </LinearGradient>
//         }
//         <Text style={{ color: focused ? AppColor.blueViolet : 'grey', ...styles.iconText }}>
//           {name}
//         </Text>
//       </View>
//     ),
//   },
// });
// <Tab.Screen
//   name="Sell"
//   component={Sell}
//   options={{
//     header: () => null,
//     title: '',
//     tabBarIcon: ({ focused }) => (
//       <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 5 }}>
//         <CustumTabButton />
//         <Text style={{ color: focused ? AppColor.blueViolet : 'grey', ...styles.iconText }}>
//           Sell
//         </Text>
//       </View>
//     ),
//   }}
// />
// const Tabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: { height: 80 },
//       }}
//     >
//       {[
//         TabItem({ name: 'Home', component: Home, iconName: 'home' }),
//         TabItem({ name: 'Chats', component: Chats, iconName: 'chatbubble-outline' }),
//         TabItem({
//           name: 'Sell',
//           component: Sell,
//           // iconName: 'CustumTabButton',
//           customButton: () => (
//             <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 5 }}>
//               <CustumTabButton />
//             </View>
//           ),
//         }),
//         TabItem({ name: 'MyAds', component: MyAds, iconName: 'heart-outline' }),
//         TabItem({ name: 'Account', component: Account, iconName: 'person-outline', isMaterial: true }),
//       ].map((tab) => (
//         <Tab.Screen key={tab.name} {...tab} />
//       ))}
//     </Tab.Navigator>
//   );
// };

// export default Tabs;
// import {
//   FlatList,
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { AppColor } from '../../utils/AppColor';
// import { height, responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
// import { Fonts } from '../../utils/Fonts';

// const Categories = ({ navigation }) => {

//   const [categoriesData, setCategoriesData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const categoryListRef = useRef(null);

//   const handleCategoryPress = useCallback(async (categoryId, index) => {
//     setSelectedCategory(categoryId);

//     // Scroll to the selected category in the main category list horizontally
//     if (categoryListRef.current) {
//       categoryListRef.current.scrollToIndex({ index, animated: true });
//     }
//   }, []);

//   const CategoryItem = ({ item, index }) => {
//     return (
//       <TouchableOpacity
//         onPress={() => handleCategoryPress(item.id, index)}
//         style={[
//           styles.flatlistContainer,
//           { backgroundColor: item.id === selectedCategory ? '#E2D1C3' : null },
//         ]}>
//         <Image style={styles.imageStyle} source={{ uri: 'https://gkdukaan.com/wp-content/uploads/2023/10/61utX8kBDlL._UY695_.jpg' }} />
//         <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
//           <Text style={styles.textStyle}>yash</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const navigateToProductList = useCallback((id) => {
//     navigation.navigate('ProductList', {
//       categoryId: id,
//     });
//   }, [navigation]);

//   const renderSubcategoryItem = ({ item }) => {
//     return (
//       <TouchableOpacity onPress={() => navigateToProductList(item.id)} style={styles.subcategoryContainer}>
//         <View style={styles.subcategoryImageContainer}>
//           <Image
//             style={styles.subcategoryImage}
//             source={{
//               uri: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1694673510/Croma%20Assets/Communication/Mobiles/Images/300679_0_bsmo8n.png?tr=w-400',
//             }}
//           />
//         </View>
//         <Text numberOfLines={1} style={styles.subcategoryText}>
//           yash
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.flatlist1}>
//         <FlatList
//           ref={categoryListRef} // Assign the ref to the FlatList
//           data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
//           keyExtractor={(_, index) => index.toString()}
//           renderItem={({ item, index }) => <CategoryItem item={item} index={index} />}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//       <View style={styles.flatlist2}>
//         <FlatList
//           data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
//           keyExtractor={(_, index) => index.toString()}
//           renderItem={renderSubcategoryItem}
//           numColumns={3}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Categories;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     // justifyContent:'center',
//     // alignItems:'center'
//   },
//   flatlist1: {
//     height: '100%',
//     width: width / 4,
//     // backgroundColor: '#E2D1C3',
//     backgroundColor: '#fff',
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   flatlist2: {
//     height: height,
//     width: width / 1.34,
//     // backgroundColor: '#F5EEF8'
//   },
//   flatlistContainer: {
//     height: height / 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'grey',
//     borderBottomWidth: 0.3,
//     borderColor: 'lightgrey',
//     width: '98%',
//     alignSelf: 'center',
//     padding: 5
//   },
//   textStyle: {
//     fontFamily: Fonts.poppins.medium,
//     fontSize: responsiveFontSize(1.2),
//     color: AppColor.blueViolet

//   },
//   imageStyle: {
//     resizeMode: 'contain',
//     height: 55,
//     width: 55,
//   },
//   subcategoryContainer: {
//     justifyContent: 'center',
//     margin: 5,
//     width: '30%',
//     alignItems: 'center',
//     height: height / 7,
//   },

//   subcategoryImageContainer: {
//     height: width / 6,
//     width: width / 6,
//     borderRadius: 50,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },

//   subcategoryImage: {
//     resizeMode: 'contain',
//     height: 40,
//     width: 40,
//   },

//   subcategoryText: {
//     fontFamily: Fonts.poppins.medium,
//     fontSize: responsiveFontSize(1.35),
//     textAlign: 'center',
//     paddingTop: 5,
//   },
//   subcategoryRowContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   subcategoryImageSkeleton: {
//     height: 70,
//     width: 70,
//     backgroundColor: 'lightgray',
//   },

//   subcategoryTextSkeleton: {
//     width: '60%',
//     height: '10%',
//     marginTop: 5,
//     backgroundColor: 'lightgray',
//   }

// });


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Account = () => {
    return (
        <View>
            <Text>Account</Text>
        </View>
    )
}

export default Account

const styles = StyleSheet.create({})

// import {
//     ActivityIndicator,
//     Image,
//     ImageBackground,
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
// import { Fonts } from '../utils/Fonts';
// import Icon from 'react-native-vector-icons/Ionicons'; // Import the search icon library
// import { AppColor } from '../utils/AppColor';
// import { height, responsiveFontSize, width } from '../utils/Dimensions/Dimension';
// import { FlatList, RefreshControl, TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import LinearGradient from 'react-native-linear-gradient';
// import Slider from '../Components/Slider';
// import { customStyles } from '../utils/Styles';
// import { useDispatch, useSelector } from 'react-redux';
// import { ProductListAction } from '../Redux/Action/GetAllProductListAction';
// import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
// import { Checkbox } from 'react-native-paper';

// const dummyData = [
//     {
//         category: "Women's",
//         category_description: "Women's Fashion",
//         sub_categories: [
//             {
//                 name: "Kurta Sets",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/7824150f-e7e5-423d-a8a0-13a6532118401701602275748-W--KURTA-SETS.jpg",
//             },
//             {
//                 name: "Dresses",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe5c2d1e-716c-4cec-a6bf-934b5e6bcc191701602275798-W--DRESSES.jpg",
//             },
//             {
//                 name: "Sarees",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/005d8a86-0fb0-422a-9d1e-08a4cb885afb1701602275724-W--SAREES.jpg",
//             },
//             {
//                 name: "Tops & Tees",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/09761455-ea73-4edc-bf32-e95ee52597061701602275706-W--TOPS---TEES.jpg",
//             },
//             {
//                 name: "Kurta Sets",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/7824150f-e7e5-423d-a8a0-13a6532118401701602275748-W--KURTA-SETS.jpg",
//             },
//             {
//                 name: "Dresses",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe5c2d1e-716c-4cec-a6bf-934b5e6bcc191701602275798-W--DRESSES.jpg",
//             },
//             {
//                 name: "Sarees",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/005d8a86-0fb0-422a-9d1e-08a4cb885afb1701602275724-W--SAREES.jpg",
//             },
//             {
//                 name: "Tops & Tees",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/09761455-ea73-4edc-bf32-e95ee52597061701602275706-W--TOPS---TEES.jpg",
//             },
//             {
//                 name: "Kurta Sets",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/7824150f-e7e5-423d-a8a0-13a6532118401701602275748-W--KURTA-SETS.jpg",
//             },
//             {
//                 name: "Dresses",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe5c2d1e-716c-4cec-a6bf-934b5e6bcc191701602275798-W--DRESSES.jpg",
//             },
//             {
//                 name: "Sarees",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/005d8a86-0fb0-422a-9d1e-08a4cb885afb1701602275724-W--SAREES.jpg",
//             },
//             {
//                 name: "Tops & Tees",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/09761455-ea73-4edc-bf32-e95ee52597061701602275706-W--TOPS---TEES.jpg",
//             },
//             {
//                 name: "Kurta Sets",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/7824150f-e7e5-423d-a8a0-13a6532118401701602275748-W--KURTA-SETS.jpg",
//             },
//             {
//                 name: "Dresses",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe5c2d1e-716c-4cec-a6bf-934b5e6bcc191701602275798-W--DRESSES.jpg",
//             },
//             {
//                 name: "Sarees",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/005d8a86-0fb0-422a-9d1e-08a4cb885afb1701602275724-W--SAREES.jpg",
//             },
//             {
//                 name: "Tops & Tees",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/09761455-ea73-4edc-bf32-e95ee52597061701602275706-W--TOPS---TEES.jpg",
//             }
//         ],
//         Saree: [
//             {
//                 name: 'Harbor Georgette Saree',
//                 uploadedBy: 'John Doe',
//                 contactNumber: '123-456-7890',
//                 location: 'Indore, India',
//                 image:
//                     'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/20582038/2022/11/2/1c6954c5-9d6a-4eb1-802b-04a22277e51a1667372754043HarborGreyGeorgetteSaree1.jpg',
//             },
//             {
//                 name: 'Zari Kanjeevaram Saree',
//                 uploadedBy: 'John Doe',
//                 contactNumber: '123-456-7890',
//                 location: 'Indore, India',
//                 image:
//                     'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/21563994/2023/3/8/df01a8d8-fec5-40f3-a11f-4ea3afba5d2c1678272617151-KARAGIRI-Ethnic-Motifs-Zari-Kanjeevaram-Saree-23916782726168-1.jpg',
//             },
//             {
//                 // name: 'KARAGIRI Green Gold-Toned Ethnic Motifs Zari Silk Blend Kanjeevaram Saree',
//                 name: 'Green Kanjeevaram Saree',
//                 uploadedBy: 'John Doe',
//                 contactNumber: '123-456-7890',
//                 location: 'Indore, India',
//                 image:
//                     'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/22404340/2023/3/17/6d421461-6955-4a58-a0b4-f88245fb09651679059349160KARAGIRIGreenGold-TonedEthnicMotifsZariSilkBlendKanjeevaramS1.jpg',
//             },
//             {
//                 name: 'Silk Blend Saree',
//                 uploadedBy: 'John Doe',
//                 contactNumber: '123-456-7890',
//                 location: 'Indore, India',
//                 image:
//                     'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/16514094/2022/7/22/0d44eb69-749e-4c8c-bd47-7b5b942fb2e61658463492377KARAGIRIRedGold-TonedPaisleyZariSilkBlendKanjeevaramSaree1.jpg',
//             },
//         ],
//         daily_wear_products: [],
//     },
//     {
//         category: "Men's",
//         category_description: "Men's Fashion",
//         sub_categories: [
//             {
//                 name: "Jeans",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe7d1c96-512a-4b28-972a-b797486bc7301701601965564-M--JEANS.jpg",
//             },
//             {
//                 name: "Sweatshirt",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/ef6f833c-37bf-40ff-9b23-956c211671ab1701601965514-M--SWEATSHIRT.jpg",
//             },
//             {
//                 name: "Shirts",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/70acc32d-b72f-4727-88e3-e835c67ff5e01701601965541-M--SHIRTS.jpg",
//             },
//             {
//                 name: "T-shirt",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/f415d418-10f2-4b96-8ea8-2b6c22a8781a1701601965496-M--TSHIRT.jpg",
//             },
//             {
//                 name: "Jeans",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe7d1c96-512a-4b28-972a-b797486bc7301701601965564-M--JEANS.jpg",
//             },
//             {
//                 name: "Sweatshirt",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/ef6f833c-37bf-40ff-9b23-956c211671ab1701601965514-M--SWEATSHIRT.jpg",
//             },
//             {
//                 name: "Shirts",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/70acc32d-b72f-4727-88e3-e835c67ff5e01701601965541-M--SHIRTS.jpg",
//             },
//             {
//                 name: "T-shirt",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/f415d418-10f2-4b96-8ea8-2b6c22a8781a1701601965496-M--TSHIRT.jpg",
//             },
//             {
//                 name: "Jeans",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe7d1c96-512a-4b28-972a-b797486bc7301701601965564-M--JEANS.jpg",
//             },
//             {
//                 name: "Sweatshirt",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/ef6f833c-37bf-40ff-9b23-956c211671ab1701601965514-M--SWEATSHIRT.jpg",
//             },
//             {
//                 name: "Shirts",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/70acc32d-b72f-4727-88e3-e835c67ff5e01701601965541-M--SHIRTS.jpg",
//             },
//             {
//                 name: "T-shirt",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/f415d418-10f2-4b96-8ea8-2b6c22a8781a1701601965496-M--TSHIRT.jpg",
//             },
//             {
//                 name: "Jeans",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe7d1c96-512a-4b28-972a-b797486bc7301701601965564-M--JEANS.jpg",
//             },
//             {
//                 name: "Sweatshirt",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/ef6f833c-37bf-40ff-9b23-956c211671ab1701601965514-M--SWEATSHIRT.jpg",
//             },
//             {
//                 name: "Shirts",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/70acc32d-b72f-4727-88e3-e835c67ff5e01701601965541-M--SHIRTS.jpg",
//             },
//             {
//                 name: "T-shirt",
//                 imageUrl: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/f415d418-10f2-4b96-8ea8-2b6c22a8781a1701601965496-M--TSHIRT.jpg",
//             },
//         ],
//         Shirts: [
//             {
//                 name: 'Casual Jeans',
//                 uploadedBy: 'John Doe',
//                 contactNumber: '123-456-7890',
//                 location: 'Indore, India',
//                 image: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/20421124/2022/10/17/2dd1cc94-8bed-4f0f-8c95-a785a9910a3c1665981279300HERENOWMenMulticolouredSlimFitPrintedCasualShirt1.jpg',
//             },
//             {
//                 name: 'Formal Shirts',
//                 uploadedBy: 'John Doe',
//                 contactNumber: '123-456-7890',
//                 location: 'Indore, India',
//                 image: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/21281958/2022/12/22/dd0b1338-7711-4d5c-958a-21662250a8ab1671723030313Shirts1.jpg',
//             },
//             {
//                 name: 'Sporty T-shirts',
//                 uploadedBy: 'John Doe',
//                 contactNumber: '123-456-7890',
//                 location: 'Indore, India',
//                 image: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2127876/2017/11/23/11511431472633-Roadster-Men-Black-Regular-Fit-Solid-Casual-Shirt-8801511431472500-1.jpg',
//             },
//             {
//                 name: 'Classical Shirts',
//                 uploadedBy: 'John Doe',
//                 contactNumber: '123-456-7890',
//                 location: 'Indore, India',
//                 image:
//                     'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/10673544/2019/9/24/6b9c7688-7ca2-4d11-9e5b-a3745ecd8f761569310358973-The-Indian-Garage-Co-Men-Shirts-8481569310357131-1.jpg',
//             },
//         ],
//         daily_wear_products: [],
//     },
// ];

// const numColumns = 2;

// const filterDummyData = [
//     {
//         filterName: 'Availability',
//         sub_filters: [
//             {
//                 sub_filterName: 'Available',
//                 isSubSelected: false
//             },
//             {
//                 sub_filterName: 'Sold',
//                 isSubSelected: false

//             },
//         ],
//         isSelected: false
//     },
//     {
//         filterName: 'Condition',
//         sub_filters: [
//             {
//                 sub_filterName: 'New with Tag',
//                 isSubSelected: false

//             },
//             {
//                 sub_filterName: 'Like New',
//                 isSubSelected: false

//             },
//             {
//                 sub_filterName: 'Good',
//                 isSubSelected: false

//             },
//             {
//                 sub_filterName: 'Used',
//                 isSubSelected: false

//             },
//             {
//                 sub_filterName: 'Virtual',
//                 isSubSelected: false

//             },
//         ],
//         isSelected: false
//     },
//     {
//         filterName: 'Seller Rating',
//         sub_filters: [
//             {
//                 sub_filterName: '4.0 and above',
//                 isSubSelected: false
//             },
//             {
//                 sub_filterName: '4.5 and above',
//                 isSubSelected: false

//             },
//             {
//                 sub_filterName: '4.7 and above',
//                 isSubSelected: false

//             },
//         ],
//         isSelected: false
//     },
//     {
//         filterName: 'Price',
//         sub_filters: [
//             {
//                 sub_filterName: '0-100',
//                 isSubSelected: false
//             },
//             {
//                 sub_filterName: '100-300',
//                 isSubSelected: false

//             },
//             {
//                 sub_filterName: '300-500',
//                 isSubSelected: false

//             },
//             {
//                 sub_filterName: '500-1,000',
//                 isSubSelected: false

//             },
//             {
//                 sub_filterName: '1,000-5,000',
//                 isSubSelected: false

//             },
//             {
//                 sub_filterName: '5,000-10,000',
//                 isSubSelected: false

//             },
//             {
//                 sub_filterName: '10,000 & above',
//                 isSubSelected: false

//             },
//             {
//                 sub_filterName: 'Cash Only',
//                 isSubSelected: false

//             },
//         ],
//         isSelected: false
//     },
//     {
//         filterName: 'Size',
//         sub_filters: [
//             {
//                 sub_filterName: 'S',
//                 isSubSelected: false
//             },
//             {
//                 sub_filterName: 'M',
//                 isSubSelected: false
//             },
//             {
//                 sub_filterName: 'L',
//                 isSubSelected: false

//             },
//             {
//                 sub_filterName: 'XL',
//                 isSubSelected: false
//             },
//             {
//                 sub_filterName: 'XXL',
//                 isSubSelected: false
//             },
//         ],
//         isSelected: false
//     },
//     {
//         filterName: 'Brand',
//         sub_filters: [
//             {
//                 sub_filterName: 'Red Tape',
//                 isSubSelected: false
//             },
//             {
//                 sub_filterName: 'Allen Solly',
//                 isSubSelected: false

//             },
//         ],
//         isSelected: false
//     },
//     {
//         filterName: 'Status',
//         sub_filters: [
//             {
//                 sub_filterName: 'Rent',
//                 isSubSelected: false
//             },
//             {
//                 sub_filterName: 'Sale',
//                 isSubSelected: false

//             },
//         ],
//         isSelected: false
//     },
//     {
//         filterName: 'Title',
//         sub_filters: [
//             {
//                 sub_filterName: 'Shirt',
//                 isSubSelected: false
//             },
//             {
//                 sub_filterName: 'Jeans',
//                 isSubSelected: false

//             },
//         ],
//         isSelected: false
//     },
// ]
// const initialFilterState = {
//     selectedFilter: null,
//     filters: filterDummyData.map(filter => ({
//         ...filter,
//         isSelected: false,
//         sub_filters: filter.sub_filters.map(subFilter => ({
//             ...subFilter,
//             isSubSelected: false
//         }))
//     }))
// };
// const StyleExchange = ({ navigation }) => {
//     const dispatch = useDispatch();

//     const [productList, setProductList] = useState([]);
//     const [text, setText] = useState('');
//     const [activeButton, setActiveButton] = useState('Women');
//     const [mainData, setMainData] = useState([]);
//     const [page, setPage] = useState(0);
//     const [sorts, setSorts] = useState('');
//     const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
//     const [bottomSheetVisibleFilter, setBottomSheetVisibleFilter] = useState(false);
//     const [isFilterContainerSticky, setIsFilterContainerSticky] = useState(false);
//     const [filterDummyDataState, setFilterDummyDataState] = useState(filterDummyData);
//     const [filterData, setFilterData] = useState([]);
//     const [filterState, setFilterState] = useState(initialFilterState);

//     const inputRef = useRef(null);
//     const bottomSheetRef = useRef(null);
//     const bottomSheetFilterRef = useRef(null);
//     const sortSnapPoints = useMemo(() => ['50%', '50%'], []);
//     const filterSnapPoints = useMemo(() => ['75%', '75%'], []);


//     const productRes = useSelector((state) => state.ProductListReducer.PRODUCTLIST);
//     const loadingRes = useSelector((state) => state.ProductListReducer.loading);
//     // console.log("🚀 ~ file: StyleExchange.js:248 ~ StyleExchange ~ loadingRes:", loadingRes)

//     useEffect(() => {
//         if (productRes) {
//             setProductList((prev) => [...prev, ...productRes.filteredProducts]);
//         }
//     }, [productRes]);

//     useEffect(() => {
//         if (activeButton === 'Women') {
//             let data = [];
//             data.push(dummyData[0])
//             setMainData(data)
//         } else if (activeButton === 'Men') {
//             let data = [];
//             data.push(dummyData[1])
//             setMainData(data)
//         }
//     }, [activeButton])

//     const fetchProducts = (params) => {

//         dispatch(ProductListAction(params))
//     }
//     const handleScroll = (event) => {
//         const scrollY = event.nativeEvent.contentOffset.y;

//         setIsFilterContainerSticky(scrollY > height - 43);
//     };

//     const handleSearch = () => {
//         console.log('Inside border clicked');
//         searchBottomSheetOpen();
//     };
//     const searchBottomSheetOpen = () => {
//         navigation.navigate('SearchScreen');
//     };

//     const renderCategoryButton = () => (
//         <View style={styles.buttonRowContainer}>
//             {renderButton('Women', 'Women\'s')}
//             {renderButton('Men', 'Men\'s')}
//         </View>
//     );

//     const renderButton = (buttonType, label) => (
//         <LinearGradient
//             colors={activeButton === buttonType ? AppColor.LinearGradient1 : ['#F5F5F5', '#F8F8FF']}
//             style={styles.button}
//         >
//             <TouchableOpacity
//                 style={styles.buttonTouchable}
//                 onPress={() => setActiveButton(buttonType)}
//             >
//                 <Text style={[styles.buttonText, {
//                     color: activeButton === buttonType ? AppColor.white : AppColor.black,
//                 }]}>{label}</Text>
//             </TouchableOpacity>
//         </LinearGradient>
//     );

//     const renderSubCategoryItem = ({ item }) => {
//         const hexagonSize = '100%';

//         return (
//             <View style={styles.subCategoryContainer}>
//                 <View style={styles.hexagon}>
//                     <ImageBackground
//                         resizeMode='contain'
//                         source={{ uri: item.imageUrl }}
//                         style={{ width: hexagonSize, height: hexagonSize, }}
//                     >
//                     </ImageBackground>
//                 </View>
//             </View>
//         );
//     };

//     const ProductCard = ({ product }) => {
//         const { name, uploadedBy, contactNumber, location, image } = product;
//         return (
//             <TouchableOpacity style={styles.cardContainer}>
//                 <Image source={{ uri: image }} style={styles.productImage} />
//                 <Text style={styles.productName}>{name}</Text>
//                 <Text style={styles.productDetails}>
//                     Uploaded by: {uploadedBy} {'\n'}
//                     Contact number: {contactNumber} {'\n'}
//                     Location: {location}
//                 </Text>
//             </TouchableOpacity>
//         );
//     };

//     const renderProductCard = useCallback(({ item }) => {
//         return (
//             <TouchableOpacity onPress={() => navigation.navigate('ProductListling', { item })} style={styles.cardContainer1}>
//                 <TouchableOpacity
//                     //  onPress={() => handleWishListApi(item.id)} 
//                     style={styles.favoriteButton}
//                 >
//                     <Icon
//                         name="heart"
//                         size={22}
//                         color={AppColor.grey}
//                     />
//                 </TouchableOpacity>
//                 <View style={styles.card} >
//                     <Image
//                         source={{
//                             uri: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/f415d418-10f2-4b96-8ea8-2b6c22a8781a1701601965496-M--TSHIRT.jpg'
//                         }}
//                         style={styles.image}
//                     />
//                     <Text numberOfLines={1} style={styles.title}>{item.brand}</Text>
//                     <View style={styles.priceContainer}>
//                         <Text style={styles.discountPercentage}>
//                             12%
//                         </Text>
//                         <Text style={styles.discount}>₹123123.21</Text>
//                         <Text style={styles.price}>{item.price}</Text>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         );
//     }, []);

//     const onEndReached = () => {
//         console.log('second flatlist');
//         if (productList.length < 10 && page !== 0) {
//             return;
//         }
//         const newPage = page + 1;
//         setPage(newPage);

//         let params = {
//             page: newPage,
//             perPage: 10,
//             sort: sorts
//         }
//         fetchProducts(params);
//     };

//     const closeBottomSheet = () => {
//         setBottomSheetVisible(false);
//         bottomSheetRef.current?.close();
//     };

//     const closeBottomSheetFilter = () => {
//         setBottomSheetVisibleFilter(false);
//         bottomSheetFilterRef.current?.close();
//     };
//     const openBottomSheet = () => {
//         setBottomSheetVisible(true);
//         bottomSheetRef.current?.expand();
//     };
//     const openBottomSheetFilter = () => {
//         setBottomSheetVisibleFilter(true);
//         bottomSheetFilterRef.current?.expand();
//     };
//     const handleSortOption = (option) => {
//         const newPage = 1;
//         setSorts(option)
//         setPage(newPage);
//         let params = {
//             page: newPage,
//             perPage: 10,
//             sort: option
//         }
//         fetchProducts(params);
//         setProductList([])
//         closeBottomSheet();
//     };

//     const handleFilterOption = (option) => {
//         console.log('filter... ', filterData)
//         const updatedFilters = filterDummyDataState.map((item) => ({
//             ...item,
//             isSelected: item.filterName === option.filterName,
//         }));

//         setFilterDummyDataState(updatedFilters);
//         setFilterData(option);
//     };

//     const handleSubFilterOption = (filterName, subFilterName, index) => {
//         let filters = {
//             filterName: filterName,
//             isSelected: true,
//         };
//         const updatedFilters = filterData.sub_filters.map((filter) => {
//             console.log('filter... ', filter)
//             if (filter.sub_filterName === subFilterName) {
//                 return { ...filter, isSubSelected: !filter.isSubSelected };
//             }
//             return filter;
//         })
//         filters.sub_filters = updatedFilters
//         console.log("🚀 ~ file: StyleExchange.js:653 ~ updatedFilters ~ updatedFilters:", updatedFilters)
//         const updatedFilter = filterDummyDataState.map((filter) => {
//             if (filter.filterName === filterName) {
//                 const updatedSubFilters = filter.sub_filters.map((subFilter) => {
//                     if (subFilter.sub_filterName === subFilterName) {
//                         return { ...subFilter, isSubSelected: !subFilter.isSubSelected };
//                     }
//                     return subFilter;
//                 });
//                 return { ...filter, sub_filters: updatedSubFilters };
//             }
//             return filter;
//         });

//         console.log("Updated Filters:", updatedFilters[index]);
//         setFilterData(filters)
//         setFilterDummyDataState(updatedFilter);
//     };

//     const handleClearFilters = () => {
//         const clearedFilters = filterDummyDataState.map((item) => ({
//             ...item,
//             isSelected: false,
//             sub_filters: item.sub_filters.map(subFilter => ({
//                 ...subFilter,
//                 isSubSelected: false
//             })),
//         }));

//         setFilterDummyDataState(clearedFilters);
//         setFilterData([])
//         // Implement additional logic if needed
//     };

//     const handleApplyFilters = () => {
//         // Implement logic to apply filters
//         console.log("Applying filters...", filterDummyDataState);
//     };

//     const renderItem = ({ item }) => {
//         return (
//             <View>
//                 <View style={styles.subCategoryFlatlist}>
//                     <FlatList
//                         horizontal
//                         data={item.sub_categories.slice(0, 8)}
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={renderSubCategoryItem}
//                         showsHorizontalScrollIndicator={false}
//                     />
//                 </View>
//                 <View style={styles.subCategoryFlatlist}>
//                     <FlatList
//                         horizontal
//                         data={item.sub_categories.slice(8)}
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={renderSubCategoryItem}
//                         showsHorizontalScrollIndicator={false}
//                     />
//                 </View>
//                 <View style={{ height: height / 6.5, width: width }}>
//                     <Slider data={[1, 2, 3, 4, 5, 6]} />
//                 </View>
//                 <View style={styles.categoryContainer}>
//                     <Text style={[customStyles.heading, {
//                         marginLeft: 10,
//                     }]}>{item.Saree ? 'Sarees' : 'Shirts'}</Text>
//                     <FlatList
//                         data={item.Saree || item.Shirts}
//                         keyExtractor={(item, index) => index.toString()}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         renderItem={({ item }) => <ProductCard product={item} />}
//                     />
//                 </View>

//                 <View style={styles.productListContainer}>
//                     {
//                         !loadingRes && productList.length > 0 ? (
//                             <FlatList
//                                 data={productList}
//                                 renderItem={renderProductCard}
//                                 keyExtractor={(item, index) => index.toString()}
//                                 numColumns={numColumns}
//                                 showsVerticalScrollIndicator={false}
//                                 bounces={false}
//                                 stickyHeaderIndices={[0]}
//                                 ListHeaderComponent={() => {
//                                     return (
//                                         <View style={styles.FilterContainer}>
//                                             <TouchableOpacity onPress={openBottomSheet} style={styles.filtersView}>
//                                                 <Text>Sort</Text>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity onPress={openBottomSheetFilter} style={styles.filtersView}>
//                                                 <Text>filter</Text>
//                                             </TouchableOpacity>
//                                         </View>
//                                     )
//                                 }}
//                                 ListFooterComponent={() => {
//                                     if (loadingRes) {
//                                         return (
//                                             <View style={{}}>
//                                                 <ActivityIndicator size="large" color={AppColor.black} />
//                                             </View>
//                                         );
//                                     } else {
//                                         return null;
//                                     }
//                                 }}

//                             />
//                         ) : (
//                             <View style={{}}>
//                                 <ActivityIndicator size="large" color={AppColor.black} />
//                             </View>
//                         )
//                     }
//                 </View>
//             </View>
//         );
//     };
//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.container}>
//                 <FlatList
//                     numColumns={2}
//                     data={mainData}
//                     ListHeaderComponent={() => (
//                         <View style={styles.searchContainer}>
//                             <View style={styles.inputContainer}>
//                                 <TouchableOpacity onPress={handleSearch}>
//                                     <Icon
//                                         name="search"
//                                         size={height / 50}
//                                         color={AppColor.titleColor}
//                                     />
//                                 </TouchableOpacity>
//                                 <TextInput
//                                     ref={inputRef}
//                                     placeholder="Search item or member"
//                                     placeholderTextColor={AppColor.titleColor}
//                                     value={text}
//                                     onChangeText={setText}
//                                     style={styles.input}
//                                     onFocus={searchBottomSheetOpen}
//                                 />
//                             </View>
//                             <View style={styles.buttonContainer}>
//                                 {renderCategoryButton()}
//                             </View>
//                         </View>
//                     )}
//                     keyExtractor={(_, index) => index.toString()}
//                     renderItem={renderItem}
//                     onEndReached={onEndReached}
//                     onEndReachedThreshold={0.1}
//                     onScroll={handleScroll}
//                 // stickyHeaderIndices={[5]}
//                 />
//                 {isFilterContainerSticky && (
//                     <View style={[styles.FilterContainer, { position: 'absolute', top: 0, width: '100%' }]}>
//                         <TouchableOpacity onPress={openBottomSheet} style={styles.filtersView}>
//                             <Text>Sort</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={openBottomSheet} style={styles.filtersView}>
//                             <Text>filter</Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             </View>
//             {bottomSheetVisible && (
//                 <BottomSheet ref={bottomSheetRef} snapPoints={sortSnapPoints} index={0} backdropComponent={(props) => <BottomSheetBackdrop {...props} />}>
//                     <View style={styles.bottomSheetContainer}>
//                         <TouchableOpacity onPress={closeBottomSheet}>
//                             <Icon name="close-outline" size={30} color="white" />
//                         </TouchableOpacity>
//                         <Text style={styles.heading}>Sort</Text>
//                         <TouchableOpacity onPress={() => handleSortOption('price_high')}>
//                             <Text style={styles.sortOption}>High to Low</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => handleSortOption('price_low')}>
//                             <Text style={styles.sortOption}>Low to High</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </BottomSheet>
//             )}
//             {bottomSheetVisibleFilter && (
//                 <BottomSheet ref={bottomSheetFilterRef} snapPoints={filterSnapPoints} index={0} backdropComponent={(props) => <BottomSheetBackdrop {...props} />}>
//                     <View style={styles.bottomSheetContainer}>
//                         <View style={{ borderBottomWidth: 1, borderColor: AppColor.borderColor }}>
//                             <Text style={styles.heading}>Filter</Text>
//                         </View>
//                         <View style={{ flexDirection: 'row', width: width / 3, backgroundColor: '#ececec' }}>
//                             <View style={{}}>
//                                 {filterDummyDataState.map((val, index) => (
//                                     <TouchableOpacity key={index} style={[styles.ButtonFilter, { backgroundColor: val.isSelected ? AppColor.white : '#ececec' }]} onPress={() => handleFilterOption(val)}>
//                                         <Text style={[styles.FilterOption, { color: val.isSelected ? AppColor.black : AppColor.grey }]}>{val.filterName}</Text>
//                                     </TouchableOpacity>
//                                 ))}
//                             </View>
//                             <View style={{}}>
//                                 <Text style={[styles.heading, { padding: 5 }]}>{filterData.filterName}</Text>
//                                 {filterData && filterData.sub_filters && filterData.sub_filters.map((item, index) => (
//                                     <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
//                                         <Checkbox
//                                             color={AppColor.blueViolet}
//                                             status={item.isSubSelected ? 'checked' : 'unchecked'}
//                                             onPress={() => handleSubFilterOption(filterData.filterName, item.sub_filterName, index)}
//                                         />
//                                         <Text style={[styles.sortOption, {
//                                             color: 'grey', fontSize: responsiveFontSize(1.5),
//                                         }]}>{item.sub_filterName}</Text>
//                                     </View>
//                                 ))}
//                             </View>
//                         </View>

//                     </View>
//                     <LinearGradient colors={AppColor.LinearGradient1} style={{
//                         flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, left: 0, right: 0, height: '10%', borderTopWidth: 1,
//                         borderColor: AppColor.borderColor
//                     }}>
//                         <TouchableOpacity style={[styles.clearButton, { borderRightWidth: 1, borderColor: AppColor.borderColor }]} onPress={handleClearFilters}>
//                             <Text style={styles.clearButtonText}>Clear All</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
//                             <Text style={styles.clearButtonText}>Apply</Text>
//                         </TouchableOpacity>
//                     </LinearGradient>
//                 </BottomSheet>
//             )}
//         </SafeAreaView>
//     );
// };

// export default StyleExchange;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: AppColor.white,
//     },
//     itemContentContainer: {
//         backgroundColor: AppColor.smokeWhite,
//         flex: 1,
//         margin: 1,
//         borderRadius: 10,
//         padding: 5,
//     },
//     searchContainer: {
//         height: height / 12,
//         // backgroundColor: 'orange',
//         width: width,
//         justifyContent: 'center',
//         alignItems: 'center',
//         gap: 5,
//     },
//     inputContainer: {
//         width: width - 28,
//         alignSelf: 'center',
//         backgroundColor: AppColor.smokeWhite,
//         height: height / 20,
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         borderRadius: height / 40,
//         alignItems: 'center',
//         paddingLeft: 10,
//         marginTop: 5,
//     },
//     input: {
//         width: '90%',
//         marginLeft: 6,
//     },
//     itemContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         margin: 1,
//     },
//     buttonContainer: {
//         width: width - 28,
//         // backgroundColor: 'red',
//         // marginTop: 5,
//         height: '42%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     buttonRowContainer: {
//         flexDirection: 'row',
//         // justifyContent: 'space-between',
//         alignItems: 'center',
//         height: '100%',
//     },
//     button: {
//         height: '85%',
//         width: '49%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         margin: 1,
//         borderRadius: 20,
//     },
//     buttonTouchable: {
//         height: '100%',
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     buttonText: {
//         fontSize: responsiveFontSize(1.6),
//         fontFamily: Fonts.lobster.regular,
//         color: AppColor.white,
//     },
//     subCategoryContainer: {
//         flexDirection: 'column',
//         alignItems: 'center',
//         margin: 5,
//         backgroundColor: AppColor.smokeWhite
//     },
//     hexagon: {
//         aspectRatio: 1,
//         overflow: 'hidden',
//         width: 100,
//         height: 100,
//         marginBottom: 5,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     additionalCategories: {
//         alignItems: 'center',
//     },
//     subCategoryItem: {
//         // Customize hexagon styles as needed
//     },
//     subCategoryText: {
//         fontSize: responsiveFontSize(1.6),
//         fontFamily: Fonts.lobster.regular,
//         color: AppColor.black,
//     },
//     categoryContainer: {
//         margin: 10,
//         backgroundColor: AppColor.white,
//         borderRadius: 10,
//         padding: 10,
//     },
//     subCategoryFlatlist: {
//         // backgroundColor: 'red',
//         width: width,
//         height: 'auto'
//     },
//     cardContainer: {
//         // borderWidth: 1,
//         // borderColor: '#ddd',
//         borderRadius: 8,
//         padding: 10,
//         margin: 5,
//         backgroundColor: AppColor.smokeWhite
//     },
//     productImage: {
//         // width: width / 2,
//         height: width / 2,
//         resizeMode: 'contain',
//         borderRadius: 8,
//     },
//     productName: {
//         fontSize: responsiveFontSize(2),
//         fontFamily: Fonts.lobster.regular,
//         marginTop: 10,
//         color: AppColor.black
//     },
//     productDetails: {
//         fontSize: responsiveFontSize(1),
//         marginTop: 5,
//         fontFamily: Fonts.poppins.medium,
//         color: AppColor.titleColor
//     },
//     productListContainer: {
//         marginTop: 5,
//         flex: 1,
//         width: '100%',
//         alignItems: 'center',
//         minHeight: 100
//     },
//     cardContainer1: {
//         width: width / numColumns - 8,
//         height: height / 3.2,
//         borderWidth: 1,
//         borderColor: AppColor.borderColor,
//         borderRadius: 5,
//         margin: 1,
//         padding: 2,
//         backgroundColor: AppColor.white,
//         alignItems: 'flex-end',
//     },
//     favoriteButton: {
//         margin: 2,
//         alignItems: 'center',
//         backgroundColor: AppColor.white,
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: (height - width) / 12,
//         width: (height - width) / 12,
//         borderRadius: (height - width) / 6,
//         borderWidth: 0.5,
//         borderColor: AppColor.borderColor,
//     },
//     card: {
//         width: '100%',
//         height: '100%',
//         alignItems: 'center',
//         paddingHorizontal: 5,
//     },
//     image: {
//         width: '90%',
//         height: '70%',
//         resizeMode: 'contain',
//     },
//     title: {
//         fontSize: responsiveFontSize(1.5),
//         fontFamily: Fonts.PoppinsBold,
//         color: AppColor.black,
//     },
//     priceContainer: {
//         flexDirection: 'row',
//         width: '90%',
//         alignItems: 'center',
//     },
//     discountPercentage: {
//         color: AppColor.black,
//         fontFamily: Fonts.poppins.regular,
//         fontSize: responsiveFontSize(1.4),
//     },
//     discount: {
//         textDecorationLine: 'line-through',
//         color: AppColor.black,
//         fontFamily: Fonts.poppins.regular,
//         fontSize: responsiveFontSize(1.4),
//         paddingLeft: 10,
//     },
//     price: {
//         fontSize: responsiveFontSize(1.4),
//         color: AppColor.black,
//         fontFamily: Fonts.poppins.semiBold,
//         paddingLeft: 10,
//     },
//     FilterContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         backgroundColor: AppColor.white,
//         height: 40,

//     },
//     filtersView: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: width / 2.1,
//         borderWidth: 1,
//         margin: 1,
//         borderColor: AppColor.borderColor
//     },
//     bottomSheetContainer: {
//         backgroundColor: 'white',
//         justifyContent: 'flex-start'
//     },
//     heading: {
//         fontSize: responsiveFontSize(2),
//         fontFamily: Fonts.poppins.semiBold,
//         paddingLeft: 15,
//         paddingBottom: 5
//     },
//     sortOption: {
//         fontSize: responsiveFontSize(2),
//         fontFamily: Fonts.poppins.regular,
//         // paddingLeft: 5,

//     },
//     FilterOption: {
//         fontSize: responsiveFontSize(1.8),
//         fontFamily: Fonts.poppins.medium,
//         // padding: 5,
//         paddingLeft: 10,
//         color: 'grey'
//     },
//     ButtonFilter: {
//         padding: 5,
//         width: width / 3,
//         justifyContent: 'center',
//         borderBottomWidth: 1,
//         borderColor: AppColor.borderColor,
//     },
//     clearButton: {
//         // backgroundColor: 'lightgrey',
//         width: width / 2,
//         height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     clearButtonText: {
//         fontFamily: Fonts.poppins.semiBold,
//         fontSize: responsiveFontSize(1.8),
//         color: 'white',

//     },
//     applyButton: {
//         // backgroundColor: 'blue', // Set your desired color
//         width: width / 2,
//         height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     applyButtonText: {
//         color: 'white',
//         fontFamily: Fonts.poppins.semiBold,
//         fontSize: responsiveFontSize(1.8),
//     },
// });
