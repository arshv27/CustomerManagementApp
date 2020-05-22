import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { StyleSheet, Text, View, Button,Alert, KeyboardAvoidingView,Platform,ScrollView, ActivityIndicator} from 'react-native';
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

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const old_firstName = useSelector(state => state.profile.firstName);
    const old_lastName = useSelector(state => state.profile.lastName);
    const old_employeeID = useSelector(state => state.profile.employeeID);

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            firstName: old_firstName == null ? "" : old_firstName,
            lastName: old_lastName == null ? "" : old_lastName,
            employeeID: old_employeeID == null ? "" : old_employeeID
        },
        inputValidities: {
            firstName: old_firstName != null,
            lastName: old_lastName != null,
            employeeID: old_employeeID != null
        },
        formIsValid: old_firstName ? true : false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);



    const submitHandler = useCallback(async() => {
        if (!formState.formIsValid) {
            console.log("ARGGH" + " " + formState.formIsValid);
            // inputChangeHandler();
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                { text: 'Okay' }
            ]);
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            if(old_firstName == null){
                await dispatch(
                    profileActions.createProfile({
                        firstName: formState.inputValues.firstName,
                        lastName: formState.inputValues.lastName,
                        employeeID: formState.inputValues.employeeID,
                        tripCount: 0
                    })
                );
                props.navigation.replace('Home');
            } else {
                await dispatch(
                    profileActions.updateProfile({
                        firstName: formState.inputValues.firstName,
                        lastName: formState.inputValues.lastName,
                        employeeID: formState.inputValues.employeeID,
                    })
                );
                props.navigation.goBack();
            }
        }
        catch(err){
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, old_firstName, formState]);

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


    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

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
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue= {old_firstName != null ? old_firstName : ""}
                            initiallyValid= {old_firstName != null}
                            required
                        />
                        <Input
                            id="lastName"
                            label= "Last Name"
                            errorText="Please enter a valid last name!"
                            keyboardType="default"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue= {old_lastName != null ? old_lastName : ""}
                            initiallyValid={old_firstName != null}
                            required
                        />
                        <Input
                            id="employeeID"
                            label= "Employee ID"
                            errorText="Please enter a valid ID"
                            keyboardType="default"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue={old_employeeID != null ? old_employeeID : ""}
                            initiallyValid={old_firstName != null}
                            required
                        />
                    </View>
                </ScrollView>
                <Button title = "Save" onPress = {submitHandler}
                        color = {Colors.primary}
                />
            </KeyboardAvoidingView>
    );
};

SetupProfileScreen.navigationOptions = navData => {
  return {
      headerTitle : 'Create Profile',
      headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,

  }
};


const styles = StyleSheet.create({
screen: {
    flex: 1,
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
},
form : {
    margin : 20,
}
});



export default SetupProfileScreen;