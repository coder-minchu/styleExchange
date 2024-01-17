import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { FlatList, StyleSheet, Text, View, Animated, Easing, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { height, responsiveFontSize } from '../../utils/Dimensions/Dimension';
import { AppColor } from '../../utils/AppColor';
import { Fonts } from '../../utils/Fonts';
import { useDispatch } from 'react-redux';

const filterOptions = [
    { id: '2', label: 'Filter', iconName: 'filter' },
    { id: '1', label: 'Sort', iconName: 'chevron-down' },
    { id: '4', label: 'Price', iconName: 'chevron-down' },
    { id: '3', label: 'Brand', iconName: 'chevron-down' },
    { id: '5', label: 'Size', iconName: 'chevron-down' },
    { id: '6', label: 'Color', iconName: 'chevron-down' },
    { id: '7', label: 'Discount', iconName: 'chevron-down' },
    // { id: '8', label: 'Clear All', iconName: '' },
];

const FilterList = ({ openBottomSheet, visibleSelectedFilters }) => {
    // console.log("🚀 ~ file: FIlterList.js:21 ~ FilterList ~ visibleSelectedFilters:", visibleSelectedFilters)
    console.log('filterlist called')
    const animatedValues = useRef(filterOptions.map(() => new Animated.Value(0))).current;

    const animateFilters = () => {
        const animations = filterOptions.map((_, index) => {
            return Animated.timing(animatedValues[index], {
                toValue: 1,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: false,
                delay: index * 100,
            });
        });

        Animated.stagger(100, animations).start();
    };

    useEffect(() => {
        animateFilters();
    }, []);


    const renderFilterCard = ({ item, index }) => {
        const animatedStyle = {
            opacity: animatedValues[index],
            transform: [
                {
                    translateY: animatedValues[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [100, 0],
                    }),
                },
            ],
        };

        const isSelected = visibleSelectedFilters.some(filter => filter.key === item.label) || (item.label === 'Filter' && visibleSelectedFilters.length > 0);

        return (
            <TouchableOpacity onPress={() => openBottomSheet(item.label)}>
                <Animated.View style={[
                    styles.filterCard,
                    animatedStyle,
                    { borderColor: isSelected ? AppColor.black : AppColor.borderColor }
                ]}>
                    <Text style={styles.filterLabel}>{item.label}</Text>
                    {item.iconName && <Icon name={item.iconName} size={height / 70} color={AppColor.black} />}
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ marginTop: 2 }}>
            <FlatList
                data={filterOptions}
                keyExtractor={(item) => item.id}
                renderItem={renderFilterCard}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default memo(FilterList);

const styles = StyleSheet.create({
    filterCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 0.6,
        margin: 4,
        // borderRadius: 10,
        borderColor: AppColor.borderColor
    },
    filterLabel: {
        fontSize: responsiveFontSize(1.2),
        fontFamily: Fonts.poppins.medium,
        color: AppColor.black,
    }
});
