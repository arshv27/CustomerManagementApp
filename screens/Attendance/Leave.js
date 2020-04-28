import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from "../../constants/Colors";

import RNDateTimePicker from '@react-native-community/datetimepicker';

const LeaveScreen = props => {

    let today_utc = new Date();
    let month = today_utc.getMonth();
    month = month + 1;
    if(!(month === 11 || month === 12)){
        month = "0" + month;
    }
    let today = today_utc.getDate() + "-" + (month) + "-" + today_utc.getFullYear();


    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log(currentDate);
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View>
            <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            {show && (
                <RNDateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    minimumDate = {date}
                    display="default"
                    textColor="red"
                    onChange={onChange}
                />
            )}
        </View>
    );

};

LeaveScreen.navigationOptions = () => {
    return {
        headerTitle : 'Apply for Leave',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        padding: 16,
    },
});


export default LeaveScreen;
