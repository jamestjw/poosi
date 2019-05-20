import firebase from '../Firebase';
import React, { Component } from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Alert} from "react-native";
import { createStackNavigator } from "react-navigation";
import LoadingIcon from '../components/LoadingIcon'
import { Slider } from 'react-native-elements'

const ImagesList = require('../urls.json')

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
      source={require('../resources/logo.png')}
      style={{ width: 40, height: 40}}
      />
    );
  }
}

class ShowImage extends Component {
  render(){
    return(
      <View>
        <Image 
          source={{
            uri: this.props.uri, 
            height: 500,
            width: 500
          }}
        />
      </View>
    );
  }
}

const randomIdx = (currentIdx, l) => {
  x = currentIdx
  while(x==currentIdx){
    x=Math.floor(Math.random() * l)
  }
  return(x)
}

class Logout extends Component {
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

class HomeScreen extends Component {
  componentWillUnmount() {
    this.active = false
  }

  updateImageList(list) {
    const imageKeys = Object.keys(list)
    this.setState({ ...this.state, images: list, imageKeys})
  }
  constructor() {
    super();
    this.updateImageList = this.updateImageList.bind(this)
    this.ref = firebase.firestore().collection('images');
    this.active = true;
    this.state = {
      images: {},
      imageidx: 0,
      rating: null
    };

    firebase.auth().onAuthStateChanged(user => {
      if(this.active){
        if(user) {
          this.setState({ ...this.state, uid: user.uid})
  
  
          const {navigation} = this.props
          const images = navigation.getParam('images',null)
  
          if(images===null) {
            let list = {}
            this.ref.get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    list = { 
                      ...list, 
                      [doc.id] : doc.data()
                    }
                })
              })
              .then(() => {
                this.updateImageList(list);
              })
              .catch(e => console.log(e.message))
          } else {
            this.updateImageList(images)
          }
        } else {
          this.setState({ ...this.state, uid: ''})
          console.log('no user')
        }
      }
    })
  }

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: <Logout />
  }

  render() {
    numImages = Object.keys(this.state.images).length
    if(numImages == 0) {
      return(
        <LoadingIcon />
      )
    }
    const { navigation } = this.props;
    const imageidx = navigation.getParam('imageidx', 0)

    const imageList = this.state.images
    const imageKeys = this.state.imageKeys

    const imageID = imageKeys[imageidx]
    const uri = imageList[imageID].uri

    if(this.state.uid) {      
      this.refRating = firebase.firestore().collection('users').doc(this.state.uid).collection('ratings')
    }

    return (
      <View style={styles.container}>
        <ShowImage imageidx={JSON.stringify(imageidx)} uri={uri} />

        <View style={{ alignItems: 'center'}}>
          <View style={{alignItems: 'stretch', justifyContent: 'center'}}>
            <Slider
              value={this.state.rating}
              onValueChange={(rating) => this.setState({rating})}
              step={0.5}
              maximumValue={10}
              style={{width:200}} />
            <Text>How good does this look? {this.state.rating}</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={ () => {
              if(this.state.rating === null) {
                Alert.alert(
                  'Don\'t forget to tell us what you think!',
                  '',
                  [
                    {text: 'Back', onPress: () => {}},
                  ],
                  { cancelable: false }
                )
              } else {
                this.refRating.doc(imageID).set({
                  rating: this.state.rating,
                  dt: new Date().toLocaleString()
                })
                this.props.navigation.push(
                  'Home', 
                  {
                    imageidx: randomIdx(JSON.stringify(imageidx),numImages),
                    images: this.state.images
                  }
                );
              }
            }}
          >
            <Text> Next </Text>
         </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 100,
    alignItems: 'center'
  }
});

const Home = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  {
    defaultNavigationOptions: {
      headerLeft: null
    },
    headerLayoutPreset: 'center'
  }
)

export default Home;