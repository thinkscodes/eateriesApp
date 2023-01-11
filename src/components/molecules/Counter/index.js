import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {IcMin, IcPlus} from '../../../assets';

const Counter = ( props ) => {
  const {value, change} = props;
  const dec = function() {
    if (value > 0) {
      change(value - 1);
    }
  }
  const inc = function() {
    change(value + 1);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {dec()}}>
        <IcMin />
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity onPress={() => {inc()}}>
        <IcPlus />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  value: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginHorizontal: 10,
  },
});
