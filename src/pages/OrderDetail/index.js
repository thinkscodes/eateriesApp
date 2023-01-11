import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Button, Gap, Header, ItemListFood, ItemValue} from '../../components';
import {FoodDummy6} from '../../assets';

const OrderDetail = ({route, navigation}) => {
  const { item } = route.params;
  console.log(item);
  return (
    <ScrollView>
      <Header
        title="Order Summary"
        subTitle="Details of your order"
        onBack={() => { navigation.goBack() }}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Order Summary</Text>
        <ItemListFood
          type="order-summary"
          name={item.orderitem}
          price={item.orderitemprice}
          items={item.orderitemcount}
          image={{uri: item.orderimage}}
          items={item.orderitemcount}
        />
        <Text>Details Transaction</Text>
        <ItemValue label={item.orderitem} value={item.ordertotalprice} />
        <ItemValue label="Delivery" value={item.orderdeliverycost} />
        <ItemValue label="Tax GST" value={item.ordertax} />
        <ItemValue
          label="Total Price"
          value={item.ordertotalprice}
          valueColor="#1ABC9C"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Deliver to</Text>
        <ItemValue label="Name" value={item.ordername} />
        <ItemValue label="Phone No." value={item.orderphone} />
        <ItemValue label="Department" value={item.orderdepartment} />
        <ItemValue label="Floor & Room" value={item.orderfloor} />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Order Status</Text>
        <ItemValue label={item.orderstatus} value={item.orderlabel} valueColor="#1ABC9C" />
      </View>
      <Gap height={40} />
    </ScrollView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 8,
  },
  button: {paddingHorizontal: 24, marginTop: 24},
});
