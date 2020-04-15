import React, { useEffect, useCallback, useReducer } from 'react';
import { StyleSheet, Text, View, Button,Alert, KeyboardAvoidingView,Platform,ScrollView} from 'react-native';
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from 'react-redux';

import * as profileActions from '../store/actions/profile';
import Input from "../components/UI/Input";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        console.log(updatedValidities);
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        console.log("HEY " + updatedFormIsValid);
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const SetupProfileScreen =  props => {

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            firstName: '',
            lastName: '',
            employeeID: ''
        },
        inputValidities: {
            firstName: false,
            lastName: false,
            employeeID: false
        },
        formIsValid: false
    });

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                { text: 'Okay' }
            ]);
            return;
        }

        dispatch(
            profileActions.createProfile(
                formState.inputValues.firstName,
                formState.inputValues.lastName,
                formState.inputValues.employeeID,
            )
        );

        props.navigation.navigate('MainApp');
    }, [dispatch, formState]);

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
            <KeyboardAvoidingView
                style={{ flex: 0.4}}
                behavior="padding"
                keyboardVerticalOffset={100}
            >
                <ScrollView>
                    <View style={styles.form}>
                        <Input
                            id="firstName"
                            label="First Name"
                            errorText="Please enter a valid first name!"
                            keyboardType="default"
                            autoCapitalize="sentences"
                            autoCorrect
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue= ""
                            initiallyValid= {false}
                            required
                        />
                        <Input
                            id="lastName"
                            label= "Last Name"
                            errorText="Please enter a valid last name!"
                            keyboardType="default"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue={''}
                            initiallyValid={false}
                            required
                        />
                        <Input
                            id="employeeID"
                            label= "Employee ID"
                            errorText="Please enter a valid ID"
                            keyboardType="default"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue={''}
                            initiallyValid={false}
                            required
                        />
                    </View>
                </ScrollView>
                <Button title = "Save" onPress = {submitHandler}/>
            </KeyboardAvoidingView>
    );



    // return(
    //   <View style = {StyleSheet.screen} >
    //       <Text> Profile Setup kar le Bhai, naya hai tu.</Text>
    //   </View>
    //
    // );
};

SetupProfileScreen.navigationOptions = navData => {
  return {
      headerTitle : 'Create Profile',
      headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      headerRight : () => (
          <Button title = "Skip"
                  color = {Colors.primary}
                  onPress = {() => navData.navigation.navigate('MainApp')}
          />
      )
  }
};


const styles = StyleSheet.create({
screen: {
    flex: 1,
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center'
},
form : {
    margin : 20
}
});



export default SetupProfileScreen;