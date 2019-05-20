import firebase from '../Firebase';
import React from 'react'
import { StyleSheet, Platform, Image, Text, View, TouchableOpacity, Alert } from 'react-native'
import LogoTitle from './components/LogoTitle'
import Logout from './components/Logout'
import LoadingIcon from '../components/LoadingIcon'
import { Slider } from 'react-native-elements'
import { createStackNavigator } from "react-navigation";

class Calibrated extends React.Component {
    static navigationOptions = {
        headerTitle: <LogoTitle />,
        headerRight: <Logout />
    }

    render() {
        return(
          <View style={styles.container}>
            <Text style={styles.text}> 
            CONGRATULATIONS YOU HAVE COMPLETED THE CALIBRATION PROCESS! 
            Kindly give us a few days to process the results. 
            </Text>
          </View>
        )
    }
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',

  }
});

export default Calibrated;