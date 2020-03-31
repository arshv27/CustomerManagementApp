import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const LoginScreen = props => {
  return(
    <View style = {styles.screen} >
      <Text> The Login Page! </Text>
      <Button title = "Login " onPress = {() => {
          props.navigation.replace('MainApp');
      }} />
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

export default LoginScreen;
