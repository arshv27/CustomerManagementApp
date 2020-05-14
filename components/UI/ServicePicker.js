import React, {useState} from 'react';
import {Picker, Text, StyleSheet, View, TextInput, Button} from 'react-native';

const ServicePicker = () => {
    const [service, setService] = useState('Service A');
    return (
        <View >
            <Picker
                selectedValue={service}
                onValueChange={currentService => setService(currentService)}>
                <Picker.Item label="A" value="Service A" />
                <Picker.Item label="B" value="Service B" />
                <Picker.Item label="C" value="Service C" />
            </Picker>
            <Text>
                Selected: {service}
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    //Check project repo for styles
});

export default ServicePicker;