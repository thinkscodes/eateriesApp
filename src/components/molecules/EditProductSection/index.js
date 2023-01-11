import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, useWindowDimensions, TouchableOpacity, TextInput} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {FoodDummy1, FoodDummy2, FoodDummy3, FoodDummy4} from '../../../assets';
import ItemListFood from '../ItemListFood';
// navigasi level sub page
import {useNavigation} from '@react-navigation/native';
import ItemListMenu from '../ItemListMenu';
import { auth } from '../../../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
import { db } from '../../../../firebase';
import { ref, set, get, child, onValue, orderByChild, query, equalTo, update, remove } from "firebase/database"; 

var product = {};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#020202',
      height: 3,
      width: '15%',
      marginLeft: '3%',
    }}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: '#F2F2F2',
      borderBottomWidth: 1,
    }}
    tabStyle={{width: 'auto'}}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: focused ? '#020202' : '#8D92A3',
        }}>
        {route.title}
      </Text>
    )}
  />
);


const Products = () => {
  const navigation = useNavigation();

  const [name, setname] = useState(product.product.name);
  const [price, setprice] = useState(product.product.price);
  const [image, setimage] = useState(product.product.image);
  const [date, setdate] = useState(product.product.date);
  const [detail, setdetail] = useState(product.product.detail);
  const [ingredients, setingredients] = useState(product.product.ingredients);
  const [label, setlabel] = useState(product.product.label);
  const [rating, setrating] = useState(product.product.rating);
  const [status, setstatus] = useState(product.product.status);

  const confirmEdit = async() => {
    update(ref(db, 'foodItems/' + ('FD' + product.product.fid)), {
      name: name,
      label: label,
      rating: rating,
      price:  price,
      name:  name,
      date: date,
      status:  status,
      detail: detail,
      ingredients: ingredients,
      image: image,
      });    
      navigation.navigate('ProductsList');
  }

  const deleteProduct = async() => {
    remove(ref(db, 'foodItems/' + ('FD' + product.product.fid))); 
    navigation.navigate('ProductsList'); 
  }

  return (
    <ScrollView style={{paddingTop: 8, paddingHorizontal: 24}}>
      <Text style={{color: 'orange', marginBottom: 4}}>Food Product Name</Text>
      <TextInput style={{padding: 6.8, borderRadius: 14, borderWidth: 1.8, borderColor: 'orange', marginBottom: 10}} value={name} onChangeText={(newValue) => {setname(newValue);}}></TextInput>
      <Text style={{color: 'orange', marginBottom: 4}}>Food Product Price</Text>
      <TextInput style={{padding: 6.8, borderRadius: 14, borderWidth: 1.8, borderColor: 'orange', marginBottom: 10}} value={price} onChangeText={(newValue) => {setprice(newValue);}}></TextInput>
      <Text style={{color: 'orange', marginBottom: 4}}>Food Product Image</Text>
      <TextInput style={{padding: 6.8, borderRadius: 14, borderWidth: 1.8, borderColor: 'orange', marginBottom: 10}} value={image} onChangeText={(newValue) => {setimage(newValue);}}></TextInput>
      <Text style={{color: 'orange', marginBottom: 4}}>Food Product Date</Text>
      <TextInput style={{padding: 6.8, borderRadius: 14, borderWidth: 1.8, borderColor: 'orange', marginBottom: 10}} value={date} onChangeText={(newValue) => {setdate(newValue);}}></TextInput>
      <Text style={{color: 'orange', marginBottom: 4}}>Food Product Detail</Text>
      <TextInput style={{padding: 6.8, borderRadius: 14, borderWidth: 1.8, borderColor: 'orange', marginBottom: 10}} value={detail} onChangeText={(newValue) => {setdetail(newValue);}}></TextInput>
      <Text style={{color: 'orange', marginBottom: 4}}>Food Product Ingredients</Text>
      <TextInput style={{padding: 6.8, borderRadius: 14, borderWidth: 1.8, borderColor: 'orange', marginBottom: 10}} value={ingredients} onChangeText={(newValue) => {setingredients(newValue);}}></TextInput>
      <Text style={{color: 'orange', marginBottom: 4}}>Food Product Label</Text>
      <TextInput style={{padding: 6.8, borderRadius: 14, borderWidth: 1.8, borderColor: 'orange', marginBottom: 10}} value={label} onChangeText={(newValue) => {setlabel(newValue);}}></TextInput>
      <Text style={{color: 'orange', marginBottom: 4}}>Food Product Rating</Text>
      <TextInput style={{padding: 6.8, borderRadius: 14, borderWidth: 1.8, borderColor: 'orange', marginBottom: 10}} value={rating} onChangeText={(newValue) => {setrating(newValue);}}></TextInput>
      <Text style={{color: 'orange', marginBottom: 4}}>Food Product Status</Text>
      <TextInput style={{padding: 6.8, borderRadius: 14, borderWidth: 1.8, borderColor: 'orange', marginBottom: 10}} value={status} onChangeText={(newValue) => {setstatus(newValue);}}></TextInput>
      <TouchableOpacity style={{marginBottom: 10}} onPress={() => { confirmEdit() }}><ItemListMenu text="Confirm Edit Product"/></TouchableOpacity>
      <TouchableOpacity style={{marginBottom: 20}} onPress={() => { deleteProduct() }}><ItemListMenu text="Confirm Delete Product"/></TouchableOpacity>
    </ScrollView>
  );
};
/*
const Eateries = () => {
  const navigation = useNavigation();
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
    </View>
  );
};
*/
const EditProductSection = (item) => {
  product = item;
  console.log(product.product.name);

  const initialLayout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Chosen Food Product'},
    /*{key: '2', title: 'Eateries'},*/
  ]);

  const renderScene = SceneMap({
    1: Products,
    /*2: Eateries,*/
  });

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default EditProductSection;

const styles = StyleSheet.create({});
