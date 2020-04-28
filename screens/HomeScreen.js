import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";

const HomeScreen = props => {
    const productsList = useSelector(state => state.products.availableProducts);
    return(
        <View style = {styles.screen} >

            <FlatList
                data = { productsList }
                keyExtractor = { item  => item.id }
                renderItem = {
                    itemData => <Text> { itemData.item.title } </Text>
                }
            />
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

export default HomeScreen;
