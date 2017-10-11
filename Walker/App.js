/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  AppRegistry
} from 'react-native'
import {
  StackNavigator,
} from 'react-navigation'
import MapView from 'react-native-maps';

export class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props) {
    super(props);
    this.state = {username: '',
                  password: '',
                  message: ''};
  };
  render () {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex:1}}>
        <View style={{flex:4, backgroundColor: '#b0e0e6', padding: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="Username"
            onChangeText={(username) => this.setState({username})}
          />
          <TextInput
            style={{height: 40}}
            placeholder="password"
            onChangeText={(password) => this.setState({password})}
          />
          <Button
            onPress={() => navigate('Home', {name: this.state.username})}
            title="Login"
            color="#841584"
            accessibilityLabel="Click this shit to login"
          />
          
        </View>
        <View style={{flex:1, backgroundColor: '#808080'}}/>
      </View>
    );
  }
}
  // setMessage = () => this.setState({message: this.state.username + this.state.password});

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { region: {
        latitude:  37.78825,
        longitude: -122.4324,
        latitudeDelta:  0.0922,
        longitudeDelta: 0.0421,
      },
      location: '',
    }
  }
  static navigationOptions = ({navigation}) => ({
    title: "Welcome " + navigation.state.params.name
  });
  render () {
    const {params} = this.props.navigation.state;
    return (
      // <View style={{flex:1}}>
        // <View style={{flex:4, backgroundColor: '#b0e0e6', padding: 10}}>
        <View style={styles.container}>
          <MapView style={styles.map}
            initialRegion={{
              latitude:  37.78825,
              longitude: -122.4324,
              latitudeDelta:  0.0922,
              longitudeDelta: 0.0421,
            }}/>
      <View style={{flex:1}}>
        <View style={{flex:4, backgroundColor: '#b0e0e6', padding: 10}}>
          <Text>
            {params.name}
          </Text>
           <View style={[position: 'absolute', bottom: 0, left: 0, right: 0, height: 50]}>

           <TextInput
            style={{height: 40}}
            placeholder="location"
            onChangeText={(password) => this.setState({location})}
          /> </View>
          <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
          />

        </View>
      </View>
    );
  }
  // this is for dealing with the map view
  getInitialState(){
    return {
      region: {
        latitude:  37.78825,
        longitude: -122.4324,
        latitudeDelta:  0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }
}

const Walker = StackNavigator({
  Login: {screen: LoginScreen},
  Home:  {screen: HomeScreen},

});

export default Walker;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

AppRegistry.registerComponent('Walker', () => Walker);