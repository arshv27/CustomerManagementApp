import React, {useState} from 'react';
import {Picker, Text, StyleSheet, View, TextInput, Button} from 'react-native';
import Modal from 'react-native-modal';
import Colors from "../../constants/Colors";
import Card from "./Card";

const ServicePicker = (props) => {
    return (
        <Modal isVisible={props.isVisible} onBackdropPress={props.close}>
            <Card style={{alignItems: 'center', padding: 10}}>
                <Text style={{fontSize: 25}}>
                    Select Service
                </Text>
                <Picker
                    style={{width: '65%'}}
                    selectedValue={props.service}
                    onValueChange={props.setService}>
                    <Picker.Item label="A" value="Service A"/>
                    <Picker.Item label="B" value="Service B"/>
                    <Picker.Item label="C" value="Service C"/>
                </Picker>
                <Button title={"Done  "}
                        onPress={props.close}
                        color={Colors.primary}
                />
            </Card>
        </Modal>
    );
};
const styles = StyleSheet.create({
    //Check project repo for styles
});

export default ServicePicker;