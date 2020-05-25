import Firebase from "../../Firebase";
import {getUserUID} from "../../utilityFunctions";
import {FETCH_PROFILE} from "./profile";

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        try {
            let snap = await Firebase.database().ref('/products' ).once('value');
            let obj = snap.val();
            let reduxArray = Object.values(obj);
            dispatch({
                type: FETCH_PRODUCTS,
                products: reduxArray
            });
        } catch (err) {
            throw err;
        }
    }
};