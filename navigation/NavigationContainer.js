import React from 'react';
import TodoStore from '../data/TodoStore';
import MainNavigator from "./MainNavigator";

const NavigationContainer = props => {
    return (
        <TodoStore>
            <MainNavigator/>
        </TodoStore>
    );
};

export default NavigationContainer;
