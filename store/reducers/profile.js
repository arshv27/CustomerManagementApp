import {UPDATE_PROFILE, INC_COUNT} from "../actions/profile";

const initialState = {
    firstName : "Devil",
    lastName : "",
    employeeID : "",
    tripCount : 0
};

export default (state = initialState, action) => {
    switch(action.type){
        case UPDATE_PROFILE :
            return {
                ...state,
                firstName : action.firstName,
                lastName : action.lastName,
                employeeID: "",
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