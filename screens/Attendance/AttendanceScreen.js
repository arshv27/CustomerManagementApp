import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';

import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as profileActions from "../../store/actions/profile";
import {useDispatch, useSelector} from "react-redux";
import {LinearGradient} from "expo-linear-gradient";

const AttendanceScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const firstName = useSelector(state => state.profile.firstName);

    const loadProfile = useCallback(async () =>{
        setError(null);
        try{
            await dispatch(profileActions.fetchProfile());
        }
        catch(err){
            setError(err.message);
        }
    },[dispatch,setIsLoading, setError]);

    useEffect(() => {
        setIsLoading(true);
        loadProfile().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProfile]);

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button
                    title="Try again"
                    onPress={loadProfile}
                    color={Colors.primary}
                />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }


    return(
        <View style = {styles.screen} >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Text style = {{fontSize : 25, fontWeight : 'bold',marginBottom : 125,marginTop: 50}}> Welcome, {firstName}! </Text>
                <Card style = {styles.cardStyle}>
                    <Button
                        title = "Mark Attendance"
                        onPress= {() => {props.navigation.navigate('Mark' )}}
                        color = {Colors.primary}
                    />
                    <Button
                        title = "Apply for Leave"
                        onPress= {() => {props.navigation.navigate('Leave')}}
                        color = {Colors.primary}
                    />
                    <Button
                        title = "Colleague Leave Status"
                        onPress= {() => {props.navigation.navigate('Status' )}}
                        color = {Colors.primary}
                    />
                </Card>
            </LinearGradient>
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
    },
    cardStyle : {
        width : '70%',
        height : '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        alignItems: 'center'
    },
});

export default AttendanceScreen;
