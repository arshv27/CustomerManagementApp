import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as profileActions from "../store/actions/profile";
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import Colors from "../constants/Colors";

export default function DataLoadingScreen(props) {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);

    useEffect(() => {
        (async () => {
            try {
                const fetchProf = await dispatch(profileActions.fetchProfile());
                // console.log(fetchProf);
                props.navigation.replace(fetchProf['firebase_id'] ? 'Home' : 'SetupProfile');

            } catch (err) {
                console.log(err);
            }
        })();
    }, []);


    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    )
}


    DataLoadingScreen.navigationOptions = navData => {
        return {
            headerShown: false,
        }
    };
