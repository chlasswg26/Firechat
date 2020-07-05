import React, { Fragment } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Avatar,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const ContactDetail = ({navigation, route}) => {
    const renderSingleAction = () => (
      <Fragment>
        <TopNavigationAction
          onPress={() =>
            navigation.navigate('ChatDetail', route.params)
          }
          icon={props => <Icon {...props} name="message-square" />}
        />
      </Fragment>
    );

    const renderTitle = (props) => (
      <View style={styles.titleContainer}>
        <Avatar style={styles.logo} source={{uri: route.params.image}} />
        <Text {...props}>{route.params.name}</Text>
      </View>
    );

    return (
      <Fragment>
        <TopNavigation
          title={renderTitle}
          accessoryRight={renderSingleAction}
        />
      <View style={styles.container}>
          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              showsUserLocation={true}
              showsMyLocationButton={false}
              zoomEnabled={true}
              region={{
                latitude: route.params.latitude,
                longitude: route.params.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              <Marker
                coordinate={{
                  latitude: route.params.latitude,
                  longitude: route.params.longitude,
                }}
                title={route.params.name}
              />
            </MapView>
            </View>
        </View>
      </Fragment>
    );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 50,
  },
});

export default ContactDetail;
