import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import Colors from "../../constants/Colors";
import Card from "../../components/UI/Card";
import DateTimePicker from '@react-native-community/datetimepicker';
import {LinearGradient} from "expo-linear-gradient";
import moment from "moment";
import {getUserUID} from "../../utilityFunctions";
import {useSelector} from "react-redux";
import Firebase from "../../Firebase";

const LeaveScreen = props => {
    const [date, setDate] = useState(new Date());
    const firstName = useSelector(state => state.profile.firstName);
    const lastName = useSelector(state => state.profile.lastName);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const start = !startDate && !endDate;
    const confirm = !!startDate && !!endDate

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const dateSaver = (tp) => {
        if (tp === "start") {
            setStartDate(date);
            setDate(moment(date).add(1, 'day').toDate())
        } else if (tp === "end") {
            setEndDate(date);
        }
    };

    const handleLeave = async () => {
        let dateArray = [];
        let currentDate = moment(startDate);
        let stopDate = moment(endDate);
        while (currentDate <= stopDate) {
            dateArray.push(currentDate.format('YYYY-MM-DD'))
            currentDate = currentDate.add(1, 'days');
        }
        let updateObject = {};
        let uid = getUserUID();
        let leaveObject = {status: 'Leave', employee: `${firstName} ${lastName}`};
        dateArray.forEach((date) => {
            updateObject[`${date}/${uid}`] = leaveObject
        })
        await Firebase.database().ref('/attendance').update(updateObject, (e) => {
            if (e && e.code === "PERMISSION_DENIED") alert("It seems you have marked your attendance for some of these days already")
            else if (e) console.log(`While updating future attendance: ${e}`)
            else {
                alert("Enjoy your leave!");
                props.navigation.goBack()
            }
        })
    }

    if (!confirm) {
        return (
            <View style={styles.container}>
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 20}}> Select {start ? "Start" : "End"} Date </Text>
                    </View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        onChange={onChange}
                        minimumDate={start
                            ? moment().toDate()
                            : moment(startDate).add(1, 'day').toDate()
                        }
                    />
                </View>
                <View style={styles.normal}>
                    <Button title={`Confirm ${start ? "Start" : "End"} Date`}
                            onPress={() => {
                                dateSaver(start ? "start" : "end")
                            }}
                            color={Colors.primary}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={{...styles.container, paddingTop: 0}}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.cardStyle}>
                    <TouchableOpacity onPress={() => {
                        setDate(startDate);
                        setStartDate(null);
                        setEndDate(null);
                    }}>
                        <Text style={styles.txtStyle}> Start Date : {moment(startDate).format("DD-MM-YYYY")} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setDate(endDate);
                        setEndDate(null);
                    }}>
                        <Text style={styles.txtStyle}> End Date : {moment(endDate).format("DD-MM-YYYY")}</Text>
                    </TouchableOpacity>
                    <Button title="Confirm"
                            onPress={handleLeave}
                            color={Colors.primary}
                    />
                </Card>
            </LinearGradient>
        </View>
    )
};

LeaveScreen.navigationOptions = () => {
    return {
        headerTitle: 'Leave Application',
    }
};

const styles = StyleSheet.create({

    normal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        paddingTop: 50,
    },
    txtStyle: {
        fontSize: 20,
        paddingBottom: 20,
    },
    cardStyle: {
        width: '80%',
        height: '25%',
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
