import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from "../constants/Colors";

const DutyScreen = props => {
  return(
    <View style = {styles.screen} >
      <Text> It's time we tracked you!</Text>
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
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DutyScreen;
