import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage, Alert} from 'react-native';
import * as Location from 'expo-location';
import Colors from "../constants/Colors";
import Card from "../components/UI/Card";
import {LinearGradient} from "expo-linear-gradient";
import * as TaskManager from 'expo-task-manager';
import haversine from 'haversine'
import MapModal from "./MapModal";
import Firebase from "../Firebase";
import {getUserUID} from "../utilityFunctions";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../store/actions/profile";

async function setTrackingInfo(obj) {
    try {
        const json = await AsyncStorage.setItem('tracker', JSON.stringify(obj));
        if (json !== null) return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function getTrackingInfo() {
    try {
        let item = await AsyncStorage.getItem('tracker');
        const trackingObject = JSON.parse(item);
        return trackingObject;
    } catch (error) {
        console.log(error);
        return null
    }
}

const DutyScreen = props => {
        const [tracking, toggleTracking] = useState(false);
        const [isModalVisible, setVisibility] = useState(false);
        const [tripData, setTripData] = useState(null);
        const dispatch = useDispatch();
        const tripCount = useSelector(state =>  state.profile.tripCount);

        useEffect(() => {
            (async () => {
                const isRunning = await Location.hasStartedLocationUpdatesAsync('watchLocationTask');
                console.log('is location tracking still running? ' + isRunning);
            })();
            return () => {
                TaskManager.getRegisteredTasksAsync().then(res => {
                        if (res) {
                            for (const i in res) {
                                TaskManager.unregisterTaskAsync(res[i].taskName).then(() => {
                                    console.log('unregistered the running task');
                                });
                            }
                        }
                    }
                );
            }
        }, []);

        const handleTripPress = async () => {
            if (!tracking) {
                const hasPermission = await Location.hasServicesEnabledAsync();
                if (hasPermission) {
                    const tripStartedAt = new Date();
                    try {
                        await Location.startLocationUpdatesAsync('watchLocationTask', {
                            accuracy: Location.Accuracy.Highest,
                        });
                        await setTrackingInfo({
                            routeCoords: [],
                            distanceCovered: 0,
                            tripStartedAt
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }
            } else {
                const endTime = new Date();
                await Location.stopLocationUpdatesAsync('watchLocationTask');

                let trackingObject = await getTrackingInfo();
                await AsyncStorage.removeItem('tracker');
                trackingObject['tripEndedAt'] = endTime.toISOString();
                setTripData(trackingObject);
                try {
                    await Firebase.database().ref('/trips').child(getUserUID()).push(trackingObject, async () => {
                        dispatch(updateProfile({tripCount: tripCount+1}))
                    });
                } catch (e) {
                    console.log(e);
                }
                Alert.alert('Trip Details', `Your trip started at ${new Date(trackingObject.tripStartedAt).toLocaleTimeString()} and ended at
                ${endTime.toLocaleTimeString()} covering ${trackingObject.distanceCovered.toFixed(2)} km`, [
                    {
                        text: 'View Full Report',
                        onPress: () => setVisibility(true)
                    },
                    {
                        text: 'Ok',
                        style: 'cancel'
                    }
                ])
            }
            toggleTracking(!tracking);
        };

        return (
            <View style={styles.screen}>
                <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                    <Card style={styles.cardStyle}>
                        <Button title={tracking ? "End Trip" : "Start Trip"}
                                onPress={handleTripPress}
                                color={Colors.primary}
                        />
                        <Button title={"Open Map"}
                                onPress={() => {
                                    props.navigation.navigate('Map')
                                }}
                                color={Colors.primary}
                        />
                        <Button title={"Trip History"}
                                onPress={() => {
                                    props.navigation.navigate('Trips')
                                }}
                                color={Colors.primary}
                        />
                    </Card>
                </LinearGradient>
                <MapModal visible={isModalVisible} toggleModal={() => setVisibility(!isModalVisible)} info={tripData}/>
            </View>
        )
    }
;

DutyScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Duty Mode',
    }
};

TaskManager.defineTask('watchLocationTask', async ({data: {locations}, error}) => {
    if (error) {
        console.log(error);
        return;
    }

    let trackingObject = await getTrackingInfo();
    if (trackingObject === null) {
        console.log(`trackingObject is null`);
    }

    const newCoord = {
        latitude: locations[0].coords.latitude,
        longitude: locations[0].coords.longitude,
    };

    if (trackingObject) {
        let route = trackingObject.routeCoords;
        if (route.length > 0) {
            const prevCoord = route[route.length - 1];
            trackingObject.distanceCovered += haversine(prevCoord, newCoord) || 0;
        }
        trackingObject.routeCoords.push(newCoord);
        await setTrackingInfo(trackingObject)
    }
    console.log('Received new locations', newCoord);
});


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    cardStyle: {
        width: '70%',
        height: '20%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default DutyScreen;
