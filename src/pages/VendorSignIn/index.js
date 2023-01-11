//import Axios from 'axios';
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, Header, TextInput} from '../../components';
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth';
//import useForm from '../../utils/useForm';
import { auth } from '../../../firebase';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {getFirestore} from "firebase/firestore";
import { db } from '../../../firebase';
import { ref, set, get, child, onValue, orderByChild, query, equalTo } from "firebase/database"; 

const VendorSignIn = ({navigation}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    const user = await query(ref(db, 'users/'), orderByChild('emailaddr'), equalTo(auth.currentUser.email));
    onValue(user, (snapshot) => {
    const data = snapshot.val();
      if (data[auth.currentUser.uid].usertype == 'vendor') {
        console.log("Vendor");
        navigation.navigate('VendorMainApp');
      }
      else {
        signOut(auth);
        showMessage({message: 'No vendor with the given details found', type: 'danger', backgroundColor: '#D9435E'});
      }
    });
    
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
      <Header title="Vendor Sign In" subTitle="Login to manage food orders. " />
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
          text="Not a vendor? Sign In here"
          color="#8D92A3"
          textColor="white"
          onPress={ () => navigation.navigate('SignIn') }
        />
      </View>
      {/* <Text>Sign In Page</Text> */}
    </View>
  );
};

export default VendorSignIn;

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
