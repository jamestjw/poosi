import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'

export default class LoadingIcon extends React.Component {
    render() {
        return (
        <View style={styles.container}>
            <Text style={{padding:20}}>Loading</Text>
            <ActivityIndicator size="large" />
        </View>
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