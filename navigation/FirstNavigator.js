import React from 'react';
import {Button,Text} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'

import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import DutyScreen from '../screens/DutyScreen'

const MainDrawerNavigator = createDrawerNavigator({
    Home : {
      screen: HomeScreen,
      navigationOptions:{
        drawerLabel: 'Home '
      }
    },
    Profile : {
      screen: ProfileScreen,
      navigationOptions:{
        drawerLabel: 'Profile '
      }
    },
    Duty : {
      screen: DutyScreen,
      navigationOptions:{
        drawerLabel: 'Duty Mode'
      }
    }
},
{
  drawerBackgroundColor : 'white',
  navigationOptions: ({ navigation }) =>({
    headerLeft : <Button title = "Menu" onPress = {() => {
        navigation.toggleDrawer();
      }
    }/>
  })
})

const MainNavigator = createStackNavigator({
  Login : LoginScreen,
  MainApp : MainDrawerNavigator
});

export default  createAppContainer(MainNavigator);
