import {CREATE_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCTS, UPDATE_PRODUCT} from "../actions/products";

const initialState = {
    availableProducts: [],
};

export default (state = initialState, action) => {
    let availableProducts;
    switch(action.type){
        case FETCH_PRODUCTS:
            availableProducts = action.products;
            return {availableProducts};
        case CREATE_PRODUCT :
        case UPDATE_PRODUCT :
        case DELETE_PRODUCT:
            return initialState;
        default:
            return state;
    }
};