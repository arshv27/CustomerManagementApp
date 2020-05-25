import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ActivityIndicator, Platform, FlatList} from 'react-native';
import Card from "../UI/Card";
import MapModal from "../../screens/MapModal";
import {useActionSheet} from "@expo/react-native-action-sheet";
import Colors from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import Firebase from "../../Firebase";
import 'react-native-get-random-values';
import {v4 as uuid4} from "uuid";
import * as DocumentPicker from 'expo-document-picker';
import {getUserUID} from "../../utilityFunctions";
import {MaterialIcons} from "@expo/vector-icons";
import moment from "moment";

export default function TripItem(props) {
    const {showActionSheetWithOptions} = useActionSheet()
    const [isModalVisible, setVisibility] = useState(false);
    const [uploading, setUploading] = useState(false)
    const trip = props.trip.item;
    let start = moment(trip.tripStartedAt);
    let end = moment(trip.tripEndedAt);
    let duration = end.diff(start, 'minutes', true)


    const documentCallback = async (button) => {
        let doc, perm, perm2;
        switch (button) {
            case 0:
                perm = (await ImagePicker.getCameraPermissionsAsync()).granted || (await ImagePicker.requestCameraPermissionsAsync()).granted
                perm2 = (await ImagePicker.getCameraRollPermissionsAsync()).granted || (await ImagePicker.requestCameraRollPermissionsAsync()).granted
                if (!(perm && perm2)) {
                    alert("Required permissions not provided!");
                    return
                }
                doc = await ImagePicker.launchCameraAsync({aspect: [1, 1], allowsEditing: true})
                break;
            case 1:
                perm = (await ImagePicker.getCameraRollPermissionsAsync()).granted || (await ImagePicker.requestCameraRollPermissionsAsync()).granted
                if (!perm) {
                    alert("Required permissions not provided!");
                    return
                }
                doc = await ImagePicker.launchImageLibraryAsync({
                    aspect: [1, 1],
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true
                })
                break;
            case 2:
                doc = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: false, type: 'application/pdf'})
                break;
            default:
                console.log('default');
                return;
        }
        if (doc.type === 'cancel' || doc.cancelled) alert('Cancelled');
        else if (doc) {
            setUploading(true);
            console.log(doc);
            let blob;
            try {
                const response = await fetch(doc.uri);
                blob = await response.blob();
            } catch (e) {
                console.log(`while blobbing: ${e}`)
            }
            const fileName = doc.name || `${uuid4()}.jpg`
            Firebase.storage().ref(`/trips/${trip.key}/${fileName}`).put(blob)
                .then(async (snapshot) => {
                    blob.close();
                    let url = await snapshot.ref.getDownloadURL()
                    const docObject = {url, fileName, type: doc.name ? 'pdf' : 'image'}
                    await Firebase.database().ref('/trips').child(getUserUID())
                        .child(trip.key).child('attachments')
                        .push(docObject, (e) => {
                            if (e) console.log(`While setting attachment url: ${e}`)
                            setUploading(false);
                            alert('Upload complete')
                        })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const renderAttachment = (attachment) => {
        if (attachment.type === 'pdf') {
            return (<View style={{
                height: 100,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 3,
                borderWidth: 0.5,
                borderRightColor: 'black'
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80%',
                    width: '100%',
                    backgroundColor: 'ghostwhite'
                }}>
                    <MaterialIcons
                        name={'picture-as-pdf'}
                        size={35}
                        color={Colors.primary}
                    />
                </View>
                <View style={{
                    height: '20%',
                    width: '100%',
                    backgroundColor: 'gainsboro',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopWidth: 0.5,
                    borderColor: 'black'
                }}>
                    <Text style={{textAlign: 'center', fontSize: 8}}>{attachment.fileName}</Text>
                </View>
            </View>)
        } else {
            return (<Image source={{uri: attachment.url}} style={{height: 100, width: 100, marginRight: 3}}/>)
        }
    }
    const toRender = trip.attachments.length;

    return (
        <>
            <Card key={start} style={{marginBottom: 10, width: '95%', alignSelf: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 22}}>
                    {start.format("ddd, MMM Do YYYY, h:mm a")}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 10
                }}>
                    <View>
                        <Text style={{fontSize: 18}}>Duration</Text>
                        <Text>{(duration).toFixed(2)} mins</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 18, textAlign: 'right'}}>Distance Covered</Text>
                        <Text style={{textAlign: 'right'}}>{trip.distanceCovered.toFixed(2)} km</Text>
                    </View>
                </View>
                {toRender ? <Text style={{fontSize: 18, fontWeight: "100"}}>Attachments</Text> : null}
                <FlatList
                    data={trip.attachments}
                    keyExtractor={(item) => item.url}
                    renderItem={({item}) => renderAttachment(item)}
                    horizontal={true}
                    style={{marginVertical: 5}}
                />
                <View style={{
                    alignSelf: 'flex-end',
                    flexDirection: 'row',
                    width: '30%',
                    justifyContent: 'space-between'
                }}>
                    {uploading
                        ? <ActivityIndicator size="small" color={Colors.primary}/>
                        : <TouchableOpacity onPress={() => showActionSheetWithOptions({
                                options: ['Take Photo', 'Open Gallery', 'Attach PDF', 'Cancel'],
                                icons: [<MaterialIcons
                                    name={'camera-alt'}
                                    size={25}
                                    color={Colors.primary}
                                />, <MaterialIcons
                                    name={'photo'}
                                    size={25}
                                    color={Colors.primary}
                                />, <MaterialIcons
                                    name={'picture-as-pdf'}
                                    size={25}
                                    color={Colors.primary}
                                />],
                                cancelButtonIndex: 3,
                                title: "Attach a document to this trip",
                                tintColor: Colors.primary
                            },
                            documentCallback
                        )}>
                            <Text style={{fontSize: 18, color: Colors.primary}}>Attach</Text>
                        </TouchableOpacity>}
                    <TouchableOpacity onPress={() => setVisibility(true)}>
                        <Text style={{fontSize: 18, color: Colors.primary}}>Map</Text>
                    </TouchableOpacity>
                </View>
            </Card>
            <MapModal visible={isModalVisible} toggleModal={() => setVisibility(!isModalVisible)} info={trip}/>
        </>
    )
}