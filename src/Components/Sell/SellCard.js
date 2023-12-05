import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
import {AppColor} from '../../utils/AppColor';
import {width} from '../../utils/Dimensions/Dimension';
import CarsComponent from './CarsComponent';
import OtherSellScreen from './Categories/OtherSellScreen';

const sellData = [
  {
    id: 1,
    title: 'Cars',
    name: 'car-outline',
  },
  {
    id: 2,
    title: 'Properties',
    name: 'car-outline',
  },
  {
    id: 3,
    title: 'Mobiles',
    name: 'car-outline',
  },
  {
    id: 4,
    title: 'Jobs',
    name: 'car-outline',
  },
  {
    id: 5,
    title: 'Jobs',
    name: 'car-outline',
  },
  {
    id: 6,
    title: 'Jobs',
    name: 'car-outline',
  },
  {
    id: 7,
    title: 'Jobs',
    name: 'car-outline',
  },
  {
    id: 8,
    title: 'Jobs',
    name: 'car-outline',
  },
  {
    id: 9,
    title: 'Jobs',
    name: 'car-outline',
  },
  {
    id: 10,
    title: 'Jobs',
    name: 'car-outline',
  },
  {
    id: 11,
    title: 'Jobs',
    name: 'car-outline',
  },
  {
    id: 12,
    title: 'Jobs',
    name: 'car-outline',
  },
  {
    id: 13,
    title: 'Jobs',
    name: 'car-outline',
  },
];

const SellCard = () => {
  const [Selltitle, setSellTitle] = useState('');
  const navigation = useNavigation();

  const handleCars = title => {
    setSellTitle(title);
  };

  return (
    // <View style={styles.SellCardView}>
    //   <TouchableOpacity onPress={onPress}>
    //     <View style={styles.SellCard}>
    //       <Icon name={name} size={50} />
    //       <Text style={styles.text}>{title}</Text>
    //     </View>
    //   </TouchableOpacity>
    // </View>
    <View style={{flexDirection: 'row'}}>
      <View style={styles.SellCardView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={sellData}
          keyExtractor={item => item.id}
          // numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleCars(item.title)}>
              <View style={styles.SellCard}>
                <Icon name={item.name} size={50} />
                <Text style={styles.text}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{backgroundColor: 'white', width: width / 1}}>
        {/* <Cars /> */}

        {Selltitle === 'Cars' && (
          <View>
            <CarsComponent />
          </View>
        )}
        {Selltitle === 'Properties' && (
          <View>
            <View style={styles.headingView}>
              <Text style={styles.heading}>Properties</Text>
            </View>
            <OtherSellScreen title="For Sale:Houses & Apartments" />
            <OtherSellScreen title="For Sale:Houses & Apartments" />
            <OtherSellScreen title="For Sale:Houses & Apartments" />
            <OtherSellScreen title="For Sale:Houses & Apartments" />
            <OtherSellScreen title="For Sale:Houses & Apartments" />
            <OtherSellScreen title="For Sale:Houses & Apartments" />
            <OtherSellScreen title="For Sale:Houses & Apartments" />
            <OtherSellScreen title="For Sale:Houses & Apartments" />
          </View>
        )}
        {Selltitle === 'Mobiles' && (
          <View>
            <View style={styles.headingView}>
              <Text style={styles.heading}>Mobiles</Text>
            </View>
            <OtherSellScreen title="Mobile Phones" />
            <OtherSellScreen title="Accessories" />
            <OtherSellScreen title="Tablets" />
          </View>
        )}
      </View>
    </View>
  );
};

export default SellCard;

const styles = StyleSheet.create({
  SellCardView: {
    backgroundColor: AppColor.appBackground,
    width: width / 4,
  },
  SellCard: {
    // width: 180,
    width: width / 5.9,

    margin: 15,
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: AppColor.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    // elevation:1
    shadowColor: AppColor.grey,
  },
  text: {
    fontSize: 12,
    color: AppColor.black,
  },
  headingView: {
    width: width / 1,
    alignItems: 'flex-start',
    paddingTop: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingLeft: 10,
    borderColor: AppColor.borderColor,
  },
  heading: {
    fontSize: 20,
    color: AppColor.black,
  },
});
