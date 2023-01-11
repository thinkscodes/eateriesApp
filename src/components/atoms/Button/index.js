import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Button = ({text, color = '#FFC700', textColor = '#020202', onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container(color)}>
        <Text style={styles.text(textColor)}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: color => ({backgroundColor: color, padding: 12, borderRadius: 8}),
  text: color => ({
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: color,
    textAlign: 'center',
  }),
});
