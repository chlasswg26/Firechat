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
import firebase from 'firebase';
import '../config/Firebase';

const Header = props => (
  <View {...props}>
    <Text category="h6">Register</Text>
    <Text category="s1">Free for all!</Text>
  </View>
);

const Register = ({navigation: {replace}}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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

  const onSignupWithEmailPassword = async () => {
    if (password.length < 4) {
      setVisible(true);
      setErrorMessage('Password harus memiliki minimal 4 karakter');
    } else if (name.length < 6) {
      setVisible(true);
      setErrorMessage('Nama harus memiliki minimal 6 karakter');
    } else {
      await firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async ({ user }) => {
          let refUser = firebase.auth().currentUser;
          refUser.updateProfile({
            displayName: name,
            photoURL: 'https://ui-avatars.com/api/?name=' + name,
          });
        await firebase
            .database()
            .ref('user/' + user.uid)
            .set({
              name: name,
              image: 'https://ui-avatars.com/api/?name=' + name,
            });
        replace('Login');
        })
        .catch(error => {
          setVisible(true);
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <Fragment>
      <SafeAreaView>
        <Layout style={styles.topContainer}>
          <Card style={styles.card} header={Header}>
            <Input
              value={name}
              label="Name"
              placeholder="Input name"
              onChangeText={nextValue => setName(nextValue)}
            />
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
              onPress={() => onSignupWithEmailPassword()}>
              Submit
            </Button>
            <Button style={styles.text} onPress={() => replace('Login')}>
              Sudah punya akun? ayo login!
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

export default Register;
