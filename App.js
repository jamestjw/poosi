import React from 'react';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware} from 'redux';
import calibrateReducer from './state/reducers/CalibrateReducer'
import AppNavigator from './AppNavigator';

import thunk from "redux-thunk";

const store = createStore(calibrateReducer,  applyMiddleware(thunk));

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={ store }>
        <AppNavigator
        />
      </Provider>
    );
  }
}