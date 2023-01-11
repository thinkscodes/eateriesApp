import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, TextInput, Button, Gap, Select} from '../../components';
//import useForm from '../../utils/useForm';
import {useDispatch, useSelector} from 'react-redux';
//import Axios from 'axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import { onAuthStateChanged, signOut, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth';
import { auth } from '../../../firebase';

import {getFirestore} from "firebase/firestore";
import { db } from '../../../firebase';
import { ref, set, get, child, onValue, orderByChild, query, equalTo } from "firebase/database"; 

function SignUpAddress({route, navigation}) {
  const { name, email, password } = route.params;
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [dept, setDept] = useState('');
  const [type, setType] = useState('user');

  console.log(name + email + password);
  /*const [form, setForm] = useForm({
    phoneNumber: '',
    address: '',
    houseNumber: '',
    city: 'Federal Capital',
  });*/

  const dispatch = useDispatch();
  const registerReducer = useSelector(state => state.registerReducer);

  const createAccount = async () => {
    try {
      if (address!='') {
        await createUserWithEmailAndPassword(auth, email, password);
        //console.log(name);
        //await updateProfile(auth.currentUser, { displayName: name} );

        //Create User in Realtime DB
        set(ref(db, 'users/' + auth.currentUser.uid), {
          fullname: name,
          phoneNo: phone,
          addr: address,
          department: dept,
          emailaddr: email,
          usertype: type,
        });

        navigation.navigate('SuccessSignUp');

      } else {
        showMessage({message: 'Provide all fields', type: 'danger', backgroundColor: '#D9435E'});
      }
    } catch (e) {
      console.log(e)
      showMessage({message: 'There was a problem creating your account', type: 'danger', backgroundColor: '#D9435E'});
    }
  };

  /*const onSubmit = () => {
    console.log('form: ', form);
    const data = {
      ...form,
      ...registerReducer,
    };
    console.log('data Register: ', data);
    Axios.post('http://foodmarket-backend.buildwithangga.id/api/register', data)
      .then(res => {
        console.log('data success: ', res.data);
        showMessage('Register Success', 'success');
        navigation.replace('SuccessSignUp');
      })
      .catch(err => {
        // console.log('sign up error: ', err.response.data.message);
        showToast(err?.response?.data?.message, 'success');
      });
  };*/

  /*const showToast = (message, type) => {
    showMessage({
      message,
      type: type === 'success' ? 'success' : 'danger',
      backgroundColor: type === 'success' ? '#1ABC9C' : '#D9435E',
    });
  };*/

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.page}>
        <Header
          title="Address"
          subTitle="Make sure it's valid"
          onBack={() => { navigation.navigate('SignUp'); }}
        />
        <View style={styles.container}>
          <TextInput
            label="Phone Number"
            placeholder="Type your phone number"
            value={phone}
            onChangeText={setPhone}
          />
          <Gap height={16} />
          <TextInput
            label="Department Address"
            placeholder="Type your department"
            value={address}
            onChangeText={setAddress}
          />
          <Gap height={16} />
          <TextInput
            label="Floor & Room"
            placeholder="Type your floor and room"
            value={dept}
            onChangeText={setDept}
          />
          <Gap height={16} />
          <Gap height={24} />
          <Button text="Sign Up Now"  onPress={createAccount}/>
        </View>
        {/* <Text>Sign Up Page</Text> */}
      </View>
    </ScrollView>
  );
};

export default SignUpAddress;

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
