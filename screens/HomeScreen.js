import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from "../constants/Colors";

const HomeScreen = props => {
  return(
    <View style = {styles.screen} >
      <Text> The Home Page! </Text>
    </View>
  )
};

HomeScreen.navigationOptions = navData => {
    return {
      headerTitle : 'Home',
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;
