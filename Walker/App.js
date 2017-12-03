/**
 * WILL AND KIKI MAKE AN APP!
 https://medium.com/dailyjs/react-native-email-authentication-with-firebase-4be20142b0a9

 https://hashnode.com/post/simple-login-system-using-react-native-firebase-and-nativebase-civwpo89u0lwyqe539bm66g0j
 */

import React, { Component } from "react"
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  AppRegistry
} from "react-native"
import {
  StackNavigator,
} from "react-navigation"
import MapView from "react-native-maps";
import * as firebase from "firebase";
import Geocoder from "react-native-geocoding";
import Communications from "react-native-communications";
import TimerMixin from "react-timer-mixin";

var reactMixin = require("react-mixin");
var Contacts = require("react-native-contacts");

Geocoder.setApiKey("AIzaSyAUpGSyNbrvNx5YWkdEcw_r_82nU49Cr3Y");

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDWaoQS54F6CbLdUx7JIb6YRKBE35GVu5k",
  authDomain: "walker-1d950.firebaseapp.com",
  databaseURL: "https://walker-1d950.firebaseio.com",
  projectId: "walker-1d950",
  storageBucket: "walker-1d950.appspot.com",
  messagingSenderId: "584103800641"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const LAT_DELTA = .01;
const LNG_DELTA = .01;

export class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login",
  };
  constructor(props) {
    super(props);
//    this.unsubscribe = null;
    this.state = {email: "",
                  password: "",
                  error:"",
                  loading: false,
                  message: "",
                };

//  this.itemsRef = firebaseApp.database().ref();
  };

   onLoginPress() {
        const {navigate} = this.props.navigation;
        this.setState({ error: "", loading: true });
        console.log("login pressed");

        const { email, password } = this.state;
        console.log(email);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => { this.setState({ error: "", loading: false });
                          console.log("bitch im authenticated");
                          navigate("Directions");
              })
            .catch(() => {
              console.log("login didnt work");
                //Login was not successful, let"s create a new account
              navigate("Signup", {email: this.state.email});
                
            });
    }

  componentDidMount() {
  const {navigate} = this.props.navigation;
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("HI IM HERE TOOO BITCH IN COMPONENTDIDMOUNT")
        console.log("what the fuck is user", user)
        navigate("Directions")
      }
    })
  }

  render () {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex:1}}>
        <View style={{
          flex:4,  //#b0e0e6
          backgroundColor: "#3498db", 
          padding: 3,
          alignItems: "center",
          justifyContent: "center",
        }}>
              <Text style = {styles.title}> Walker App! </Text>
              <TextInput
                style={styles.input}
                placeholder="email"
                placeholderTextColor = "rgba(255,255,255,0.7)"

                onChangeText={(email) => this.setState({email})}
              />
              <TextInput
                style={styles.input}
                placeholder="password"
                placeholderTextColor = "rgba(255,255,255,0.7)"
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
              />
              <TouchableOpacity style={styles.buttonContainer}>
                  <Button
                    onPress={() => navigate("Signup", {name: this.state.email})}

                    style = {styles.buttonText}
                    title="SIGNUP"
                    accessibilityLabel="Click this shit to login"
                  />

                  <Button
                   // onPress={() => navigate("Directions", {name: this.state.email})}
                   onPress={this.onLoginPress.bind(this)}

                    style = {styles.buttonText}
                    title="LOGIN"
                    accessibilityLabel="Click this shit to login"
                  />
              </TouchableOpacity>

         </View>
    </View>
    );
  }
}

export class SignupScreen extends React.Component {
  static navigationOptions = {
    title: "SignUp",
  };
  constructor(props) {
    super(props);
    this.state = {
                  email: this.props.navigation.state.email,
                  password: "",
                  error:[],
                  loaded: true,
                };

  //  this.itemsRef = firebaseApp.database().ref();
  }
  onSignUp() {
        this.setState({ error: "", loading: true });
        
        const { email, password } = this.state;
        console.log("im here in onSignUp, email is:" + email + "and password is: " + password);
                //Login was not successful, let"s create a new account
        firebase.auth().createUserWithEmailAndPassword(email, password)

                    .then(() => { this.setState({ error: "", loading: false })
                      console.log("im also here for create")
                          })
                    .catch((e) => {
                        if (e.code == "auth/weak-password") {
                          alert(e.message);
                        }
                        this.setState({ error: "Authentication failed.", loading: false });
                        console.log(e);
                        console.log(this.state.error)
                    });
    }

  render () {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex:1}}>
        <View style={{
          flex:4,  //#b0e0e6
          backgroundColor: "#3498db", 
          padding: 3,
          alignItems: "center",
          justifyContent: "center",
        }}>
              <Text style = {styles.title}> SignUp! </Text>
              
               <TextInput
                style={styles.input}
                placeholder="name"
                placeholderTextColor = "rgba(255,255,255,0.7)"

                onChangeText={(name) => this.setState({name})}
              />
              <TextInput
                style={styles.input}
                placeholder={this.state.email}
                placeholderTextColor = "rgba(255,255,255,0.7)"
                onChangeText={(email) => this.setState({email})}
                value = {this.state.email}
              />
              <TextInput
                style={styles.input}
                placeholder="password"
                placeholderTextColor = "rgba(255,255,255,0.7)"
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
                value = {this.state.password}
              />
              
              <TouchableOpacity style={styles.buttonContainer}>
                  <Button
                  // onPress={() => navigate("Directions", {name: this.state.username})}
                    onPress={this.onSignUp.bind(this)} 
                    style = {styles.buttonText}
                    title="Sign me up baby!!"
                    accessibilityLabel="Click this shit to login"
                  />
              </TouchableOpacity>

         </View>
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
    this.state = {origin: "",
                  destination: "",
                  message: ""};
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
   // this.itemsRef = firebaseApp.database().ref();
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
          flex:1, 
          backgroundColor: "#b0e0e6", 
          justifyContent: "center",
          alignItems: "center",
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
            onPress={() => navigate("Contacts", {start: this.state.region,
                                            end:   this.state.destination})}
            title="Start Walking"
            color="#841584"
            accessibilityLabel="Click here to start walk"
          />
        </View>
        <View style={{}}/>
      </View>
    );
  }
}

export class ContactsScreen extends React.Component {
  static navigationOptions = {
    title: "Contacts"
  };


  constructor(props) {
    super(props);
    const {params} = this.props.navigation.state;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { 
        start: params.start,
        end: params.end,
        dataSource: ds.cloneWithRows([]),
        selectedContacts: [],
        selectedDataSource: ds.cloneWithRows([]),
    };    
    this.itemsRef = firebaseApp.database().ref();
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    Contacts.getAll((err, contacts) => {
      if(err === "denied") {
        // error
        // console.warn(err);
      } else {
        this.setState({contacts});
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var dataSource = ds.cloneWithRows(this.state.contacts);
        this.setState({dataSource});
      }
      
    });


  }

  render () {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex:1}}>
        <View style={{flex:4, backgroundColor: "#b0e0e6", padding: 10}}>
          <TextInput
            style={styles.input}
            placeholder={"Search for contacts to notify"}
            onChangeText={(name) => this.updateContactsList(name)}
            />
          <ListView
            style={styles.contactList}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <TouchableHighlight underlayColor = "#008b8b" onPress = {this.addSelectedContact.bind(this, rowData)}> 
            <Text>{rowData.givenName}</Text>
            </TouchableHighlight>}
            />
          <View>
            <Text>Contacts to notify</Text>
            <ListView
              style={styles.contactList}
              dataSource={this.state.selectedDataSource}
              renderRow={(rowData) => <TouchableHighlight underlayColor = "#008b8b" onPress = {this.removeSelectedContact.bind(this, rowData)}> 
            <Text>{rowData.givenName}</Text>
            </TouchableHighlight>}
            />
          </View>
          <Button
            style={styles.startButton}
            onPress={() => {this.itemsRef.push({dest: this.state.end, 
                                                location: this.state.start})
              this.sendMessages()
              navigate("Map", {start: this.state.start,
                               end:   this.state.end,
                               contacts: this.state.selectedContacts})}}
            title="Start Walking"
            color="#841584"
            accessibilityLabel="Click here to start walk"
          />
        </View>
      </View>
    );
  }

  sendMessages() {
    var numbers = [];
    for (i = 0; i < this.state.selectedContacts.length; i++) {
      numbers.push(this.state.selectedContacts[i].phoneNumbers[0].number)
    }
    for (i = 0; i < numbers.length; i++) {
      console.log("want to send text to: ", numbers[i]);
      Communications.text(numbers[i]);
    }
  }

  addSelectedContact(newContact) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if (!this.state.selectedContacts.includes(newContact)) {
      this.setState(prevState => ({
        selectedContacts: [...prevState.selectedContacts, newContact],
        selectedDataSource: ds.cloneWithRows([...prevState.selectedContacts, newContact]),
      }));
    }

  }

  // this doesn"t work
  removeSelectedContact(oldContact) {
    console.log("wanna remove this one:");
    console.log(oldContact);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // var index = this.state.selectedContacts.indexOf(oldContact);
    // this.setState(prevState => ({
    //   selectedContacts: prevState.selectedContacts.splice(index, 1),
    //   selectedDataSource: ds.cloneWithRows(prevState.selectedContacts.splice(index, 1))
    // }))

  }

  updateContactsList(name){
    Contacts.getContactsMatchingString(name, (err, contacts) => {
        if(err === "denied") {
          // error
          // console.warn(err);
        } else {
          this.setState({contacts});
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          var dataSource = ds.cloneWithRows(this.state.contacts);
          this.setState({dataSource});
        }
        
      });
  }
}

export class MapScreen extends React.Component {
  static navigationOptions = {
    title: "Map"
  };
  decode(t,e){for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}

  constructor(props) {
    super(props);
    this.itemsRef = firebaseApp.database().ref();
    const {params} = this.props.navigation.state;

    // this maps craziness is inspired by 
    // https://github.com/airbnb/react-native-maps/issues/929
    const mode = "walking";
    const origin = params.start;
    const destination = params.end;
    const APIKEY = "AIzaSyAUpGSyNbrvNx5YWkdEcw_r_82nU49Cr3Y";
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude + "," + origin.longitude}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

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
        coords: [],
        end: params.end
    }
 //   this.itemsRef = firebaseApp.database().ref();
  }
  updatePosition(position) {
    console.log("updating...");
    this.setState({
      region:  {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: this.state.region.latitudeDelta,
        longitudeDelta: this.state.region.longitudeDelta,
      },
      error: null,
    });
    this.itemsRef.push({dest: this.state.end, 
                        location: this.state.region});
    const mode = "walking";
    const origin = this.state.region;
    const destination = this.state.end;
    const APIKEY = "AIzaSyAUpGSyNbrvNx5YWkdEcw_r_82nU49Cr3Y";
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude + "," + origin.longitude}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
    fetch(url)
    .then(response => response.json())
    .then(responseJson => {
        if (responseJson.routes.length) {
            this.setState({
                coords: this.decode(responseJson.routes[0].overview_polyline.points) // definition below
            });
        }
        // THIS IS IMPORTANT RIGHT HERE
        // this is the part that checks whether someone has arrived
        if ((responseJson.routes[0].legs.length == 1) &&
            (responeJson.routes[0].legs[0].distance.values < 50)) {
            // remove data from firebase
            // notify friends
            // navigate to completed walk screen
        }
        console.log(responseJson.routes[0].legs[0].distance.value);
    }).catch(e => {console.warn(e)});

  }
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
    // this.interval = this.setInterval(() => {this.updatePosition()}, 3000);
    navigator.geolocation.watchPosition((position) => this.updatePosition(position));
  }


  render () {
    const {params} = this.props.navigation.state;
    return (
      <View style={{flex:1}}>
        <View style={{flex:4, backgroundColor: "#b0e0e6", padding: 10}}>
          <View style={styles.container}>
            <MapView style={styles.map}
                     region={this.state.region}>
              <MapView.Polyline
                coordinates={this.state.coords}
                strokeWidth={4}
                strokeColor={"#42aaf4"}
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

reactMixin(MapScreen.prototype, TimerMixin);

const Walker = StackNavigator({
  Login:      {screen: LoginScreen},
  Signup:     {screen: SignupScreen},
  Directions: {screen: DirectionsScreen},
  Contacts:   {screen: ContactsScreen},
  Map:        {screen: MapScreen},

});


export default Walker;

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    width: 300,
    textAlign: "center",
    opacity:0.9,
    fontWeight: "bold",
    fontSize: 35,
    marginBottom:40,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex:1

  },
  input: {
    height: 40,
    width: 160,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom:20,
    color: 255,
    paddingHorizontal:10,
    justifyContent: "center",
  },

  buttonContainer: {
    backgroundColor: "#c9e9ff",
    justifyContent: "center",
  },

  buttonText :{
    textAlign: "center",
    color: "#FFFFFF"
  },
  startButton: {
    bottom: 5
  },
  contactList: {
    height: 50,
  },
});

AppRegistry.registerComponent("Walker", () => Walker);