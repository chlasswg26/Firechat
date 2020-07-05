import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Button, List, ListItem, Avatar } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import User from '../config/Userdata';
import firebase from 'firebase';

class ItemList extends Component {
  render() {
    return (
      <ListItem
        title={this.props.item.name}
        description={this.props.item.status}
        accessoryLeft={(props) => (
          <Avatar
            {...props}
            style={[this.props.style, {tintColor: null}]}
            source={{uri: this.props.item.image}}
          />
        )}
        accessoryRight={() => (
          <Button
            size="tiny"
            onPress={() => {
              this.props.navigation.navigate(
                'ContactDetail',
                this.props.item,
              );
            }}>
            View Contact
          </Button>
        )}
      />
    );
  }
}

class Contact extends Component {
  state = {
    user: [],
  }
  async componentDidMount() {
      await AsyncStorage.getItem('uid', (error, result) => {
            if (result) {
              let refDatabase = firebase.database().ref('user');
              refDatabase.on('child_added', val => {
                  const person = val.val();
                  person.uid = val.key;
                  if (person.uid === result) {
                    User.name = person.name;
                    User.image = person.image
                      ? person.image
                      : 'https://ui-avatars.com/api/?name=-';
                  } else {
                    this.setState(prevState => {
                      return {
                        user: [...prevState.user, person],
                      };
                    });
                  }
                });
            }
          });
  }

  render() {
    return (
      <List
        data={this.state.user}
        numColumns={1}
        renderItem={({item, index}) => {
          return (
            <ItemList
              navigation={this.props.navigation}
              item={item}
              index={index}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 592,
  },
});

export default Contact;
