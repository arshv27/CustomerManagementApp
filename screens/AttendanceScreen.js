import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from "../constants/Colors";

const AttendanceScreen = props => {
    return(
        <View style = {styles.screen} >
            <View style = {styles.prompt}>
                <Text> Welcome, USER! </Text>
                <Text> Mark your attendance here! </Text>
            </View>
            <View style = {styles.buttonContainer}>
                <View style = {styles.buttons}>
                    <Button title = "Apply for Leave" />
                </View>
                <View style = {styles.buttons}>
                    <Button title = "Mark Attendance" />
                </View>
            </View>
            <View style = {styles.prompt2}>
                <Text> Show Status for "Current Date"</Text>
            </View>
            <View style = {styles.buttonContainer}>
                <View style = {styles.buttons}>
                    <Button title = "Show Status" />
                </View>
            </View>
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
    prompt: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    prompt2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
        borderColor: 'black',
    },

    menuButton: {
        padding: 2,
    },
    buttonContainer: {
        flex: 3,
        width: '70%',
        height: 10,
    },
    buttons: {
        margin: 10,
    },
});

export default AttendanceScreen;
