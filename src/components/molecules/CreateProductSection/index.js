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

  const [foodid, setfoodid] = useState('');
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [image, setimage] = useState('');
  const [date, setdate] = useState('');
  const [detail, setdetail] = useState('');
  const [ingredients, setingredients] = useState('');
  const [label, setlabel] = useState('');
  const [rating, setrating] = useState('');
  const [status, setstatus] = useState('');

  const createNewProduct = async() => {
      set(ref(db, 'foodItems/' + ('FD' + foodid)), {
      fid: foodid,
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
      navigation.navigate('VendorHome');
  }

  return (
    <ScrollView style={{paddingTop: 8, paddingHorizontal: 24}}>
      <Text style={{color: 'orange', marginBottom: 4}}>Food Product ID</Text>
      <TextInput style={{padding: 6.8, borderRadius: 14, borderWidth: 1.8, borderColor: 'orange', marginBottom: 10}} value={foodid} onChangeText={(newValue) => {setfoodid(newValue);}}></TextInput>
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
      <TouchableOpacity style={{marginBottom: 20}} onPress={() => { createNewProduct() }}><ItemListMenu text="Create New Food Product"/></TouchableOpacity>
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
const CreateProductSection = () => {

  const initialLayout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'New Food Product Details'},
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

export default CreateProductSection;

const styles = StyleSheet.create({});
