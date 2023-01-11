import React , {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {FoodDummy1, FoodDummy2, FoodDummy3, FoodDummy4} from '../../../assets';
import OrderItem from '../OrderItem';
import ItemListFood from '../ItemListFood';
// navigasi level sub page
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

const InProgress = () => {
  useEffect(() => { queryCurrentOrders(); }, [])

  const navigation = useNavigation();

  const [ordersList, setOrders] = useState([]);
  var listed = [];

  const queryCurrentOrders = async() => { 
      const orders = await query(ref(db, 'orders/'), orderByChild('orderuid'));
      onValue(orders, (snapshot) => {
        snapshot.forEach(function(childNodes) {
          if (childNodes.val().orderstatus == "processing") {
            console.log(childNodes.val().name);
            listed.push(childNodes.val());
            setOrders(listed);
          }
        });
      });
      //console.log(listed);
  };

  const renderItem = ({ item }) => (
    <OrderItem
      type="past-orders"
      items={item.orderitemcount}
      name={item.orderitem}
      price={item.ordertotalprice}
      image={item.orderimage}
      onPress={() => navigation.navigate('VendorOrderDetail', { item })}
    />
  );


  return (
    <FlatList data={ordersList} renderItem={renderItem} refreshing={true}/>   
  );
};

const PastOrders = () => {
  useEffect(() => { queryCurrentOrders(); }, [])

  const navigation = useNavigation();

  const [ordersList, setOrders] = useState([]);
  var listed = [];

  const queryCurrentOrders = async() => { 
      const orders = await query(ref(db, 'orders/'), orderByChild('orderuid'));
      onValue(orders, (snapshot) => {
        snapshot.forEach(function(childNodes) {
          if (childNodes.val().orderstatus == "processed") {
            console.log(childNodes.val().name);
            listed.push(childNodes.val());
            setOrders(listed);
          }
        });
      });
      //console.log(listed);
  };

  const renderItem = ({ item }) => (
    <OrderItem
      type="past-orders"
      items={item.orderitemcount}
      name={item.orderitem}
      price={item.ordertotalprice}
      image={item.orderimage}
      onPress={() => navigation.navigate('OrderDetail', { item })}
    />
  );


  return (
    <FlatList data={ordersList} renderItem={renderItem} refreshing={true}/>   
  );
};

const VendorOrdersTabSection = () => {
  const initialLayout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'In Progress'},
    {key: '2', title: 'Past Orders'},
  ]);

  const renderScene = SceneMap({
    1: InProgress,
    2: PastOrders,
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

export default VendorOrdersTabSection;

const styles = StyleSheet.create({});
