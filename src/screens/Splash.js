import React from 'react';
import {PermissionsAndroid, View, Text, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import User from '../config/Userdata';
import {SITE_TITLE} from 'react-native-dotenv';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Info!',
        message: 'Jika kamu ingin membagikan lokasi silahkan klik izinkan.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

const Splash = ({navigation: {replace}}) => {
  React.useEffect(() => {requestLocationPermission();}, []);
  AsyncStorage.getItem('uid', (error, result) => {
    if (error) {
      console.warn('Pesan gagal mendapatkan data dari storage: ', error);
      replace('AuthScreen');
    } else {
      if (result !== null) {
        User.uid = result;
        console.info('Pesan berhasil mendapatkan data dari storage: ', result);
        replace('Dashboard');
      } else {
        console.warn('Data user id dari penyimpanan kosong.');
        replace('Login');
      }
    }
  });

  return (
    <View style={styles.viewStyles}>
      <StatusBar hidden={true} showHideTransition="slide" />
      <Text style={styles.textStyles}>🔥 {SITE_TITLE} 🔥</Text>
    </View>
  );
};

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'none',
  },
  textStyles: {
    color: 'crimson',
    fontSize: 40,
    fontWeight: 'bold',
  },
};

export default Splash;
