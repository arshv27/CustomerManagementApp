import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from "../../constants/Colors";

const LeaveScreen = props => {
    return(
        <View style = {styles.screen} >
            <Text> Apply for Leave Here! </Text>
        </View>
    )
};

LeaveScreen.navigationOptions = () => {
    return {
        headerTitle : 'Apply for Leave',
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

export default LeaveScreen;
