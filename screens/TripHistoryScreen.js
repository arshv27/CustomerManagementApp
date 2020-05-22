import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, FlatList, StyleSheet} from 'react-native';
import Firebase from "../Firebase";
import {getUserUID} from "../utilityFunctions";
import {useSelector} from "react-redux";
import Colors from "../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
import TripItem from "../components/Items/TripItem";


export default function TripHistoryScreen(props) {
    const [trips, setTrips] = useState(null);

    useEffect(() => {
        const tripRef = Firebase.database().ref('/trips').child(getUserUID()).orderByChild('tripStartedAt');
        const tripCallback = (snap) => {setTrips(snap.val())};
        tripRef.on('value', tripCallback);
        return () => tripRef.off('value', tripCallback);
    }, []);

    if (!trips) {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <FlatList
                    data={Object.values(trips)}
                    keyExtractor={(item) => {
                        return item.tripStartedAt;
                    }}
                    style={{width: "95%"}}
                    horizontail={false}
                    renderItem={(item, index) => <TripItem trip={item}/>}
                />
            </LinearGradient>
        </View>
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