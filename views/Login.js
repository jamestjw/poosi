import firebase from '../Firebase';
import React from 'react'
import { Platform, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import * as Expo from 'expo'
import signIn from '../resources/signIn'

export default class Login extends React.Component {
  constructor() {
    super()
    this.signIn = this.signIn.bind(this)
    this.state = { email: '', password: '', errorMessage: null }

  }
  signIn = signIn

  handleLogin = () => {
    const { email, password } = this.state
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Main'))
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
            Login
        </Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={{ alignItems: 'center'}}>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.handleLogin}
            >
                <Text style={{color:'#fff'}}> NEXT </Text>
            </TouchableOpacity>
        </View> 
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
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