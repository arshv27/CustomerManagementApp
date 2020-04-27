import {UPDATE_PROFILE, INC_COUNT, CREATE_PROFILE} from "../actions/profile";

const initialState = {
    firstName : null,
    lastName : null,
    employeeID : null,
    tripCount : 0,
    firebase_id : ""
};

export default (state = initialState, action) => {
    switch(action.type){

        case CREATE_PROFILE :
            return {
                ...state,
                firstName : action.profileData.firstName,
                lastName : action.profileData.lastName,
                employeeID: action.profileData.employeeID,
                tripCount: action.profileData.tripCount,
                firebase_id: action.profileData.firebase_id
            };
        case UPDATE_PROFILE :
            return {
                ...state,
                firstName : action.profileData.firstName,
                lastName : action.profileData.lastName,
                employeeID: action.profileData.employeeID,
            };
        case INC_COUNT :
            const new_count = state.tripCount + 1;
            return {
                ...state,
                tripCount: new_count
            };
        default:
            return state
    }
}