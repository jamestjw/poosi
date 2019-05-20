// import firebase from 'firebase';
import firebase from '../Firebase';
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import LoadingIcon from '../components/LoadingIcon'
const console = require('console');

// const urls = require('./urls2.json')

export default class Loading extends React.Component {
    componentDidMount() {
        // urls.forEach( (e) => 
        //     firebase.firestore().collection('images')
        //         .add({uri: e.uri, dt: new Date().toLocaleString()}) 
        //         .then( () => console.log('Added an image'))
        // )
        firebase.auth().onAuthStateChanged(user => {
            // console.log(user.uid)
            this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
    }

    render() {
        return (
        <LoadingIcon />
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50
  }
})