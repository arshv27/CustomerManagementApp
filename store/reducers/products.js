import PRODUCTS from "../../data/current-data";

const initialState = {
    availableProducts: PRODUCTS,
};

export default (state = initialState, action) => {
    return state;
};