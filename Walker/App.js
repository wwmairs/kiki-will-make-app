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
import * as firebase from 'firebase';
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyAUpGSyNbrvNx5YWkdEcw_r_82nU49Cr3Y');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYskD5dqLkVlICUQ3HYTOQOw5sRQJPZts",
  authDomain: "walker-3cf27.firebaseapp.com",
  databaseURL: "https://walker-1d950.firebaseio.com/",
  storageBucket: "walker-3cf27.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const LAT_DELTA = .01;
const LNG_DELTA = .01;

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
        <View style={{
          flex:4, 
          backgroundColor: '#b0e0e6', 
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',

        }}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(username) => this.setState({username})}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={(password) => this.setState({password})}
          />
          <Button
            onPress={() => navigate('Directions', {name: this.state.username})}
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

export class DirectionsScreen extends React.Component {
  static navigationOptions = {
    // title: this.props.navigation.username,
  };
  constructor(props) {
    super(props);
    this.state = {origin: '',
                  destination: '',
                  message: ''};
    this.state = { 
        region: {
          latitude:  0,
          longitude: 0,
          latitudeDelta:  LAT_DELTA, 
          longitudeDelta: LNG_DELTA,
        },
        error: null,
        params: this.props.navigation.state,
        coords: []
    }
    this.itemsRef = firebaseApp.database().ref();
  };

  componentDidMount() {
    var positionName;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        Geocoder.getFromLatLng(position.coords.latitude,
                               position.coords.longitude).then(
          json => {
            var address_component = json.results[0].address_components[0];
            positionName = address_component.long_name;
          },
          error => {
            alert(error);
          }
        );

        this.setState({
          region:  {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta,
          },
          error: null,
          origin: positionName,
        });
      },
      (error) => this.setState({error: error.message}),
      {}
    );
  }
  render () {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex:1}}>
        <View style={{
          flex:4, 
          backgroundColor: '#b0e0e6', 
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',

        }}>
          {/* react-native-maps ! ty airbnb */}
          <View style={styles.container}>
            <MapView style={styles.map}
                     region={this.state.region}>
              <MapView.Marker
                coordinate={{
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude
                }}
              />
            </MapView>
          </View>
          {/*<TextInput
            style={styles.input}
            placeholder={"Start Location"}
            onChangeText={(origin) => this.setState({origin})}
          />*/}
          <TextInput
            style={styles.input}
            placeholder="Where are you headed?"
            onChangeText={(destination) => this.setState({destination})}
          />
          <Button
            onPress={() => navigate('Map', {start: this.state.region,
                                            end:   this.state.destination})}
            title="Start Walking"
            color="#841584"
            accessibilityLabel="Click here to start walk"
          />
          
        </View>
        <View style={{flex:1, backgroundColor: '#808080'}}/>
      </View>
    );
  }
}

export class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map'
  };
  decode(t,e){for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}

  constructor(props) {
    super(props);
    const {params} = this.props.navigation.state;

    // this maps craziness is inspired by 
    // https://github.com/airbnb/react-native-maps/issues/929
    const mode = 'walking';
    const origin = params.start;
    const destination = params.end;
    const APIKEY = 'AIzaSyAUpGSyNbrvNx5YWkdEcw_r_82nU49Cr3Y';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude + ',' + origin.longitude}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

    // this shit HATES tufts secure; use tufts guest for demo
    fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.routes.length) {
                this.setState({
                    coords: this.decode(responseJson.routes[0].overview_polyline.points) // definition below
                });
            }
        }).catch(e => {console.warn(e)});


    this.state = { 
        region: {
          latitude:  0,
          longitude: 0,
          latitudeDelta:  LAT_DELTA,
          longitudeDelta: LNG_DELTA,
        },
        error: null,
        params: this.props.navigation.state,
        coords: []
    }
    this.itemsRef = firebaseApp.database().ref();
  }


  // listenForItems(itemsRef) {
    
  // }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region:  {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta,
          },
          error: null,
        });
      },
      (error) => this.setState({error: error.message}),
      {}
    );
  }

  render () {
    const {params} = this.props.navigation.state;
    return (
      <View style={{flex:1}}>
        <View style={{flex:4, backgroundColor: '#b0e0e6', padding: 10}}>
          <View style={styles.container}>
            <MapView style={styles.map}
                     region={this.state.region}>
              <MapView.Polyline
                coordinates={this.state.coords}
                strokeWidth={4}
                strokeColor={'#42aaf4'}
              />
              <MapView.Marker
                coordinate={{
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude
                }}
              />
            </MapView>
          </View>
        </View>
      </View>
    );
  }

}

const Walker = StackNavigator({
  // Login:      {screen: LoginScreen},
  Directions: {screen: DirectionsScreen},
  Map:        {screen: MapScreen},

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
  input: {
    height: 40,
    width: 160,

  },
});

AppRegistry.registerComponent('Walker', () => Walker);