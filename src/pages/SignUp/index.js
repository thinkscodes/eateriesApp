import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Header, TextInput, Button, Gap} from '../../components';
import {useSelector, useDispatch} from 'react-redux';
//import useForm from '../../utils/useForm';

const SignUp = ({navigation}) => {
  /*const [form, setForm] = useForm({
    name: '',
    email: '',
    password: '',
  });*/

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // rename usedispatch
  const dispatch = useDispatch();

  /*const onSubmit = () => {
    console.log('form: ', form);
    dispatch({type: 'SET_REGISTER', value: form});
    navigation.navigate('SignUpAddress');
  };*/

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.page}>
        <Header title="Sign Up" subTitle="Register your account." onBack={() => { navigation.navigate('SignIn'); }} />
        <View style={styles.container}> 
          <TextInput
            label="Full Name"
            placeholder="Type your name"
            value={name}
            onChangeText={setName}
          />
          <Gap height={16} />
          <TextInput
            label="Email Address"
            placeholder="Type your email address"
            value={email}
            onChangeText={setEmail}
          />
          <Gap height={16} />
          <TextInput
            label="Password"
            placeholder="Type your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Gap height={24} />
          <Button text="Continue" onPress={() => navigation.navigate('SignUpAddress', {name, email, password})} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: {flex: 1},
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
  photo: {alignItems: 'center', marginTop: 26, marginBottom: 16},
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    padding: 24,
  },
  addPhoto: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center',
  },
});
