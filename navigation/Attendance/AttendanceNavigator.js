import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import AttendanceScreen from "../../screens/Attendance/AttendanceScreen";
import MarkScreen from "../../screens/Attendance/Mark";
import LeaveScreen from "../../screens/Attendance/Leave";
import StatusScreen from "../../screens/Attendance/Status";
import {Platform} from "react-native";
import Colors from "../../constants/Colors";

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};


const AttendanceNavigator = createStackNavigator({
    Attendance : {
        screen: AttendanceScreen,
        navigationOptions: defaultNavOptions,
    },
    Mark: {
        screen: MarkScreen,
        navigationOptions: defaultNavOptions,
    },
    Leave: {
        screen: LeaveScreen,
        navigationOptions: defaultNavOptions,
    },
    Status: {
        screen: StatusScreen,
        navigationOptions: defaultNavOptions,
    },
});

export default createAppContainer(AttendanceNavigator);