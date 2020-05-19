import React from 'react';
import {View, Text, Image, StyleSheet} from "react-native";

export default function ProductDetailsScreen(props) {
    const product = props.navigation.getParam('product');
    const image = product.imageAdd;
    delete product.imageAdd;
    const descriptorText = {
        id: "ID",
        base_price: "Base Price",
        title: "Title",
        'Clamping Force': 'Clamping Force',
        'Machine Weight': "Machine Weight",
        'Load Table': 'Load Table',
        'Rated Power': 'Rated Power'
    };
    const details = [];
    const renderHelper = (product) => {
        for (const detail in product) {
            if (product[detail] instanceof Object) {
                renderHelper(product[detail]);
                continue;
            }
            details.push(
                <View key={detail} style={styles.detail}>
                    <Text style={styles.descriptor}>{descriptorText[detail]}</Text>
                    <Text style={styles.value}>{product[detail]}</Text>
                </View>
            )
        }
    };
    renderHelper(product);

    return (
        <View>
            <Image source={image} style={styles.image} resizeMode={'center'}/>
            {details}
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'black'
    },
    descriptor: {
        fontSize: 25,
        color: '#7b7b7f'
    },
    value: {
        fontSize: 25,
    },
    detail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "90%",
        alignSelf: 'center',
        margin: 5

    }
});

