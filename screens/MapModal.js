import React, {useState} from 'react';
import Modal from 'react-native-modal';
import MapView, {Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {Button, View} from "react-native";

export default function MapModal(props) {
    if (props.info) {
        const {routeCoords} = props.info;
        console.log(routeCoords);
        const mapRegion = {
            ...routeCoords[Math.floor((routeCoords.length) / 2)],
            latitudeDelta: 0.05,
            longitudeDelta: 0.01
        };
        return (
            <Modal isVisible={props.visible} onBackdropPress={props.toggleModal}>
                <View style={{flex: 1}}>
                    <MapView
                        style={{flex: 1}}
                        region={mapRegion}
                        // provider={PROVIDER_GOOGLE}
                        loadingEnabled={true}
                    >
                        <Polyline coordinates={routeCoords} strokeWidth={3} />
                    </MapView>
                    <Button onPress={props.toggleModal} title={'Done'}/>
                </View>
            </Modal>
        )
    }
    return null
}