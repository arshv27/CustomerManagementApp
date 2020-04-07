import React from 'react';
import {Button,Text} from 'react-native'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'


import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import DutyScreen from '../screens/DutyScreen'

import Colors from "../constants/Colors";

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const HomeStack = createStackNavigator(
    {Home : HomeScreen},
    {navigationOptions : defaultNavOptions}
);

const ProfileStack = createStackNavigator(
    {Profile : ProfileScreen},
    {navigationOptions : defaultNavOptions}
);

const DutyStack = createStackNavigator(
    {Duty : DutyScreen},
    {navigationOptions : defaultNavOptions}
);

const MainDrawerNavigator = createDrawerNavigator(
    {
            Home : {
              screen: HomeStack,
              navigationOptions:{
                drawerLabel: 'Home '
              }
            },
            Profile : {
              screen: ProfileStack,
              navigationOptions:{
                drawerLabel: 'Profile '
              }
            },
            Duty : {
              screen: DutyStack,
              navigationOptions:{
                drawerLabel: 'Duty Mode'
              }
            }
        }
    );

const AuthNavigator = createStackNavigator(
    {Auth : LoginScreen},
    {defaultNavigationOptions : defaultNavOptions}
);

const MainNavigator = createSwitchNavigator({
  Auth : AuthNavigator,
  MainApp : MainDrawerNavigator
});

export default  createAppContainer(MainNavigator);
