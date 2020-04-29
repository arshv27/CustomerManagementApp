import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import ProductItem from "../components/Items/ProductItem";

const HomeScreen = props => {
    const productsList = useSelector(state => state.products.availableProducts);
    return(
        <View style = {styles.screen} >
            <View style = {styles.title}>
                <Text style = {{fontSize : 20}}>LIST OF PRODUCTS</Text>
            </View>

            <FlatList
                data = { productsList }
                keyExtractor = { item  => item.id }
                renderItem = {
                    itemData => (
                        <ProductItem
                            image = {itemData.item.imageAdd}
                            title = { itemData.item.title}
                            base_price = { itemData.item.base_price}
                            onViewDetail = {
                                () => {}
                            }
                        />
                    )
                }
            />
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
      alignItems: 'center',
      width: '100%',
      paddingLeft : 30
  },

  title: {
      margin: 20,
  }
});

export default HomeScreen;
