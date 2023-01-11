import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {ProfileDummy} from '../../../assets';

const CreateProductHeader = () => {
  return (
    <View style={styles.profileContainer}>
      <View>
        <Text style={styles.appName}>Create Product</Text>
        <Text style={styles.desc}>Create your food product below</Text>
      </View>
      <Image source={{uri: "http://pluspng.com/img-png/png-menu-restaurant-restaurant-menu-icon-1600.png"}} style={styles.profile} />
    </View>
  );
};

export default CreateProductHeader;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: 'white',
  },
  profile: {width: 50, height: 50, borderRadius: 8},
  appName: {fontSize: 22, fontFamily: 'Poppins-Medium', color: '#020202'},
  desc: {fontSize: 14, fontFamily: 'Poppins-Light', color: '#8D92A3'},
  scrool: {marginVertical: 24},
});
