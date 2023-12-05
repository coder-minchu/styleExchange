import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '../../Components/Slider';
import {Fonts} from '../../utils/Fonts';
import {width} from '../../utils/Dimensions/Dimension';
import ProductDetailsNabvar from '../../Components/Navbar/ProductDetailsNavbar';
import {Button} from 'react-native';
import {TouchableOpacity} from 'react-native';

// const Data = [
//   {
//     id: 1,
//     image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
//     title: 'OLX AUTOS(CARS)',
//     price: 'Rs-20000',
//     location: 'Vijay Nagar',
//   },
//   {
//     id: 2,
//     image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
//     title: 'OLX AUTOS(CARS)',
//     price: 'Rs-20000',
//     location: 'Vijay Nagar',
//   },
//   {
//     id: 3,
//     image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
//     title: 'OLX AUTOS(CARS)',
//     price: 'Rs-20000',
//     location: 'Vijay Nagar',
//   },
//   {
//     id: 4,
//     image: 'https://cdn-icons-png.flaticon.com/512/1168/1168014.png',
//     title: 'OLX AUTOS(CARS)',
//     price: 'Rs-20000',
//     location: 'Vijay Nagar',
//   },
// ];

const ProductDetails = ({...props}) => {
  let Data = props.route.params.item;
  // console.log('props... ', Data);
  const sliderStyles = {
    containerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    bannerContainerStyle: {
      height: width / 2,
      width: width,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    bannerImageStyle: {resizeMode: 'contain'},
    // indicatorContainerStyle: { bottom: 20 },
    // indicatorStyle: { backgroundColor: 'blue' },
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            width: '100%',
          }}>
          <Slider data={[Data]} {...sliderStyles} />
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // paddingBottom:20
            }}>
            <View>
              <Text style={{fontSize: 16, padding: 2, color: 'black'}}>
                {props.route.params.item.price}
              </Text>
              <Text style={{fontSize: 16, padding: 2}}>
                {props.route.params.item.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Icon name="location" size={20} />
                <Text style={{fontSize: 16, padding: 2}}>
                  {props.route.params.item.location}
                </Text>
              </View>
            </View>
            <Icon name="heart-outline" size={25} />
          </View>
          <View style={{padding: 10, borderBottomWidth: 1}}>
            <Text style={{fontSize: 20, color: 'black'}}>Details</Text>
          </View>
          <View style={{padding: 10}}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontFamily: Fonts.regular,
                fontWeight: 'bold',
              }}>
              Description
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: Fonts.regular,
                textAlign: 'justify',
                padding: 5,
              }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate provident doloribus impedit? Assumenda consequatur ab
              voluptates aspernatur cupiditate iusto, dolorem ea maiores
              incidunt, accusantium eius cum nisi temporibus! Impedit, ex?Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
              provident doloribus impedit? Assumenda consequatur ab voluptates
              aspernatur cupiditate iusto, dolorem ea maiores incidunt,
              accusantium eius cum nisi temporibus! Impedit, ex?Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Cupiditate provident
              doloribus impedit? Assumenda consequatur ab voluptates aspernatur
              cupiditate iusto, dolorem ea maiores incidunt, accusantium eius
              cum nisi temporibus! Impedit, ex? it amet consectetur adipisicing
              elit. Cupiditate provident doloribus impedit? Assumenda
              consequatur ab voluptates aspernatur cupiditate iusto, dolorem ea
              maiores incidunt, accusantium eius cum nisi temporibus! Impedit,
              ex?Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate provident doloribus impedit? Assumenda consequatur ab
              voluptates aspernatur cupiditate iusto, dolorem ea maiores
              incidunt, accusantium eius cum nisi temporibus! Impedit, ex? it
              amet consectetur adipisicing elit. Cupiditate provident doloribus
              impedit? Assumenda consequatur ab voluptates aspernatur cupiditate
              iusto, dolorem ea maiores incidunt, accusantium eius cum nisi
              temporibus! Impedit, ex?Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Cupiditate provident doloribus impedit?
              Assumenda consequatur ab voluptates aspernatur cupiditate iusto,
              dolorem ea maiores incidunt, accusantium eius cum nisi temporibus!
              Impedit, ex? v
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: width / 7,
          padding: 8,
          gap: 10,
        }}>
        <TouchableOpacity
          style={{
            width: width / 2.1,
            height: '100%',
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: width / 2.1,
            height: '100%',
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
