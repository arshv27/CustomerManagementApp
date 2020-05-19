import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Alert, TouchableOpacity} from 'react-native';

import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as profileActions from "../../store/actions/profile";
import {useDispatch, useSelector} from "react-redux";
import {LinearGradient} from "expo-linear-gradient";
import * as Location from "expo-location";
import {getCurrentPosition, withinRange, getOfficeCoords} from "../../utilityFunctions";


const AttendanceScreen = props => {
    const firstName = useSelector(state => state.profile.firstName);
    const [attendanceModalVisibility, setAttendanceModalVisibility] = useState(false);
    const [status, setStatus] = useState(null);
    const [workType, setWorkType] = useState(null);
    const [location, setLocation] = useState(null);

    return(
        <View style = {styles.screen} >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Text style = {{fontSize : 25, fontWeight : 'bold',marginBottom : 125,marginTop: 50}}> Welcome, {firstName}! </Text>
                <Card style = {styles.cardStyle}>
                    <TouchableOpacity
                        onPress= {() => Alert.alert((new Date()).toDateString(), 'Attendance Status', [
                            {
                                text: 'Present',
                                onPress: () => {
                                    setAttendanceModalVisibility(true);
                                    setStatus('Present');
                                    Alert.alert('Present', 'Work Details', [
                                        {
                                            text: 'Office',
                                            onPress: async () => {
                                                const office = await getOfficeCoords('Eros Woodbury Tower');
                                                const user = await getCurrentPosition();
                                                if (withinRange(office, user, 0.05)) {
                                                    setWorkType('Office');
                                                    alert('Attendance Marked!')
                                                }
                                                else alert('You are not within 50 meters of the Office!')
                                            }
                                        },
                                        {
                                            text: 'Outside Duty',
                                            onPress: async () => {
                                                setWorkType('Outside');
                                                setLocation(await getCurrentPosition());
                                                alert('Attendance Marked!')
                                            }
                                        },
                                        {
                                            text: 'Work From Home',
                                            onPress: async () => {
                                                setWorkType('Home');
                                                setLocation(await getCurrentPosition());
                                                alert('Attendance Marked!')
                                            }
                                        }
                                    ])
                                }
                            },
                            {
                                text: 'On leave',
                                onPress: () => {
                                    setStatus('Leave');
                                    alert('Enjoy your leave!')
                                }
                            }
                        ])}
                    >
                        <Text color = {Colors.primary}>Mark Attendance</Text>
                    </TouchableOpacity>
                    <Button
                        title = "Apply for Leave"
                        onPress= {() => {props.navigation.navigate('Leave')}}
                        color = {Colors.primary}
                    />
                    <Button
                        title = "Colleague Leave Status"
                        onPress= {() => {props.navigation.navigate('Status' )}}
                        color = {Colors.primary}
                    />
                </Card>
            </LinearGradient>
        </View>

    )
};

AttendanceScreen.navigationOptions = navData => {
    return {
        headerTitle : 'Attendance',
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    cardStyle : {
        width : '70%',
        height : '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        alignItems: 'center'
    },
});

export default AttendanceScreen;
