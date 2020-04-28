import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from "../../constants/Colors";

const MarkScreen = props => {
    return(
        <View style = {styles.screen} >
            <Button title = "Check in"
                onPress = {() => {alert("Attendance marked successfully")}}
            />
            <Text> You are 539 metres away from office! </Text>
        </View>
    )
};

MarkScreen.navigationOptions = navData => {
    return {
        headerTitle : 'Mark Attendance',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical : 15
    }
});

export default MarkScreen;
