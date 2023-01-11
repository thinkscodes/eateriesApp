import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Gap, Header, ItemListFood, ItemValue} from '../../components';
import {FoodDummy6} from '../../assets';
import { db } from '../../../firebase';
import { auth } from '../../../firebase';
import { ref, set, get, child, onValue, orderByChild, query, equalTo } from "firebase/database"; 

const OrderSummary = ({route, navigation}) => {
  const { item, counted } = route.params;

  //Calculations
  const multiply = eval(item.price) * counted;
  const delivery = 80;
  const tax = 5;
  const total = multiply + delivery + tax;

  //User Info
  useEffect(() => { queryUsers(); }, [])
  const [ruser, setUser] = useState({});
  var retrieveduser = {};
  var name = "";
  var department = "";
  var floor = "";
  var phone = "";
  const queryUsers = async() => {
    const users = query(ref(db, 'users/'), orderByChild('emailaddr'), equalTo(auth.currentUser.email));
    onValue(users, (snapshot) => {
      snapshot.forEach(function(childNodes) {
        retrieveduser.name = childNodes.val().fullname;
        retrieveduser.department = childNodes.val().addr;
        retrieveduser.floor = childNodes.val().department;
        retrieveduser.phone = childNodes.val().phoneNo;   
        setUser(retrieveduser);
        //console.log(childNodes.val().addr);
      });
    });
  };
  name = ruser.name;
  department = ruser.department;
  floor = ruser.floor;
  phone = ruser.phone;   
  console.log(ruser);

  


  //Process Order
  const processOrder = function() {
    var orderid = auth.currentUser.uid + Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    set(ref(db, 'orders/' + (orderid)), {
      orderid: orderid,
      orderitem: item.name,
      orderitemcount: counted,
      orderitemprice: item.price,
      orderdeliverycost: delivery,
      ordertax: tax,
      ordertotalprice: total,
      ordername: name,
      orderdepartment: department,
      orderfloor: floor,
      orderphone: phone,
      orderstatus: "processing",
      ordertype: "",
      orderlabel: "Awaiting Dispatch",
      orderuid: auth.currentUser.uid,
      orderimage: item.image,
    });
    navigation.replace('SuccessOrder');
  }

  return (
    <ScrollView>
      <Header
        title="Order Summary"
        subTitle="Let's checkout"
        onBack={() => { navigation.navigate('FoodDetail', {item}) }}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Order Summary</Text>
        <ItemListFood
          type="order-summary"
          name={item.name}
          price={item.price}
          items={counted}
          image={{uri: item.image}}
          items={counted}
        />
        <Text>Checkout Details</Text>
        <ItemValue label="Basic Price" value={multiply} />
        <ItemValue label="Delivery" value={delivery} />
        <ItemValue label="Tax GST" value={tax} />
        <ItemValue
          label="Total Price"
          value={total}
          valueColor="#1ABC9C"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Deliver to</Text>
        <ItemValue label="Name" value={name} />
        <ItemValue label="Phone No." value={phone} />
        <ItemValue label="Department" value={department} />
        <ItemValue label="Floor & Room" value={floor} />
      </View>
      <View style={styles.button}>
        <Button
          text="Checkout Now"
          onPress={() => processOrder()}
        />
      </View>
      <Gap height={40} />
    </ScrollView>
  );
};

export default OrderSummary;

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
