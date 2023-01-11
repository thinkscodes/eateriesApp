import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, FlatList} from 'react-native';
import {FoodDummy1, FoodDummy2, FoodDummy3} from '../../assets';
import {FoodCard, Gap, HomeProfile, HomeTabSection} from '../../components';
import {getFirestore} from "firebase/firestore";
import { db } from '../../../firebase';
import { auth } from '../../../firebase';
import { ref, set, get, child, onValue, orderByChild, query, equalTo } from "firebase/database"; 
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  useEffect(() => { queryNewFoodItems(); }, [])
  const navigation = useNavigation();
  const [newFoodItemsList, setNewFoodItemsList] = useState([]);
  var listed = [];

  const queryNewFoodItems = async() => { 
      const fooditems = await query(ref(db, 'foodItems/'), orderByChild('label'), equalTo('recommended'));
      onValue(fooditems, (snapshot) => {
        snapshot.forEach(function(childNodes) {
          console.log(childNodes.val().name);
          listed.push(childNodes.val());
          setNewFoodItemsList(listed);
        });
      });
      console.log(listed);
  };

  const renderItem = ({ item }) => (
    <FoodCard
      name={item.name}
      image={item.image}
      onPress={() => navigation.navigate('FoodDetail', { item })}
    />
  );




  return (
    <View style={styles.page}>
      <HomeProfile />
      <View style={styles.foodCardContainer}>
        <Gap width={24} />
        <FlatList data={newFoodItemsList} renderItem={renderItem} refreshing={true} horizontal={true}/>
      </View>
      <View style={styles.tabContainer}>
        <HomeTabSection />
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  page: {flex: 1},
  foodCardContainer: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  tabContainer: {flex: 1},
});
