import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from "../constants/Colors";

const AttendanceScreen = props => {
    return(
        <View style = {styles.screen} >
            <Text> Mark your attendance here! </Text>
        </View>
    )
};

AttendanceScreen.navigationOptions = navData => {
    return {
        headerTitle : 'Attendance',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerLeft : () => (
            <View style = {styles.menuButton}>
                <Button title = "Menu"
                        color = {Colors.primary}
                        onPress = {() => navData.navigation.toggleDrawer()}
                />
            </View>
        ),
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuButton: {
        padding: 2
    }
});

export default AttendanceScreen;
