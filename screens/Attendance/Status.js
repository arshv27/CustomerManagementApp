import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, FlatList, ActivityIndicator} from 'react-native';
import Colors from "../../constants/Colors";
import Firebase from "../../Firebase";
import moment from "moment";

const StatusScreen = props => {
    const [attendanceList, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const attendanceRef = Firebase.database().ref('/attendance')
            .child(moment().format('YYYY-MM-DD'))
            .orderByChild("time")

        const attendanceCallback = (snap) => {
            let list = [];
            if (snap.val()){
                snap.forEach(attendance => {
                    list = list.concat(attendance.val())
                })
                setList(list);
            }
            setLoading(false)
        };

        attendanceRef.on('value', attendanceCallback);
        return () => attendanceRef.off('value', attendanceCallback);
    });

    if (loading) return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.primary}/>
        </View>
    );

    if (!attendanceList.length) {
        return (
            <View style={styles.screen}>
                <Text> Check the Attendance Status for today, later! </Text>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={{fontSize: 25}}>Attendance Status</Text>
            <Text style={{fontSize: 20}}>{(new Date()).toDateString()}</Text>
            <FlatList
                data={attendanceList}
                keyExtractor={(item, index) => item.employee + index}
                style={{width: "85%", marginTop: 15}}
                horizontail={false}
                renderItem={({item}, index) => {
                    return (
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                            <Text style={{fontSize: 23}}>{item.employee}</Text>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={{
                                    color: item.status === 'Present' ? 'green' : 'red',
                                    fontSize: 10,
                                    textAlign: 'right'
                                }}>{item.status}</Text>
                                {item.time ? <Text style={{fontSize: 10, textAlign: 'right'}}>{item.time}</Text> : null}
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
};

StatusScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Status',
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StatusScreen;
