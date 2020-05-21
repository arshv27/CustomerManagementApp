import {FETCH_PROFILE, UPDATE_PROFILE, INC_COUNT, CREATE_PROFILE} from "../actions/profile";

const initialState = {
    firstName : null,
    lastName : null,
    employeeID : null,
    tripCount : 0,
    firebase_id : ""
};

export default (state = initialState, action) => {
    switch(action.type){

        case FETCH_PROFILE:
        case CREATE_PROFILE :
        case UPDATE_PROFILE :
            console.log(action.profileData);
            return {
                ...state,
                ...action.profileData
            };
        default:
            return state
    }
}