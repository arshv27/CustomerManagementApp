import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import Colors from "../constants/Colors";

import { useSelector, useDispatch } from 'react-redux';
import * as profileActions from '../store/actions/profile';

const ProfileScreen = props => {

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const profile = useSelector(state => state.profile);
  // const dispatch = useDispatch();
  //
  // const loadProfile = useCallback(async () => {
  //     setError(null);
  //     setIsLoading(true);
  //     try{
  //       await dispatch(profileActions.fetchProfile());
  //     }
  //     catch(err){
  //       setError(err.message);
  //     }
  //     setIsLoading(false);
  //     },
  //     [dispatch,setIsLoading,setError]);
  //
  // useEffect(() => {
  //   const willFocusSub = props.navigation.addListener(
  //       'willFocus',
  //       loadProfile
  //   );
  //
  //   return () => {
  //     willFocusSub.remove();
  //   };
  // }, [loadProfile]);
  //
  // useEffect(() => {
  //   loadProfile();
  // }, [dispatch, loadProfile]);
  //
  // if (error) {
  //   return (
  //       <View style={styles.screen}>
  //         <Text>An error occurred!</Text>
  //         <Button
  //             title="Try again"
  //             onPress={loadProfile}
  //             color={Colors.primary}
  //         />
  //       </View>
  //   );
  // }
  //
  // if (isLoading) {
  //   return (
  //       <View style={styles.screen}>
  //         <ActivityIndicator size="large" color={Colors.primary} />
  //       </View>
  //   );
  // }

    //<Text> {profile.firstName}</Text>

  return(
    <View style = {styles.screen} >
      <Text> The PROFILE Page! </Text>
    </View>
  )
};

ProfileScreen.navigationOptions = navData => {
  return {
    headerTitle : 'Profile',
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProfileScreen;
