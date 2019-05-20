import React from 'react';
import { StyleSheet, Platform, Image, Text, View, InteractionManager } from 'react-native'


// redux stuff
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import calibrateReducer from './state/reducers/CalibrateReducer'

const store = createStore(calibrateReducer);
// end redux stuff

import CalibrateNav from './views/CalibrateNav'
import CalibrateScreen from './views/CalibrateScreen'

export default class CalibrateStack extends React.Component {
  render() {
    return (
        <Provider store={ store }>
            <CalibrateNav />
        </Provider>
    );
  }
}