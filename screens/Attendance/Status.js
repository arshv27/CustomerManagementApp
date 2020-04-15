import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from "../../constants/Colors";

const StatusScreen = props => {
    return(
        <View style = {styles.screen} >
            <Text> Check the Attendance Status! </Text>
        </View>
    )
};

StatusScreen.navigationOptions = navData => {
    return {
        headerTitle : 'Status',
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
        alignItems: 'center'
    }
});

export default StatusScreen;
