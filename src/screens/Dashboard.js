import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Icon,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
  Tab,
  TabBar,
  Avatar,
  Layout,
} from '@ui-kitten/components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import User from '../config/Userdata';
import firebase from 'firebase';
import { SITE_TITLE } from 'react-native-dotenv';
import Map from '../components/Map';
import Contact from '../components/Contact';

console.disableYellowBox = true;

const {Navigator, Screen} = createMaterialTopTabNavigator();

const Dashboard = ({navigation}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction
      icon={() => (
        <Layout style={styles.container} level="1">
          <Avatar style={styles.avatar} shape="round" source={{uri: User.image}} />
        </Layout>
      )}
      onPress={toggleMenu}
    />
  );

  useEffect(() => {
      AsyncStorage.getItem('uid', (error, result) => {
        let refDatabase = firebase.database().ref('user/' + result);
        refDatabase.ref.once('value').then(snapshot => {
          const name = snapshot.child('name').val();
          const image = snapshot.child('image').val();
          User.name = name;
          User.image = image;
        });
        refDatabase.update({
          status: 'Online',
        });
      });
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title={SITE_TITLE}
        subtitle="Homepage"
        accessoryRight={() => (
          <OverflowMenu
            anchor={renderMenuAction}
            visible={menuVisible}
            onBackdropPress={toggleMenu}>
            <MenuItem
              onPress={() => {
                AsyncStorage.getItem('uid', (error, result) => {
                  if (result) {
                      Object.keys(User).forEach(index => {
                        User[index] = null;
                      });
                      firebase
                        .database()
                        .ref('user/' + result)
                        .update({
                          status: 'Offline',
                        });
                      AsyncStorage.clear();
                      navigation.replace('Login');
                  } else {
                    console.log(error);
                  }
                });
              }}
              accessoryLeft={props => <Icon {...props} name="log-out" />}
              title="Logout"
            />
          </OverflowMenu>
        )}
      />
      <Navigator
        screenOptions={{headerShown: false}}
        tabBar={({state}) => (
          <TabBar
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}>
            <Tab icon={props => <Icon {...props} name="map" />} title="MAP" />
            <Tab
              icon={props => <Icon {...props} name="people" />}
              title="CONTACT"
            />
          </TabBar>
        )}>
        <Screen name="Map" component={Map} />
        <Screen name="Contact" component={Contact} />
      </Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  avatar: {
    margin: 8,
  },
});

export default Dashboard;
