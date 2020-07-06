import React, {
    Fragment,
    Component,
} from 'react';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import User from '../config/Userdata';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Divider,
} from '@ui-kitten/components';

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.route.params.email,
      name: this.props.route.params.name,
      uid: this.props.route.params.uid,
      image: this.props.route.params.image,
      text: '',
      messagesList: [],
      userName: User.name,
      avatar: User.image,
      userId: User.uid,
    };
  }
  componentDidMount() {
    try {
      AsyncStorage.getItem('uid')
      .then(values => {
        this.setState({
          userId: values,
        });
        firebase
          .database()
          .ref('messages')
          .child(this.state.uid)
          .child(values)
          .on('child_added', value => {
            this.setState(previousState => {
              return {
                messagesList: GiftedChat.append(
                  previousState.messagesList,
                  value.val()
                ),
              };
            });
          });
      });
    } catch (error) {
      console.log(error);
    }
  }
  sendMessage = () => {
    if (this.state.text.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(this.state.uid)
        .child(this.state.userId)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.text,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.userId,
          name: this.state.userName,
          avatar: this.state.avatar,
        },
      };
      updates[
        `messages/${this.state.userId}/${this.state.uid}/${msgId}`
      ] = message;
      updates[
        `messages/${this.state.uid}/${this.state.userId}/${msgId}`
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({ text: '' });
    }
  };

  render() {
    return (
      <Fragment>
        <TopNavigation
          accessoryLeft={() => (
            <TopNavigationAction
              onPress={() => this.props.navigation.goBack()}
              icon={(props) => <Icon {...props} name="arrow-back" />}
            />
          )}
          title={this.props.route.params.name}
        />
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />

        <GiftedChat
          text={this.state.text}
          messages={this.state.messagesList}
          onSend={this.sendMessage}
          user={{
            _id: this.state.userId,
            name: this.state.userName,
          }}
          onInputTextChanged={value => this.setState({ text: value })}
        />

      </Fragment>
    );
  }
}

export default ChatDetail;
