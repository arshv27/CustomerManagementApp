import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import MainNavigator from './navigation/MainNavigator';

enableScreens();

const rootReducer = combineReducers({auth : authReducer});

const store  = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {

    return (
      <Provider store = {store}>
      <MainNavigator />
      </Provider>
  );
}
