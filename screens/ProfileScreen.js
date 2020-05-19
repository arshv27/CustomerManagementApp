import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from "../constants/Colors";

import { useSelector } from 'react-redux';
import Card from "../components/UI/Card";
import {LinearGradient} from "expo-linear-gradient";

const ProfileScreen = props => {

  const firstName = useSelector(state => state.profile.firstName);
  const lastName = useSelector(state => state.profile.lastName);
  const employeeID = useSelector(state => state.profile.employeeID);
  const tripCount = useSelector(state => state.profile.tripCount);


  if(firstName == null){
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
      height: '60%',
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
