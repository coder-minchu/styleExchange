import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, TouchableOpacity, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Ionicons';
import { height, responsiveFontSize, width } from '../../src/utils/Dimensions/Dimension';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { AppColor } from '../utils/AppColor';
import { Fonts } from '../utils/Fonts';
import FIlterList from '../Components/FilterList/FIlterList';
import { customStyles } from '../utils/Styles';
import SearchInput from '../Components/SearchInput/SearchInput';
import { Searchbar } from 'react-native-paper';
import BrandBottomSheet from '../Components/BottomSheet/BrandBottomSheet';
import SortedBottomSheet from '../Components/BottomSheet/SortedBottomSheet';
import FilteredBottomSheet from '../Components/BottomSheet/FilteredBottomSheet';
import ProductList from '../Components/ProductCard.js/ProductList';

const filtersData = [
  {
    filterName: 'Availability',
    isVisible: true,
    sub_filters: [
      {
        sub_filterName: 'Available',
        isSubSelected: false,
      },
      {
        sub_filterName: 'Sold',
        isSubSelected: false,
      },
    ],
    isSelected: false,
  },
  {
    filterName: 'Sort',
    isVisible: false,
    sub_filters: [
      {
        sub_filterName: 'High to Low',
        isSubSelected: false,
      },
      {
        sub_filterName: 'Low to High ',
        isSubSelected: false,
      },
    ],
    isSelected: false,
  },
  {
    filterName: 'Condition',
    isVisible: false,
    sub_filters: [
      {
        sub_filterName: 'New with Tag',
        isSubSelected: false,
      },
      {
        sub_filterName: 'Like New',
        isSubSelected: false,
      },
      {
        sub_filterName: 'Good',
        isSubSelected: false,
      },
      {
        sub_filterName: 'Used',
        isSubSelected: false,
      },
      {
        sub_filterName: 'Virtual',
        isSubSelected: false,
      },
    ],
    isSelected: false,
  },
  {
    filterName: 'Seller Rating',
    isVisible: false,
    sub_filters: [
      {
        sub_filterName: '4.0 and above',
        isSubSelected: false,
      },
      {
        sub_filterName: '4.5 and above',
        isSubSelected: false,
      },
      {
        sub_filterName: '4.7 and above',
        isSubSelected: false,
      },
    ],
    isSelected: false,
  },
  {
    filterName: 'Price',
    isVisible: false,
    sub_filters: [
      {
        sub_filterName: '0-100',
        isSubSelected: false,
      },
      {
        sub_filterName: '100-300',
        isSubSelected: false,
      },
      {
        sub_filterName: '300-500',
        isSubSelected: false,
      },
      {
        sub_filterName: '500-1,000',
        isSubSelected: false,
      },
      {
        sub_filterName: '1,000-5,000',
        isSubSelected: false,
      },
      {
        sub_filterName: '5,000-10,000',
        isSubSelected: false,
      },
      {
        sub_filterName: '10,000 & above',
        isSubSelected: false,
      },
      {
        sub_filterName: 'Cash Only',
        isSubSelected: false,
      },
    ],
    isSelected: false,
  },
  {
    filterName: 'Size',
    isVisible: false,
    sub_filters: [
      {
        sub_filterName: 'S',
        isSubSelected: false,
      },
      {
        sub_filterName: 'M',
        isSubSelected: false,
      },
      {
        sub_filterName: 'L',
        isSubSelected: false,
      },
      {
        sub_filterName: 'XL',
        isSubSelected: false,
      },
      {
        sub_filterName: 'XXL',
        isSubSelected: false,
      },
    ],
    isSelected: false,
  },
  {
    filterName: 'Brand',
    isVisible: false,
    sub_filters: [
      {
        sub_filterName: 'Red Tape',
        isSubSelected: false,
      },
      {
        sub_filterName: 'Allen Solly',
        isSubSelected: false,
      },
    ],
    isSelected: false,
  },
  {
    filterName: 'Color',
    isVisible: false,
    sub_filters: [
      {
        sub_filterName: 'Red',
        isSubSelected: false,
      },
      {
        sub_filterName: 'Blue',
        isSubSelected: false,
      },
      {
        sub_filterName: 'Green',
        isSubSelected: false,
      },
      // Add more colors as needed
    ],
    isSelected: false,
  },
  {
    filterName: 'Discount',
    isVisible: false,
    sub_filters: [
      {
        sub_filterName: '10% Off',
        isSubSelected: false,
      },
      {
        sub_filterName: '20% Off',
        isSubSelected: false,
      },
      {
        sub_filterName: '30% Off',
        isSubSelected: false,
      },
      // Add more discount options as needed
    ],
    isSelected: false,
  },
  {
    filterName: 'Status',
    isVisible: false,
    sub_filters: [
      {
        sub_filterName: 'Rent',
        isSubSelected: false,
      },
      {
        sub_filterName: 'Sale',
        isSubSelected: false,
      },
    ],
    isSelected: false,
  },
  {
    filterName: 'Title',
    isVisible: false,
    sub_filters: [
      {
        sub_filterName: 'Shirt',
        isSubSelected: false,
      },
      {
        sub_filterName: 'Jeans',
        isSubSelected: false,
      },
    ],
    isSelected: false,
  },
]

const ProductListing = ({ navigation }) => {
  const { params: { search } } = useRoute();
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const snapPoints = useMemo(() => ['15%', '75%'], []);
  const snapSortPoints = useMemo(() => ['15%', '25%'], []);

  const [filters, setFilters] = useState(filtersData);
  const [visibleSelectedFilters, setVisibleSelectedFilters] = useState([]);
  const [selectedFiltersData, setSelectedFiltersData] = useState([]);

  const handleSortOption = useCallback(() => {
  }, []);

  const openBottomSheet = useCallback((label) => {
    setBottomSheetVisible(true);
    const updatedFilters = filters.map((filter) => ({
      ...filter,
      isVisible: filter.filterName === label || (filter.filterName === "Availability" && label === "Filter" && true),
    }));
    // console.log("🚀 ~ file: ProductListing.js:271 ~ updatedFilters ~ filters:", filters)
    // console.log("🚀 ~ file: ProductListing.js:271 ~ updatedFilters ~ updatedFilters:", updatedFilters)
    setFilters(updatedFilters);
    bottomSheetRef.current?.expand();

  }, [filters]);


  const setFiltersData = (data) => {
    setVisibleSelectedFilters(data);
  };
  const selectedFiltersFnc = (data) => {
    // console.log("🚀 ~ file: ProductListing.js:283 ~ selectedFiltersFnc ~ data:", data)
    setBottomSheetVisible(false);
    setSelectedFiltersData(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icons name="arrow-back" size={height / 40} color="#000" />
        </TouchableOpacity>
        <SearchInput placeholder="Search.." value={search} />
        <TouchableOpacity style={styles.wishlistButton} onPress={() => navigation.navigate("WishList")}>
          <Icon name="heart" size={height / 40} color={AppColor.black} />
        </TouchableOpacity>
      </View>
      <FIlterList openBottomSheet={openBottomSheet} visibleSelectedFilters={visibleSelectedFilters} />
      <ProductList search={search} selectedFiltersData={selectedFiltersData} />
      {bottomSheetVisible && (
        // <BottomSheet ref={bottomSheetRef} snapPoints={filterText === 'Brand' ? snapPoints : filterText === 'Sort' ? snapSortPoints : snapPoints} index={1} backdropComponent={(props) => <BottomSheetBackdrop  {...props} />}>
        //   {filterText === 'Filter' && <FilteredBottomSheet filters={filters} />}
        //   {filterText === 'Brand' && <BrandBottomSheet handleApply={handleApply} />}
        //   {filterText === 'Sort' && <SortedBottomSheet handleSortOption={handleSortOption} />}
        // </BottomSheet>
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={1} backdropComponent={(props) => <BottomSheetBackdrop  {...props} />}>
          <FilteredBottomSheet filters={filters} setFiltersData={setFiltersData} selectedFiltersFnc={selectedFiltersFnc} setFilters={setFilters} />
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: AppColor.borderColor,
    alignSelf: 'center',
    padding: 5,
    borderBottomWidth: 0.5,
    borderColor: AppColor.borderColor,
    width: width,
  },
  backButton: {
    paddingRight: 5,
  },
  wishlistButton: {
    paddingLeft: 10,
  },
});

export default ProductListing;
