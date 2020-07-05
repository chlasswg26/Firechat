import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Layout,
  Icon,
  Input,
  Button,
  Card,
  Modal,
  Text,
  Divider,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import '../config/Firebase';

const Header = props => (
  <View {...props}>
    <Text category="h6">Login</Text>
    <Text category="s1">Please login first!</Text>
  </View>
);

const Login = ({navigation: {replace}}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const onSigninWithEmailPassword = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async result => {

        await AsyncStorage.setItem('uid', result.user.uid);
        await AsyncStorage.getItem('uid', (error, response) => {
          if (error) {
          } else {
            setEmail('');
            setPassword('');
            replace('Dashboard');
          }
        });
      })
      .catch(error => {
        console.warn(error);
        setVisible(true);
        setErrorMessage(error.message);
      });
  };

  return (
    <Fragment>
      <SafeAreaView>
        <Layout style={styles.topContainer}>
          <Card style={styles.card} header={Header}>
            <Input
              value={email}
              label="Email"
              placeholder="Input email"
              keyboardType="email-address"
              onChangeText={nextValue => setEmail(nextValue)}
            />
            <Input
              value={password}
              label="Password"
              placeholder="Input password"
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={nextValue => setPassword(nextValue)}
            />
            <Divider style={{marginTop: 30}} />
            <Button
              style={styles.button}
              appearance="outline"
              onPress={() => onSigninWithEmailPassword()}>
              Submit
            </Button>
            <Button
              style={styles.text}
              onPress={() => replace('Register')}>
              Belum punya akun? daftar gratis!
            </Button>
          </Card>
          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <Card disabled={true}>
              <Text style={{marginBottom: 10}}>{errorMessage}</Text>
              <Button onPress={() => setVisible(false)}>DISMISS</Button>
            </Card>
          </Modal>
        </Layout>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    margin: 0,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    marginTop: 30,
    marginBottom: 10,
    paddingLeft: 0,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  text: {
    marginTop: 10,
  },
});

export default Login;
