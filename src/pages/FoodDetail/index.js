import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FoodDummy6, IcBackWhite} from '../../assets';
import {Rating, Button, Counter} from '../../components';

const FoodDetail = ({route, navigation}) => {
  const { item } = route.params;
  const [counted, setCounted] = useState(1);
  const [bdisabled, setbdisabled] = useState(false);
  //console.log(item);

  const addToCart = function() {
    navigation.navigate('OrderSummary', {item, counted});
  }

  /*const changeDisable = function() {
    if (counted == 0) {
      setbdisabled(true);
    }
    else {
      setbdisabled(false);
    }
    console.log(bdisabled);
  }*/

  /*useEffect(() => { changeDisable() }, [counted])*/

  return (
    <View style={styles.page}>
      <ImageBackground source={{uri: item.image}} style={styles.cover}>
        <TouchableOpacity style={styles.back} onPress={() => {navigation.goBack()}}>
          <IcBackWhite />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.productContainer}>
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Rating />
            </View>
            <Counter value={counted} change={setCounted}/>
          </View>
          <Text style={styles.desc}>
            {item.detail}
          </Text>
          <Text style={styles.label}>Ingredients:</Text>
          <Text style={styles.desc}>{item.ingredients}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.labelTotal}>Unit Price:</Text>
            <Text style={styles.priceTotal}>PKR {item.price} x {counted}</Text>
          </View>
          <View style={styles.button}>
            <Button
              disabled={ bdisabled }
              text="Order Now"
              onPress={() => addToCart()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodDetail;

const styles = StyleSheet.create({
  page: {flex: 1},
  cover: {height: 330, paddingTop: 26, paddingLeft: 22},
  text: {color: 'black'},
  back: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingTop: 26,
    paddingHorizontal: 16,
    flex: 1,
  },
  mainContent: {flex: 1},
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {fontSize: 16, fontFamily: 'Poppins-Regular', color: '#020202'},
  desc: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 4,
  },
  footer: {flexDirection: 'row', paddingVertical: 16, alignItems: 'center'},
  priceContainer: {flex: 1},
  labelTotal: {fontSize: 13, fontFamily: 'Poppins-Regular', color: '#8D92A3'},
  priceTotal: {fontSize: 18, fontFamily: 'Poppins-Regular', color: '#020202'},
  button: {width: 163},
});
