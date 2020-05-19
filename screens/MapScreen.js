import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {MaterialIcons} from '@expo/vector-icons'
import Colors from "../constants/Colors";
import {getCurrentPosition} from "../utilityFunctions";

const MapScreen = props => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [currentLocation, setLocation] = useState(null);
    const [accuracy, setAccuracy] = useState(0)
    let mapRegion;
    const selectLocationHandler = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        });
    };

    let markerCoordinates;

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        };
    }

    useEffect(() => {
        (async () => {
            try {
                let location = await getCurrentPosition();
                // console.log(location);
                if (location) {
                    setLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    });
                    setAccuracy(location.coords.accuracy);
                }
            } catch (e) {
                console.log(e);
            }
        })()
    }, []);
    console.log(currentLocation);

    mapRegion = {
        ...currentLocation,
        latitudeDelta: 0.1,
        longitudeDelta: 0.05
    };
    if (currentLocation)
        return (
            <MapView
                style={styles.map}
                region={mapRegion}
            >
                <Marker coordinate={currentLocation} anchor={{x:0.5, y:0.5}}>
                    <MaterialIcons name={'my-location'} color={Colors.primary} size={20}/>
                </Marker>
                <Circle center={currentLocation} radius={accuracy} strokeColor={'transparent'} fillColor={'rgba(0,0,155,0.1)'}/>
            </MapView>
        );
    else {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export default MapScreen;
