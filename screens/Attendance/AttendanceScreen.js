import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Alert, TouchableOpacity} from 'react-native';
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {LinearGradient} from "expo-linear-gradient";
import {getCurrentPosition, withinRange, getOfficeCoords, getUserUID} from "../../utilityFunctions";
import Firebase from "../../Firebase";
import moment from "moment";


const AttendanceScreen = props => {
    const firstName = useSelector(state => state.profile.firstName);
    const lastName = useSelector(state => state.profile.lastName);

    const attendanceHandler = async (val) => {
        let attendanceObject;
        const time = moment().format("HH:mm");
        if (val === 'Leave') {
            attendanceObject = {status: val, time, employee: `${firstName} ${lastName}`};
        } else {
            const user = await getCurrentPosition();
            if (val === 'Office') {
                const office = await getOfficeCoords('Om Satyam Apartments');
                if (withinRange(office, user, 0.05)) {
                    attendanceObject = {
                        status: 'Present',
                        workType: val,
                        time,
                        employee: `${firstName} ${lastName}`
                    };
                } else {
                    alert('You are not within 50 meters of the Office!')
                }
            } else {
                attendanceObject = {
                    status: 'Present',
                    workType: val,
                    time,
                    employee: `${firstName} ${lastName}`,
                    location: user
                };
            }
        }
        if (attendanceObject) {
            console.log(attendanceObject);
            await Firebase.database().ref('/attendance').child(moment().format('YYYY-MM-DD'))
                .child(getUserUID()).set(attendanceObject, (e) => {
                if (e && e.code === 'PERMISSION_DENIED') alert('You have already marked your attendance');
                else if (e) console.log(e);
                else if (val !== 'Leave') alert('Attendance Marked!');
                else alert('Enjoy your leave!')
            })
        }
    };

    return (
        <View style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginBottom: 125,
                    marginTop: 50
                }}> Welcome, {firstName}! </Text>
                <Card style={styles.cardStyle}>
                    <TouchableOpacity
                        onPress={() => Alert.alert((new Date()).toDateString(), 'Attendance Status', [
                            {
                                text: 'Present',
                                onPress: () => {
                                    Alert.alert('Present', 'Work Details', [
                                        {
                                            text: 'Office',
                                            onPress: async () => {
                                                await attendanceHandler('Office');
                                            }
                                        },
                                        {
                                            text: 'Outside Duty',
                                            onPress: async () => {
                                                await attendanceHandler('Outside')
                                            }
                                        },
                                        {
                                            text: 'Work From Home',
                                            onPress: async () => {
                                                await attendanceHandler('Home');
                                            }
                                        }
                                    ])
                                }
                            },
                            {
                                text: 'On leave',
                                onPress: async () => {
                                    await attendanceHandler('Leave')
                                }
                            }
                        ])}
                    >
                        <Text color={Colors.primary}>Mark Attendance</Text>
                    </TouchableOpacity>
                    <Button
                        title="Apply for Leave"
                        onPress={() => {
                            props.navigation.navigate('Leave')
                        }}
                        color={Colors.primary}
                    />
                    <Button
                        title="Colleague Leave Status"
                        onPress={() => {
                            props.navigation.navigate('Status')
                        }}
                        color={Colors.primary}
                    />
                </Card>
            </LinearGradient>
        </View>

    )
};

AttendanceScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Attendance',
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    cardStyle: {
        width: '70%',
        height: '30%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        alignItems: 'center'
    },
});

export default AttendanceScreen;
