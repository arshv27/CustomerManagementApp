import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Colors from "../../constants/Colors";
import Card from "../../components/UI/Card";

import DateTimePicker from '@react-native-community/datetimepicker';
import {LinearGradient} from "expo-linear-gradient";

const formatDate = (date_utc) =>{
    let month = date_utc.getMonth();
    month = month + 1;
    if(!(month === 11 || month === 12)){
        month = "0" + month;
    }
    return (date_utc.getDate() + "-" + (month) + "-" + date_utc.getFullYear());
};


const LeaveScreen = props => {

    const [date, setDate] = useState(new Date());

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log(currentDate);
        setDate(currentDate);
    };

    const dateSaver = (tp) =>{
        if(tp === "start"){
            setStartDate(date);
        }
        else if(tp === "end"){
            setEndDate(date);
        }
    };


    if(startDate === null){
        return(
            <View style = {styles.container}>
                <View >
                    <View style = {{alignItems : 'center'}}>
                        <Text style = {{fontSize: 20}}> Select Start Date </Text>
                    </View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={date}
                        display="default"
                        onChange={onChange}
                    />
                </View>
                <View style = {styles.normal}>
                    <Button title = "Confirm Start Date"
                            onPress = {() => {dateSaver("start")}}
                            color = {Colors.primary}
                    />
                </View>
            </View>
        )
    }

    if(endDate === null){
        return(
            <View style = {styles.container}>
                <View >
                    <View style = {{alignItems : 'center'}}>
                        <Text style = {{fontSize: 20}}> Select End Date </Text>
                    </View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={date}
                        display="default"
                        onChange={onChange}
                    />
                </View>
                <View style = {styles.normal}>
                    <Button title = "Confirm End Date"
                            onPress = {() => {dateSaver("end")}}
                            color = {Colors.primary}
                    />
                </View>
            </View>
        )
    }


    return(
        <View style =  {{...styles.container,paddingTop : 0}}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style = {styles.cardStyle}>
                <Text style = {styles.txtStyle}> Start Date : {formatDate(startDate)} </Text>
                <Text style = {styles.txtStyle}> End Date : {formatDate(endDate)}</Text>
                <Button title = "Confirm"
                    onPress = {() => {props.navigation.goBack()}}
                    color = {Colors.primary}
                />
                </Card>
            </LinearGradient>
        </View>
    )
};

LeaveScreen.navigationOptions = () => {
    return {
        headerTitle : 'Leave Application',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    }
};

const styles = StyleSheet.create({

    normal :{
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        paddingTop : 50,
    },
    txtStyle:{
        fontSize : 20,
        paddingBottom : 20,
    },
    cardStyle : {
        width : '80%',
        height : '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});


export default LeaveScreen;
