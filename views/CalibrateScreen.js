import firebase from '../Firebase';
import React from 'react'
import { StyleSheet, Platform, Image, Text, View, TouchableOpacity, Alert } from 'react-native'
import LogoTitle from './components/LogoTitle'
import Logout from './components/Logout'
import LoadingIcon from '../components/LoadingIcon'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchImages, updateRating, submitRating } from '../state/actions/populateCalibrateImages'

import { Slider } from 'react-native-elements'
import { createStackNavigator } from "react-navigation";

class CalibrateScreen extends React.Component{
  componentDidMount () {
    const fetch  = this.props.fetchImages
    fetch()
  }
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: <Logout />
  }

  render(){
    if(this.props.calibrate.loading){
      return(
        <LoadingIcon />
      ) 
    } else {
      const current = this.props.calibrate.current
      const idx = this.props.calibrate.idx
      const currentIdx = idx[current]
      const uri = this.props.calibrate.uri[currentIdx]
      const iid = this.props.calibrate.id[currentIdx]
      var uid = firebase.auth().currentUser.uid
  
      return(
        <View style={styles.container}>
          <ShowImage uri={ uri }  />
          
          <Slider
              value={this.props.calibrate.rating}
              onValueChange={ (rating) => this.props.updateRating(rating) }
              step={0.5}
              maximumValue={10}
              style={{width:200}} 
          />
          <Text>
            How good does this look? {this.props.calibrate.rating ? this.props.calibrate.rating : 0}/10
          </Text>
  
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={ () => {
              if(this.props.calibrate.rating === null) {
                Alert.alert(
                  'Don\'t forget to tell us what you think!',
                  '',
                  [
                    {text: 'Back', onPress: () => {}},
                  ],
                  { cancelable: false }
                )
              } else {
                this.props.submitRating(uid, iid, this.props.calibrate.rating,this.props.calibrate.current)
                if(current == 9){this.props.navigation.navigate('Calibrated')}
              }
            }}
          >
            <Text> Next </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { calibrate } = state
  return { calibrate }
};

const mapDispatchToProps = {
  fetchImages,
  updateRating,
  submitRating
}

export default connect(mapStateToProps, mapDispatchToProps)(CalibrateScreen);

class ShowImage extends React.Component {
  render(){
    return(
      <View style={this.props.style}>
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
    borderRadius:20,
    borderWidth: 10,
    borderColor: '#fff',
    width: 100, 
    alignItems: 'center'
  }
});