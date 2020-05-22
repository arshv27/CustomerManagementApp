import React from 'react';
import {Platform, SafeAreaView, Button, View, TouchableOpacity} from 'react-native'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer'
import {useDispatch} from 'react-redux';

import * as Permissions from 'expo-permissions';

import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import DutyScreen from '../screens/DutyScreen'
import StartupScreen from "../screens/StartupScreen";
import SetupProfileScreen from "../screens/SetupProfileScreen";
import MapScreen from "../screens/MapScreen";
import Home from '../screens/Home';

import CreateTask from '../screens/CreateTask';

import Colors from "../constants/Colors";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import DataLoadingScreen from "../screens/DataLoadingScreen";
import {Ionicons} from "@expo/vector-icons";
import AttendanceScreen from "../screens/Attendance/AttendanceScreen";
import LeaveScreen from "../screens/Attendance/Leave";
import StatusScreen from "../screens/Attendance/Status";
import FeedbackScreen from "../screens/FeedbackScreen";
import Firebase from "../Firebase";
import TripHistoryScreen from "../screens/TripHistoryScreen";
import {signOut} from "../store/actions/profile";

export const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

export const drawerMenu = navData => {
    return {
        headerLeft: () => (
            <TouchableOpacity onPress={() => navData.navigation.toggleDrawer()}>
                <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                    size={30}
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    style={{marginLeft: 15}}
                />
            </TouchableOpacity>
        ),
    }
};

const HomeStack = createStackNavigator(
    {
        DataLoading: DataLoadingScreen,
        Home: {
            screen: HomeScreen,
            navigationOptions: navData => drawerMenu(navData)
        },
        ProductDetails: ProductDetailsScreen,
        Profile: ProfileScreen,
        SetupProfile: SetupProfileScreen
    },
    {
        defaultNavigationOptions: {
            ...defaultNavOptions,
            headerMode: 'screen'
        }
    }
);

const DutyStack = createStackNavigator(
    {
        Duty: {
            screen: DutyScreen,
            navigationOptions: navData => drawerMenu(navData)
        },
        Map: MapScreen,
        Trips: TripHistoryScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

const CalendarStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: navData => drawerMenu(navData)
        },
        CreateTask: CreateTask,
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
);
const FeedbackStack = createStackNavigator(
    {
        Feedback: {
            screen: FeedbackScreen,
            navigationOptions: navData => drawerMenu(navData)
        }
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

const AttendanceNavigator = createStackNavigator({
    Attendance: {
        screen: AttendanceScreen,
        navigationOptions: navData => drawerMenu(navData)
    },
    Leave: LeaveScreen,
    Status: StatusScreen,
}, {
    defaultNavigationOptions: defaultNavOptions
});


const MainDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                drawerLabel: 'Home '
            }
        },
        Attendance: {
            screen: AttendanceNavigator,
            navigationOptions: {
                drawerLabel: 'Attendance  '
            }
        },
        Duty: {
            screen: DutyStack,
            navigationOptions: {
                drawerLabel: 'Duty Mode'
            }
        },
        Calendar: {
            screen: CalendarStack,
            navigationOptions: {
                drawerLabel: 'Calendar  '
            }
        },
        Feedback: {
            screen: FeedbackStack,
            navigationOptions: {
                drawerLabel: 'Feedback  '
            }
        },

    },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        },
        defaultNavigationOptions: {
            drawerLockMode: 'locked-open',
        },
        initialRouteName: 'Home',
        contentComponent: props => {
            const dispatch = useDispatch();

            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                        <DrawerNavigatorItems {...props} />
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <Button
                                title="Logout "
                                color={Colors.primary}
                                onPress={async () => {
                                    await dispatch(signOut());
                                    props.navigation.navigate('Auth');
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
        Auth: LoginScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    MainApp: MainDrawerNavigator
});


export default createAppContainer(MainNavigator);
