import React, { Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();
import Splash from './screens/Splash';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import ContactDetail from './screens/ContactDetail';
import ChatDetail from './screens/ChatDetail';

const Navigation = () => {
    return (
      <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
          <Fragment>
            <Screen name="Splash" component={Splash} />
            <Screen name="Register" component={Register} />
            <Screen name="Login" component={Login} />
            <Screen name="Dashboard" component={Dashboard} />
            <Screen name="ContactDetail" component={ContactDetail} />
            <Screen name="ChatDetail" component={ChatDetail} />
          </Fragment>
        </Navigator>
      </NavigationContainer>
    );
};

export default Navigation;
