import firebase from '../Firebase';
import React from 'react'
import { Platform, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import signIn from '../resources/signIn'

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = { 
            email: '', 
            password: '', 
            errorMessage: null 
        }
        this.ref = firebase.firestore().collection('users');
        this.signIn = this.signIn.bind(this)
    }
    signIn = signIn
    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                const ref = firebase.firestore().collection('users');

                const dt = new Date().toLocaleString()
                const user = firebase.auth().currentUser

                ref.doc(user.uid).set({
                    created: dt,
                }).then(
                    () => console.log('Created new user!')
                ).catch(
                    e => console.log(e)
                )
                this.props.navigation.navigate('Main')
            })
            .catch(e => this.setState({ errorMessage: e.message }))
    }
    render() {
        return (
        <View style={styles.container}>
            <Text
                style={{
                    fontFamily: Platform.OS === 'ios' ? 'Copperplate' : 'monospace',
                    fontSize: 30,
                    paddingBottom: 30,
                    textAlign: 'auto'
                }}               
            >
                Sign Up
            </Text>
            {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
            </Text>}

            <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            />

            <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            />

            {/* <Button title="Next" onPress={this.handleSignUp} /> */}

            <View style={{ alignItems: 'center'}}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.handleSignUp}
                >
                    <Text style={{color:'#fff'}}> NEXT </Text>
                </TouchableOpacity>
            </View>  

            <Button
            title="Already have an account? Login"
            onPress={() => this.props.navigation.navigate('Login')}
            />

            <Button
            title="Login with Google"
            onPress={
                () => {
                console.log('google')
                this.signIn()
                }
            }
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  buttonStyle: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#68a0cf',
    borderRadius:20,
    borderWidth: 10,
    borderColor: '#fff',
    width: 100,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  }
})