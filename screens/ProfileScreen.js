import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from "../constants/Colors";
import DutyScreen from "./DutyScreen";

const ProfileScreen = props => {
  return(
    <View style = {styles.screen} >
      <Text> The PROFILE Page! </Text>
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
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProfileScreen;
