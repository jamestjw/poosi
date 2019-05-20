import firebase from '../Firebase';
import React from 'react'
import { StyleSheet, Platform, Image, Text, View, TouchableOpacity } from 'react-native'
import Logout from './components/Logout'
import LogoTitle from './components/LogoTitle'

export default class Main extends React.Component {
    constructor() {
        super();
        this.state = { currentUser: null }
        this.active = true
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(this.active){
                if(user) {
                    // console.log(user.uid)
                    this.setState({ ...this.state, currentUser: user})
                } else {
                    this.setState({ ...this.state, currentUser: null})
                    console.log('no user')
                }
            }
        })
    }

    componentWillUnmount() {
        this.active = false
    }

    static navigationOptions = {
        headerTitle: <LogoTitle />,
        headerRight: <Logout />
    }

    render() {
        const { currentUser } = this.state
        return (
            <View style={styles.container}>
                <View style={{paddingBottom: 100}}> 
                    <Image
                    source={require('../resources/logo.png')}
                    style={{ width: 200, height: 200}}
                    />
                </View>

                <Text 
                    style={{
                        fontFamily: Platform.OS === 'ios' ? 'Copperplate' : 'monospace',
                        fontSize: 20,
                        paddingBottom: 50,
                        textAlign: 'auto'
                    }}
                >
                Welcome {currentUser && currentUser.email}!
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={ () => {  
                        const ref = firebase.firestore().collection('users')

                        const uid = firebase.auth().currentUser.uid
                        ref.doc(uid).get().then(docSnapshot => {
                            if(docSnapshot.data().calibrated == 0){
                                console.log('going to calibrate screen')
                                this.props.navigation.navigate('CalibrateScreen')
                            } else{
                                this.props.navigation.navigate(
                                    'Calibrated'                    
                                )
                            }
                            console.log(docSnapshot.data())
                        }).catch(e => console.log(e.message))
                    }}
                >
                    <Text style={{fontWeight: '500', color: '#fff'}}> YOU READY? </Text>
                </TouchableOpacity>
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
  buttonStyle: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#68a0cf',
    borderRadius:30,
    borderWidth: 10,
    borderColor: '#fff',
    width: 150,
    alignItems: 'center'
  }
})