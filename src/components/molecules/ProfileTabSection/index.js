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

const Account = () => {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("SignIn");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ItemListMenu text="Rate App" />
      <ItemListMenu text="Help Center" />
      <ItemListMenu text="Privacy & Policy" />
      <ItemListMenu text="Terms & Conditions" />
      <TouchableOpacity onPress={() => { logout() }}><ItemListMenu text="Log Out"/></TouchableOpacity>
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
const ProfileTabSection = () => {
  const initialLayout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Account'},
    /*{key: '2', title: 'Eateries'},*/
  ]);

  const renderScene = SceneMap({
    1: Account,
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

export default ProfileTabSection;

const styles = StyleSheet.create({});
