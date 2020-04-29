import React from 'react';
import { View, Text, Image, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";


const ProductItem = props => {
    return (
        <View style = {styles.product} >
            <View style = {{ width: '100%', paddingLeft: 15, paddingTop : 10}}>
                <Image source={ require('../../data/images/Precimould.png')} style = {styles.image} />
                <Text style = {styles.title} >Product: {props.title}</Text>
                <Text style = {styles.price} >Base Price: Rs.{props.base_price.toFixed(2)}</Text>
                <Button title = "View Details"
                        onPress = {() => alert("To be added soon!")}
                        color = {Colors.primary}
                />
            </View>
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
        height: 275,
        margin: 20,
        flexDirection: 'row',
        flex: 1,
        width: '80%',
        alignItems: 'flex-start',
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