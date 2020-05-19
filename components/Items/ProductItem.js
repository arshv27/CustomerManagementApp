import React from 'react';
import { View, Text, Image, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";


const ProductItem = props => {
    return (
        <View style = {styles.product} >
                <Image source={props.image} style = {styles.image} resizeMode={'contain'} />
                <Text style = {styles.title} >Product: {props.title}</Text>
                <Text style = {styles.price} >Base Price: Rs.{props.base_price.toFixed(2)}</Text>
                <Button title = "View Details"
                        onPress = {props.onViewDetail}
                        color = {Colors.primary}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 5,
        flexDirection: 'column',
        flex: 1/2,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    image: {
        width: '95%',
        height: '60%',
    },

    title: {
        fontSize: 18,
        marginVertical: 4,
    },

    price: {
        fontSize: 14,
        color: '#888',
    },

    actions: {
        width: '100%',
    },
});

export default ProductItem;