import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';

const TextinputWithLabel = ({
  label,
  placeHolder,
  value,
  onChangeText = () => {},
}) => {
  return (
    <View style={{justifyContent: 'center'}}>
      <Text style={styles.label}>{label}</Text>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          style={styles.textInput}
          // placeholder={placeHolder}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  textInput: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    fontSize: 18,
    // paddingVertical: 12,
    paddingLeft: 20,
    elevation: 2,
  },
});

export default TextinputWithLabel;
