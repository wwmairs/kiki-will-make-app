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
  Button
  // AppRegistry
} from 'react-native'
import {
  StackNavigator,
} from 'react-navigation'

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
  }
  static navigationOptions = ({navigation}) => ({
    title: "Welcome " + navigation.state.params.name
  });
  render () {
    const {params} = this.props.navigation.state;
    return (
      <View style={{flex:1}}>
        <View style={{flex:4, backgroundColor: '#b0e0e6', padding: 10}}>
          <Text>
            {params.name}
          </Text>
          
        </View>
        <View style={{flex:1, backgroundColor: '#808080'}}/>
      </View>
    );
  }
}

const Walker = StackNavigator({
  Login: {screen: LoginScreen},
  Home:  {screen: HomeScreen},
});

export default Walker;

// AppRegistry.registerComponent('Walker', () => Walker);