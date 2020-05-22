import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 8,
        backgroundColor: 'white'
    }
});

export default Card;
