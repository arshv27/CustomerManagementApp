import React, { Component } from 'react';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import TodoStore from './data/TodoStore';

import authReducer from './store/reducers/auth';
import NavigationContainer from "./navigation/NavigationContainer";
import profileReducer from './store/reducers/profile';
import productsReducer from './store/reducers/products';

import * as Permissions from 'expo-permissions';

enableScreens();

const rootReducer = combineReducers(
    {
        auth : authReducer,
        profile : profileReducer,
        products : productsReducer,
    });

const store  = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default class App extends Component {

  async componentWillMount() {
    await this._askForCalendarPermissions();
    await this._askForReminderPermissions();
  }

  _askForCalendarPermissions = async () => {
    await Permissions.askAsync(Permissions.CALENDAR);
  };

  _askForReminderPermissions = async () => {
    if (Platform.OS === 'android') {
      return true;
    }

    await Permissions.askAsync(Permissions.REMINDERS);
  };

  	render() {
  		return (
	        <Provider store={store}>
	            <NavigationContainer />
	        </Provider>
    	);
  	}
    
}
