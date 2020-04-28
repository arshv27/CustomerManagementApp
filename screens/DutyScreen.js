import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Colors from "../constants/Colors";
import Card from "../components/UI/Card";
import {LinearGradient} from "expo-linear-gradient";

const DutyScreen = props => {


  return(
    <View style = {styles.screen} >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style = {styles.cardStyle}>
          <Button title = {"Start Trip"}
                  onPress = {() => {alert("Under construction!")}}
                  color = {Colors.primary}
          />
          <Button title = {"Open Map"}
                  onPress = {() => {props.navigation.navigate('Map')}}
                  color = {Colors.primary}
          />
        </Card>
      </LinearGradient>
    </View>
  )
};

DutyScreen.navigationOptions = navData => {
  return {
    headerTitle : 'Duty Mode',
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
  cardStyle : {
    width : '70%',
    height : '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default DutyScreen;
