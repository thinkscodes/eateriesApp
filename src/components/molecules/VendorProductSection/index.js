import React from 'react';
import {StyleSheet, Text, View, useWindowDimensions, TouchableOpacity} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {FoodDummy1, FoodDummy2, FoodDummy3, FoodDummy4} from '../../../assets';
import ItemListFood from '../ItemListFood';
// navigasi level sub page
import {useNavigation} from '@react-navigation/native';
import ItemListMenu from '../ItemListMenu';
import { auth } from '../../../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

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

  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <TouchableOpacity onPress={() => { navigation.navigate('CreateProduct') }}><ItemListMenu text="Create Food Product"/></TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('ProductsList') }}><ItemListMenu text="Edit Food Product"/></TouchableOpacity>
    </View>
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
const VendorProductSection = () => {
  const initialLayout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Food Products'},
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

export default VendorProductSection;

const styles = StyleSheet.create({});
