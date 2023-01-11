//import Axios from 'axios';
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, Header, TextInput} from '../../components';
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth';
//import useForm from '../../utils/useForm';
import { auth } from '../../../firebase';
import {showMessage, hideMessage} from 'react-native-flash-message';

const SignIn = ({navigation}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigation.navigate('MainApp');
  }
  catch (error) {
    if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
      showMessage({message: 'Your email or password was incorrect', type: 'danger', backgroundColor: '#D9435E'});
    } else if (error.code === 'auth/email-already-in-use') {
      showMessage({message: 'An account with this email already exists', type: 'danger', backgroundColor: '#D9435E'});
    } else {
      showMessage({message: 'There was a problem with your request', type: 'danger', backgroundColor: '#D9435E'});
    }
  }
  };
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  /*const [form, setForm] = useForm({
    email: '',
    password: '',
  });*/

  // const onSubmit = () => {
  //   console.log('email: ', email);
  //   console.log('password: ', password);
  // };

  /*const onSubmit = () => {
    console.log('form: ', form);
    Axios.post('http://foodmarket-backend.buildwithangga.id/api/login', form)
      .then(res => {
        console.log('success', res);
        navigation.replace('MainApp');
      })
      .catch(err => {
        console.log('error', err);
      });
  };*/

  return (
    <View style={styles.page}>
      <Header title="Sign In" subTitle="Login to place food orders. " />
      <View style={styles.container}>
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
        <Button text="Sign In" onPress={loginUser} />
        <Gap height={12} />
        <Button
          text="Need to create an account? Proceed here"
          onPress={ () => navigation.navigate('SignUp') }
        />
        <Gap height={12} />
        <Button
          text="Vendor Sign In"
          color="#8D92A3"
          textColor="white"
          onPress={ () => navigation.navigate('VendorSignIn') }
        />
        <Gap height={12} />
      </View>
      {/* <Text>Sign In Page</Text> */}
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  page: {flex: 1},
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
