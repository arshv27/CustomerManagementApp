import * as Location from "expo-location";
import haversine from 'haversine';
import Firebase from "./Firebase";

export const getCurrentPosition = async () => {
    try {
        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
        const {coords: {latitude, longitude}} = location;
        return {latitude, longitude}
    } catch (e) {
        console.log(`getCurrentPosition: ${e}`);
    }
};

export const getUserUID = () => Firebase.auth().currentUser.uid;
export const withinRange = (center, coord, range) => {
    console.log(center, coord);
    return haversine(center, coord) < range;
};

export const getOfficeCoords = async (address) => {
    try {
        const loc = await Location.geocodeAsync(address);
        console.log(loc);
        const {latitude, longitude} = loc[0];
        return {latitude, longitude}
    } catch (e) {
        console.log(`getOfficeCoords: ${e}`)
    }
};