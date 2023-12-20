import React, { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Button, Divider, Title, Paragraph, IconButton, Colors } from 'react-native-paper';
import { AppColor } from '../../utils/AppColor';
import { responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';

const ProductDetails = ({ route }) => {
  const { item } = route.params;
  console.log("🚀 ~ file: ProductDetails.js:10 ~ ProductDetails ~ item:", item)
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef();

  const handleScroll = (event) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / Dimensions.get('window').width);
    setActiveIndex(index);
  };

  const renderImages = () => {
    return item.upload.map((image, index) => (
      <Image key={index} source={{ uri: image }} style={styles.sliderImage} />
    ));
  };

  const scrollToIndex = (index) => {
    scrollViewRef.current.scrollTo({ x: Dimensions.get('window').width * index, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={200}
            decelerationRate="fast">
            {renderImages()}
          </ScrollView>

          <View style={styles.pagination}>
            {item.upload.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paginationDot,
                  { backgroundColor: index === activeIndex ? AppColor.blueViolet : AppColor.grey },
                ]}
                onPress={() => scrollToIndex(index)}
              />
            ))}
          </View>
        </View>

        <View style={styles.productDetailsContainer}>
          <Title style={styles.title}>{item.title}</Title>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.condition}>{item.condition}</Text>

          <Divider style={styles.divider} />

          <View style={styles.locationContainer}>
            <Title style={styles.title}>Location</Title>
            <Paragraph>{item.city}, {item.state}</Paragraph>
            {/* Display more location details as needed */}
          </View>

          <Divider style={styles.divider} />

          <View style={styles.depositContainer}>
            <Title style={styles.title}>Deposit Amount</Title>
            <Paragraph>₹{item.depositAmount}</Paragraph>
            {/* Display more deposit details as needed */}
          </View>

          {/* Add more necessary details sections as needed */}

          <Divider style={styles.divider} />

          <View style={styles.descriptionContainer}>
            <Title style={styles.title}>Description</Title>
            <Paragraph>{item.description}</Paragraph>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.detailsContainer}>
            <Title style={styles.title}>Details</Title>
            <Paragraph>{item.details}</Paragraph>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.sellerInfoContainer}>
            <Title style={styles.title}>Seller Information</Title>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Add seller profile picture if available */}
              <Image source={{ uri: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_72,c_limit,fl_progressive/w_72,h_94,q_60,,dpr_2,fl_progressive/assets/images/2023/12/3/fe5c2d1e-716c-4cec-a6bf-934b5e6bcc191701602275798-W--DRESSES.jpg' }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} />
              <Text>Seller: {item.user_Id}</Text>
              {/* Add more seller information fields as needed */}
            </View>
          </View>

          {/* Add more sections or components as needed */}

          <Button
            icon={({ size, color }) => <IconButton icon="message" color={color} size={size} />}
            mode="contained"
            onPress={() => console.log('Pressed')}>
            Chat with Seller
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderImage: {
    width: width,
    height: width - 100,
    resizeMode: 'contain',
    // backgroundColor: 'red'
  },
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 5
    // justifyContent:'center'
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  productDetailsContainer: {
    padding: 16,
    // backgroundColor: 'orange'
  },
  title: {
    fontSize: responsiveFontSize(2),
    marginBottom: 8,
    fontFamily: Fonts.poppins.bold
  },
  price: {
    fontSize: responsiveFontSize(2) - 6,
    marginBottom: 8,
    fontFamily: Fonts.poppins.medium
  },
  condition: {
    fontSize: responsiveFontSize(2) - 8,
    color: AppColor.darkGreen,
    marginBottom: 16,
    fontFamily: Fonts.poppins.semiBold
  },
  divider: {
    marginVertical: 10,
  },
  descriptionContainer: {
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  sellerInfoContainer: {
    marginBottom: 16,
  },

});

export default ProductDetails;
