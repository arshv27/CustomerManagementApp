import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import NavigationContainer from "./navigation/NavigationContainer";
import profileReducer from './store/reducers/profile';
import productsReducer from './store/reducers/products';

enableScreens();

const rootReducer = combineReducers(
    {
        auth : authReducer,
        profile : profileReducer,
        products : productsReducer,
    });

const store  = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {

    return (
        <Provider store={store}>
            <NavigationContainer />
        </Provider>
    );
}
