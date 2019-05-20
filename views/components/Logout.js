import firebase from '../../Firebase';
import React, { Component } from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Alert} from "react-native";

export default class Logout extends Component {
    render() {
        return(
            <View>
                <Button 
                    title='Logout'
                    onPress= {() => {
                        firebase.auth().signOut();
                    }}             
                />
            </View>
        );
    }
}