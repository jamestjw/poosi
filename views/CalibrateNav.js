// import firebase from 'firebase';
import React from 'react'
import { StyleSheet, Platform, Image, Text, View, InteractionManager } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'; // 1.0.0-beta.27
import CalibrateScreen from './CalibrateScreen'

// const CalibrateNav = createStackNavigator(
//     {
//       CalibrateScreen: {
//         screen: CalibrateScreen
//       }
//     },
//     {
//       defaultNavigationOptions: {
//         headerLeft: null
//       },
//       headerLayoutPreset: 'center'
//     }
//   )

// export default CalibrateNav;

export default CalibrateNav = createStackNavigator(
        {
          CalibrateScreen: {
            screen: CalibrateScreen
          }
        },
        {
          defaultNavigationOptions: {
            headerLeft: null
          },
          headerLayoutPreset: 'center'
        }
      )