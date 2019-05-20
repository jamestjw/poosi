// import firebase from 'firebase';
import React from 'react'
import { StyleSheet, Platform, Image, Text, View, InteractionManager } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'; // 1.0.0-beta.27
// import the different screens
import Loading from './views/Loading'
import SignUp from './views/SignUp'
import Login from './views/Login'
import Main from './views/Main'
import Home from './views/HomeScreen'
import CalibrateScreen from './views/CalibrateScreen'
import Calibrated from './views/Calibrated'
import CalibrateNav from './views/CalibrateNav'
import CalibrateStack from './CalibrateStack'

// const _setTimeout = global.setTimeout;
// const _clearTimeout = global.clearTimeout;
// const MAX_TIMER_DURATION_MS = 60 * 1000;
// if (Platform.OS === 'android') {
// // Work around issue `Setting a timer for long time`
// // see: https://github.com/firebase/firebase-js-sdk/issues/97
//     const timerFix = {};
//     const runTask = (id, fn, ttl, args) => {
//         const waitingTime = ttl - Date.now();
//         if (waitingTime <= 1) {
//             InteractionManager.runAfterInteractions(() => {
//                 if (!timerFix[id]) {
//                     return;
//                 }
//                 delete timerFix[id];
//                 fn(...args);
//             });
//             return;
//         }

//         const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
//         timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
//     };

//     global.setTimeout = (fn, time, ...args) => {
//         if (MAX_TIMER_DURATION_MS < time) {
//             const ttl = Date.now() + time;
//             const id = '_lt_' + Object.keys(timerFix).length;
//             runTask(id, fn, ttl, args);
//             return id;
//         }
//         return _setTimeout(fn, time, ...args);
//     };

//     global.clearTimeout = id => {
//         if (typeof id === 'string' && id.startWith('_lt_')) {
//             _clearTimeout(timerFix[id]);
//             delete timerFix[id];
//             return;
//         }
//         _clearTimeout(id);
//     };
// }

const MainStack = createStackNavigator(
  {
    Loading, SignUp, Login, Main, Home, CalibrateScreen, Calibrated
  },
  {
    initialRouteName: 'Loading',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    headerLayoutPreset: 'center'
  }
);

const AppContainer = createAppContainer(MainStack);

export default AppContainer;
