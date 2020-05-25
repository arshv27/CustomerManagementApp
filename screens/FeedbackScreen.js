import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import Colors from "../constants/Colors";
import Card from "../components/UI/Card";
import {LinearGradient} from "expo-linear-gradient";
import SliderRating from "../components/UI/SliderRating";
import ServicePicker from "../components/UI/ServicePicker";

const FeedbackScreen = props => {
    const [name, setName] = useState("");
    const [comments, setComments] = useState("");

    return(
        <View style = {styles.screen} >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style = {styles.cardStyle}>
                    <TextInput
                        placeholder= "Employee Name"
                        style={styles.textInput}
                        value={name}
                        onChangeText={name => setName(name)}
                    />
                    <View style={styles.sliderStyle}>
                        <ServicePicker />
                    </View>
                    <TextInput
                        placeholder= "Comments"
                        style={styles.textInput}
                        multiline={true}
                        numberOfLines={5}
                        value={comments}
                        onChangeText={comments => setComments(comments)}
                    />
                    <View style={styles.sliderStyle}>
                        <SliderRating />
                    </View>

                    <Button title = {"Submit Feedback"}
                            onPress = {() => {alert("Under construction!")}}
                            color = {Colors.primary}
                    />
                </Card>
            </LinearGradient>
        </View>
    )
};

FeedbackScreen.navigationOptions = navData => {
    return {
        headerTitle : 'Feedback'
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    cardStyle : {
        width : '70%',
        height : '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput : {
        height: 60,
        padding: 10,
    },
    sliderStyle: {
        height: 100,
        padding: 20,
    }
});

export default FeedbackScreen;
