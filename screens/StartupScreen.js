import React, {useEffect} from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage
} from 'react-native';

import Colors from '../constants/Colors';
import Firebase from "../Firebase";

const StartupScreen = props => {
    Firebase.auth().onAuthStateChanged((user) => {
        props.navigation.navigate(user ? 'MainApp' : 'Auth' )
    });

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;
