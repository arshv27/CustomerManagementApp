import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const DutyScreen = props => {
  return(
    <View style = {styles.screen} >
      <Text> It's time we tracked you!</Text>
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

export default DutyScreen;
