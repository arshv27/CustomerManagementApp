import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView} from 'react-native';

import Colors from "../constants/Colors";
import Card from "../components/UI/Card";
import {LinearGradient} from "expo-linear-gradient";
import SliderRating from "../components/UI/SliderRating";
import ServicePicker from "../components/UI/ServicePicker";
import Firebase from "../Firebase";
import {getUserUID} from "../utilityFunctions";

const FeedbackScreen = props => {
    const [employeeName, setName] = useState("");
    const [comments, setComments] = useState("");
    const [service, setService] = useState('Service A');
    const [pickerVisible, setPickerVisibility] = useState(false);
    const [rating, setRating] = useState(0);
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = () => {
        if (!employeeName) {
            alert("Name of Employee who served you is required")
            return
        }
        setSubmitting(true);
        let feedbackObject = {
            user: getUserUID(),
            employeeName,
            comments,
            service,
            rating
        }
        Firebase.database().ref('/feedback').push(feedbackObject, (e) => {
            if (e) {
                console.log(e);
                return
            }
            setSubmitting(false)
            clearState()
            alert("Form Submitted!")
            props.navigation.navigate('Home')
        })
    }

    const clearState = () => {
        setRating(0);
        setService('Service A');
        setName('')
        setComments('')
    }

    return (
        <KeyboardAvoidingView
            behavior={'height'}
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                    <Card style={styles.cardStyle}>
                        <TextInput
                            placeholder="Employee Name"
                            value={employeeName}
                            style={[styles.textInput, {height: 40}]}
                            onChangeText={name => setName(name)}
                        />
                        <View style={{alignItems: 'center'}}>
                            <Text>Which service would you like to give feedback for?</Text>
                            <TouchableOpacity onPress={() => setPickerVisibility(true)}>
                                <Text style={{fontSize: 20, color: Colors.primary, margin: 5}}>{service}</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            placeholder="Comments"
                            style={[styles.textInput, {height: 100}]}
                            multiline={true}
                            numberOfLines={5}
                            value={comments}
                            onChangeText={comments => setComments(comments)}
                        />

                        <SliderRating rating={rating} setRating={(rating) => setRating(rating)}/>
                        {submitting
                            ? <ActivityIndicator size="small" color={Colors.primary}/>
                            : <Button title={"Submit Feedback"}
                                      onPress={handleSubmit}
                                      color={Colors.primary}
                            />}
                        <ServicePicker service={service} close={() => setPickerVisibility(false)}
                                       isVisible={pickerVisible} setService={(service) => setService(service)}/>
                    </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
};

FeedbackScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Customer Feedback Form'
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    cardStyle: {
        width: '90%',
        height: '85%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderColor: Colors.primary,
        borderWidth: 0.5,
        width: '80%',
        borderRadius: 5,
        padding: 5
    }
});

export default FeedbackScreen;
