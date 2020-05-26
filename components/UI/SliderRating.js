import React, {useState} from 'react';
import {Slider, Text, StyleSheet, View, TextInput} from 'react-native';

const SliderRating = (props) => {
    return (
        <View style={{alignItems: 'center', width: '90%'}}>
            <Text>
                Rate your experience!
            </Text>
            <Slider
                step={1}
                style={{width: '90%'}}
                minimumValue={0}
                maximumValue={100}
                value={props.rating}
                onValueChange={props.setRating}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#b9e4c9"
            />
            <Text style={{fontSize: 20}}>
                Rating: {props.rating}%
            </Text>
        </View>
    );
};

export default SliderRating;