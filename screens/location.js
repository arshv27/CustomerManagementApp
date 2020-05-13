import React, { Component } from "react";
// import { StyleSheet, View } from "react-native";
import {
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Text,
  Dimensions,
  Button, ActivityIndicator,
  TextInput,
  Switch,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import Colors from "../constants/Colors";

const LOCATION_TASK_NAME = "background-location-task";

export default class location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      error: '',
    };
  }

  _getLocationAsync = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      enableHighAccuracy: true,
      distanceInterval: 1,
      timeInterval: 1000
    });
    // watchPositionAsync Return Lat & Long on Position Change
    this.location = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 1000
      },
      newLocation => {
        let { coords } = newLocation;
        // console.log(coords);
        let region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045
        };
        this.setState({ region: region });
      },
      error => console.log(error)
    );
    return this.location;
  };

  async componentWillMount() {
    // Asking for device location permission
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === "granted") {
      this._getLocationAsync();
    } else {
      this.setState({ error: "Locations services needed" });
    }
    // userId = (await AsyncStorage.getItem("userId")) || "none";
    // userName = (await AsyncStorage.getItem("userName")) || "none";
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.region}
          showsCompass={true}
          showsUserLocation={true}
          rotateEnabled={true}
          ref={map => {
            this.map = map;
          }}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;
    // userId = (await AsyncStorage.getItem("userId")) || "none";

    // Storing Received Lat & Long to DB by logged In User Id
    // axios({
    //   method: "POST",
    //   url: "http://000.000.0.000/phpServer/ajax.php",
    //   data: {
    //     action: "saveLocation",
    //     userId: 1,
    //     lat,
    //     long
    //   }
    // });
    // console.log("Received new locations for user = ", userId, locations);
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

location.navigationOptions = navData => {
  return {
    headerTitle : 'Location',
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerLeft : () => (
        <Button title = "Menu"
                color = {Colors.primary}
                onPress = {() => navData.navigation.toggleDrawer()}
        />
    ),
  }
};

