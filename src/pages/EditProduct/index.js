import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, FlatList} from 'react-native';
import {FoodDummy1, FoodDummy2, FoodDummy3} from '../../assets';
import {FoodCard, Gap, EditProductHeader, EditProductSection} from '../../components';
import {getFirestore} from "firebase/firestore";
import { db } from '../../../firebase';
import { auth } from '../../../firebase';
import { ref, set, get, child, onValue, orderByChild, query, equalTo } from "firebase/database"; 
import {useNavigation} from '@react-navigation/native';

const EditProduct = ({route, navigation}) => {
  const {item} = route.params;
  console.log(item);
  return (
    <View style={styles.page}>
      <EditProductHeader />
      <View style={styles.tabContainer}>
        <EditProductSection product={item}/>
      </View>
    </View>
  );
};
export default EditProduct;

const styles = StyleSheet.create({
  page: {flex: 1},
  foodCardContainer: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  tabContainer: {flex: 1},
});
