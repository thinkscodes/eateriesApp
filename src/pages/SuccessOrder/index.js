import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IlSuccessOrder} from '../../assets';
import {Button, Gap} from '../../components';

const SuccessOrder = ({navigation}) => {
  return (
    <View style={styles.page}>
      <IlSuccessOrder />
      <Gap height={30} />
      <Text style={styles.title}>Your order has been placed</Text>
      <Gap height={6} />
      <Text style={styles.subTitle}>Just stay there while we are</Text>
      <Text style={styles.subTitle}>preparing your food.</Text>
      <Gap height={30} />
      <View style={styles.buttonContainer}>
        <Button
          text="Order More Food"
          onPress={() => navigation.replace('MainApp')}
        />
      </View>
      <Gap height={12} />
      <View style={styles.buttonContainer}>
        <Button
          text="View My Orders"
          onPress={() => navigation.replace('MainApp', {screen: 'Order'})}
          color="#8D92A3"
          textColor="white"
        />
      </View>
    </View>
  );
};

export default SuccessOrder;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {fontSize: 20, fontFamily: 'Poppins-Regular', color: '#020202'},
  subTitle: {fontSize: 14, fontFamily: 'Poppins-Light', color: '#8D92A3'},
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 80,
  },
});
