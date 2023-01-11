import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {FoodDummy1, FoodDummy2, FoodDummy3, FoodDummy4} from '../../../assets';
import ItemListFood from '../ItemListFood';
import FoodItem from '../FoodItem';
import {useNavigation} from '@react-navigation/native';
import {getFirestore} from "firebase/firestore";
import { db } from '../../../../firebase';
import { auth } from '../../../../firebase';
import { ref, set, get, child, onValue, orderByChild, query, equalTo } from "firebase/database"; 

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


const NewTaste = () => {
  useEffect(() => { queryNewFoodItems(); }, [])

  const navigation = useNavigation();

  const [newFoodItemsList, setNewFoodItemsList] = useState([]);
  var listed = [];

  const queryNewFoodItems = async() => { 
      const fooditems = await query(ref(db, 'foodItems/'), orderByChild('label'), equalTo('new'));
      onValue(fooditems, (snapshot) => {
        snapshot.forEach(function(childNodes) {
          console.log(childNodes.val().name);
          listed.push(childNodes.val());
          setNewFoodItemsList(listed);
        });
      });
      //console.log(listed);
  };

  

  





  



  //Query New Food Items

  //console.log(newFoodItemsList);


  //Import New Food Items
  /*const starCountRef = ref(db, 'foodItems/');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    //console.log(data.FD0001.name);

  });
  */

  /*writeUserData();
  function writeUserData() {
  set(ref(db, 'users/' + auth.currentUser.email), {
    name: auth.currentUser.displayName,
    phone: auth.currentUser.phoneNumber,
  });
  }*/

  
  /*writeUserData();
  function writeUserData() {
  set(ref(db, 'foodItems/' + "FD0003"), {
    image: "https://images.pngnice.com/download/2007/Chicken-Wings-Transparent-Background.png",
    label: "popular",
    rating: "4",
    price:  "400",
    tag:  "Snack",
    name:  "Chicken Wings",
    date: "12/12/23",
    status:  "active",
  });
  }*/


  //Read
  /*const starCountRef = ref(db, 'foodItems/' + "FD0001" );
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data.name);
  });*/


  //User Info
  //console.log(auth.currentUser.displayName);
  const renderItem = ({ item }) => (
    <FoodItem
      type="product"
      name={item.name}
      price={item.price}
      rating={item.rating}
      image={item.image}
      onPress={() => navigation.navigate('FoodDetail', { item })}
    />
  );


  return (
    <FlatList data={newFoodItemsList} renderItem={renderItem} refreshing={true}/>
  );
};

const Popular = () => {
  useEffect(() => { queryPopularFoodItems(); }, [])

  const navigation = useNavigation();

  const [popularFoodItemsList, setPopularFoodItemsList] = useState([]);
  var listed = [];

  const queryPopularFoodItems = async() => { 
      const fooditems = await query(ref(db, 'foodItems/'), orderByChild('label'), equalTo('popular'));
      onValue(fooditems, (snapshot) => {
        snapshot.forEach(function(childNodes) {
          console.log(childNodes.val().name);
          listed.push(childNodes.val());
          setPopularFoodItemsList(listed);
        });
      });
      //console.log(listed);
  };

  const renderItem = ({ item }) => (
    <FoodItem
      type="product"
      name={item.name}
      price={item.price}
      rating={item.rating}
      image={item.image}
      onPress={() => navigation.navigate('FoodDetail', { item })}
    />
  );

  return (
    <FlatList data={popularFoodItemsList} renderItem={renderItem} refreshing={true}/>
  );
};

const VendorHomeTabSection = () => {
  const initialLayout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'New Taste'},
    {key: '2', title: 'Popular'},
    {key: '3', title: 'Recommended'},
  ]);

  const renderScene = SceneMap({
    1: NewTaste,
    2: Popular,
    3: NewTaste,
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

export default VendorHomeTabSection;

const styles = StyleSheet.create({});
