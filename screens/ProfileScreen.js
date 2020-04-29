import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import Colors from "../constants/Colors";

import { useSelector, useDispatch } from 'react-redux';
import * as profileActions from '../store/actions/profile';
import Card from "../components/UI/Card";
import {LinearGradient} from "expo-linear-gradient";

const ProfileScreen = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const firstName = useSelector(state => state.profile.firstName);
  const lastName = useSelector(state => state.profile.lastName);
  const employeeID = useSelector(state => state.profile.employeeID);
  const tripCount = useSelector(state => state.profile.tripCount);


  const dispatch = useDispatch();

  const loadProfile = useCallback(async () =>{
    setError(null);
    setIsRefreshing(true);
    try{
        await dispatch(profileActions.fetchProfile());
    }
    catch(err){
      setError(err.message);
    }
    setIsRefreshing(false);
  },[dispatch,setIsLoading, setError]);

  useEffect(() =>{
    const willFocusSub = props.navigation.addListener(
        'willFocus',
        loadProfile
    );

    return() =>{
      willFocusSub.remove();
    };
  },[loadProfile]);

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

  if(!isLoading && firstName == null){
    return(
        <View style = {styles.myStyle} >
          <Text> You are yet to add Profile information! </Text>
          <Button title = "Setup Profile"
                  onPress = {() => props.navigation.navigate('SetupProfile')}
                  color = {Colors.primary}
          />
        </View>
    )
  }

  return(
      <View style = {styles.screen}>
          <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
              <Card style = {styles.cardStyle}>
              <Text style = {styles.txtstyle}> First Name : {firstName} </Text>
              <Text style = {styles.txtstyle}> Last Name : {lastName} </Text>
              <Text style = {styles.txtstyle}> Employee ID : {employeeID} </Text>
              <Text style = {styles.txtstyle}> Trip Count : {tripCount} </Text>
              <Button title = "Edit Profile"
                      onPress = {() => props.navigation.navigate('SetupProfile')}
                      color = {Colors.primary}
              />
              </Card>

          </LinearGradient>
      </View>
  )
};

ProfileScreen.navigationOptions = navData => {
  return {
    headerTitle : 'Profile',
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
  },
  myStyle: {
   flex : 1,
   justifyContent : 'center',
   alignItems : 'center'
  },
  txtstyle : {
      fontSize: 20,
      paddingVertical: 10
  },
  cardStyle : {
      width : '80%',
      justifyContent: 'center',
      alignItems: 'center',
  },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default ProfileScreen;
