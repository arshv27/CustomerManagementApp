import React, {useState} from 'react';
import {Slider, Text, StyleSheet, View, TextInput} from 'react-native';

const SliderRating = () => {
    const [value, setValue] = useState(0);
    return (
        <View>
            <Text>
                Rate your experience!
            </Text>
            <Slider
                step={1}
                minimumValue={0}
                maximumValue={100}
                value={value}
                onValueChange={slideValue => setValue(slideValue)}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#b9e4c9"
            />
            <Text>
                Rating: {value}%
            </Text>

        </View>
    );
};

export default SliderRating;