import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from "../constants/Colors";

const MarkScreen = props => {
    return(
        <View style = {styles.screen} >
            <Text> Mark your Attendance Here! </Text>
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
        headerLeft : () => (
            <Button title = "Menu"
                    color = {Colors.primary}
                    onPress = {() => navData.navigation.toggleDrawer()}
            />
        ),
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MarkScreen;
