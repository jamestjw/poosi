import React, { Component } from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Alert} from "react-native";


export default class LogoTitle extends Component {
    render() {
        return (
        <Image
        source={require('../../resources/logo.png')}
        style={{ width: 40, height: 40}}
        />
        );
    }
}