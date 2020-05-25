import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, FlatList, StyleSheet, Text} from 'react-native';
import Firebase from "../Firebase";
import {getUserUID} from "../utilityFunctions";
import Colors from "../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
import TripItem from "../components/Items/TripItem";
import {ActionSheetProvider} from '@expo/react-native-action-sheet'


export default function TripHistoryScreen(props) {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tripRef = Firebase.database().ref('/trips').child(getUserUID()).orderByChild('tripStartedAt');
        const tripCallback = (snap) => {
            let list = [];
            if (snap.val()) {
                snap.forEach(trip => {
                    let item = {
                        ...trip.val(),
                        key: trip.key,
                        attachments: trip.val().attachments ? Object.values(trip.val().attachments) : []
                    }
                    list = list.concat(item)
                })
                setTrips(list);
            }
            setLoading(false);
        };
        tripRef.on('value', tripCallback);
        return () => tripRef.off('value', tripCallback);
    }, []);

    if (loading) return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Colors.primary}/>
        </View>
    )

    if (!trips.length) return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text> You currently have no trip history, come back later! </Text>
        </View>
    )

    return (
        <ActionSheetProvider>
            <View style={styles.screen}>
                <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                    <FlatList
                        data={trips}
                        keyExtractor={(item) => {
                            return item.tripStartedAt;
                        }}
                        style={{width: "95%"}}
                        horizontail={false}
                        renderItem={(item, index) => <TripItem trip={item}/>}
                    />
                </LinearGradient>
            </View>
        </ActionSheetProvider>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
});