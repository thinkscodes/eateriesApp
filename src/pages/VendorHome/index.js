import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, FlatList} from 'react-native';
import {FoodDummy1, FoodDummy2, FoodDummy3} from '../../assets';
import {FoodCard, Gap, VendorHomeProfile, VendorHomeTabSection, VendorProductSection} from '../../components';
import {getFirestore} from "firebase/firestore";
import { db } from '../../../firebase';
import { auth } from '../../../firebase';
import { ref, set, get, child, onValue, orderByChild, query, equalTo } from "firebase/database"; 
import {useNavigation} from '@react-navigation/native';

const VendorHome = () => {
  
  return (
    <View style={styles.page}>
      <VendorHomeProfile />
      <View style={styles.tabContainer}>
        <VendorProductSection />
      </View>
    </View>
  );
};
export default VendorHome;

const styles = StyleSheet.create({
  page: {flex: 1},
  foodCardContainer: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  tabContainer: {flex: 1},
});
