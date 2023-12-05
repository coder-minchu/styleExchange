import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppColor} from '../../utils/AppColor';
import {width} from '../../utils/Dimensions/Dimension';

const QuickFIlters = () => {
  return (
    <View style={{margin: 15}}>
      <Text>QUICK FILTERS</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 20,
          gap: 10,
        }}>
        <TouchableOpacity>
          <View style={styles.allView}>
            <Text>All</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.buttonView}>
            <Text>Meeting</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.buttonView}>
            <Text>Unread</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.buttonView}>
            <Text>Important</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuickFIlters;

const styles = StyleSheet.create({
  allView: {
    width: width / 6,
    height: width / 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    // height: 40,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderColor: AppColor.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 18,
  },
});
