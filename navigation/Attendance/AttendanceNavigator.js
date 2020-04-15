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

const AttendanceStack = createStackNavigator(
    {Attendance : AttendanceScreen},
    {navigationOptions : defaultNavOptions}
);

const MarkStack = createStackNavigator(
    {Duty : MarkScreen},
    {navigationOptions : defaultNavOptions}
);

const LeaveStack = createStackNavigator(
    {Duty : LeaveScreen},
    {navigationOptions : defaultNavOptions}
);

const StatusStack = createStackNavigator(
    {Duty : StatusScreen},
    {navigationOptions : defaultNavOptions}
);

const AttendanceNavigator = createStackNavigator({
    Attendance : AttendanceStack,
    Mark: MarkStack,
    Leave: LeaveStack,
    Status: StatusStack,
});

export default createAppContainer(AttendanceNavigator);