import React from 'react'
import {Dimensions, Image, View} from "react-native";
import PDFReader from "rn-pdf-reader-js";

export default function AttachmentView(props) {
    const {type, url} = props.navigation.state.params;

    if (type === "image") {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <Image source={{uri: url}}
                       progressiveRenderingEnabled
                       style={{
                           width: Dimensions.get('window').width,
                           height: Dimensions.get('window').width
                       }}
                />
            </View>
        )
    } else {
        return (
            <PDFReader source={{uri: url}} style={{flex: 1}}
                       onError={(e) => console.log(e)}
            />
        )
    }
}