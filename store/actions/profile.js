import Firebase from "../../Firebase";
import {getUserUID} from "../../utilityFunctions";

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const CREATE_PROFILE = 'CREATE_PROFILE';
export const FETCH_PROFILE = 'FETCH_PROFILE';

export const fetchProfile = () => {
    return async (dispatch, getState) => {
        try {
            let snap = await Firebase.database().ref('/profiles/' + getUserUID()).once('value');
            let obj = snap.val();
            let reduxObject;
            for (const key in obj) {
                obj = obj[key];
                reduxObject = {
                    ...obj,
                    firebase_id: key
                };
                break;
            }
            dispatch({
                type: FETCH_PROFILE,
                profileData: reduxObject
            });
            return reduxObject;
        } catch (err) {
            throw err;
        }
    }
};

export const updateProfile = (updateObject) => {
    return async (dispatch, getState) => {
        const firebase_id = getState().profile.firebase_id;
        try {
            await Firebase.database().ref('/profiles/' + getUserUID()).child(firebase_id).update(updateObject);
            dispatch({
                type: UPDATE_PROFILE,
                profileData: updateObject
            });
        } catch (err) {
            throw err;
        }
    };
};

export const createProfile = (newProfileObject) => {
    return async (dispatch, getState) => {
        try {
            const newRef = Firebase.database().ref('/profiles/' + getUserUID()).push();
            await newRef.set(newProfileObject);
            dispatch({
                type: CREATE_PROFILE,
                profileData: {
                    ...newProfileObject,
                    firebase_id: newRef.key
                }
            });
        } catch (err) {
            throw err;
        }
    };
};

export const signOut = () => {
    return async (dispatch, getState) => {
        await Firebase.auth().signOut();
        dispatch({
            type: CLEAR_PROFILE
        });
    }
};
