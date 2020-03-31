import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const HomeScreen = props => {
  return(
    <View style = {styles.screen} >
      <Text> The Home Page! </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;
