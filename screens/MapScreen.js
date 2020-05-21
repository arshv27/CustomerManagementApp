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
                        latitude: location.latitude,
                        longitude: location.longitude
                    });
                }
            } catch (e) {
                console.log(e);
            }
        })()
    }, []);

    mapRegion = {
        ...currentLocation,
        latitudeDelta: 0.025,
        longitudeDelta: 0.01
    };
    if (currentLocation)
        return (
            <MapView
                style={styles.map}
                region={mapRegion}
                loadingEnabled={true}
                showsUserLocation={true}
                followsUserLocation={true}
            >
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
