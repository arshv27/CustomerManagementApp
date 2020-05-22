import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Card from "../UI/Card";
import MapModal from "../../screens/MapModal";

export default function TripItem(props) {
    const [isModalVisible, setVisibility] = useState(false);
    const trip = props.trip.item;
    let start = new Date(trip.tripStartedAt);
    let end = new Date(trip.tripEndedAt);
    let duration = end - start;
    return (
        <>
            <Card key={start} style={{marginBottom: 10, width: '95%', alignSelf: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 24}}>
                    {start.toLocaleString()}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10}}>
                    <View>
                        <Text style={{fontSize: 18}}>Duration</Text>
                        <Text>{(duration / 60000).toFixed(2)} mins</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 18, textAlign: 'right'}}>Distance Covered</Text>
                        <Text style={{textAlign: 'right'}}>{trip.distanceCovered.toFixed(2)} km</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setVisibility(true)} style={{alignSelf: 'flex-end'}}>
                    <Text style={{fontSize: 18, color: 'lightblue'}}>View on Map</Text>
                </TouchableOpacity>
            </Card>
            <MapModal visible={isModalVisible} toggleModal={() => setVisibility(!isModalVisible)} info={trip}/>
        </>
    )
}