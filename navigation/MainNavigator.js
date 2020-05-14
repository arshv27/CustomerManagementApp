import React from 'react';
import { Platform, SafeAreaView, Button, View} from 'react-native'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator,DrawerNavigatorItems} from 'react-navigation-drawer'
import { useDispatch } from 'react-redux';

import * as Permissions from 'expo-permissions';

import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import DutyScreen from '../screens/DutyScreen'
import StartupScreen from "../screens/StartupScreen";
import SetupProfileScreen from "../screens/SetupProfileScreen";
import MapScreen from "../screens/MapScreen";
import Home from '../screens/Home';
import location from '../screens/location';
import FeedbackScreen from "../screens/FeedbackScreen";

import CreateTask from '../screens/CreateTask';

import * as authActions from '../store/actions/auth';
import Colors from "../constants/Colors";
import AttendanceNavigator from "./Attendance/AttendanceNavigator";

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const LocationStack = createStackNavigator(
    {Location : location},
    {
       defaultNavigationOptions: defaultNavOptions 
    }
);

const HomeStack = createStackNavigator(
    {Home : HomeScreen},
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

const ProfileStack = createStackNavigator(
    {Profile : ProfileScreen,
                   SetupProfile : SetupProfileScreen
    },
    {navigationOptions : defaultNavOptions}
);

const DutyStack = createStackNavigator(
    {Duty : DutyScreen,
                    Map : MapScreen
    },
    {navigationOptions : defaultNavOptions}
);

const CalendarStack = createStackNavigator(
  {
    Home: Home,
    CreateTask: CreateTask,
  },
  {
    navigationOptions : defaultNavOptions,
  }
);

const FeedbackStack = createStackNavigator(
    {Feedback : FeedbackScreen},
    {
        defaultNavigationOptions: defaultNavOptions
    }
);


const MainDrawerNavigator = createDrawerNavigator(
    {
            Home : {
              screen: HomeStack,
              navigationOptions:{
                drawerLabel: 'Home '
              }
            },
            Location : {
                screen: LocationStack,
                navigationOptions:{
                    drawerLabel: 'Location'
                }
            },
            Profile : {
              screen: ProfileStack,
              navigationOptions:{
                drawerLabel: 'Profile '
              }
            },
            Attendance : {
                screen: AttendanceNavigator,
                navigationOptions:{
                    drawerLabel: 'Attendance '
                }
            },
            Duty : {
                screen: DutyStack,
                navigationOptions:{
                    drawerLabel: 'Duty Mode'
                }
            },
            Calendar : {
                screen: CalendarStack,
                navigationOptions:{
                    drawerLabel: 'Calendar '
                }
            },
            Feedback : {
                screen: FeedbackStack,
                navigationOptions:{
                    drawerLabel: 'Feedback '
                }
        },

        },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        },
        contentComponent: props => {
            const dispatch = useDispatch();
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerNavigatorItems {...props} />
                        <View style = {{
                            alignItems: 'center',
                        }}>
                            <Button
                                title="Logout "
                                color={Colors.primary}
                                onPress={() => {
                                    dispatch(authActions.logout());
                                    // props.navigation.navigate('Auth');
                                }}
                            />
                        </View>
                    </SafeAreaView>
                </View>
            );
        }
    }
    );

const AuthNavigator = createStackNavigator(
    {
        Auth : LoginScreen
    },
    {defaultNavigationOptions : defaultNavOptions}
);

const MainNavigator = createSwitchNavigator({
    Startup : StartupScreen,
    Auth : AuthNavigator,
    MainApp : MainDrawerNavigator
});

export default  createAppContainer(MainNavigator);
