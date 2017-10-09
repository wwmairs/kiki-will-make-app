import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World!</Text>
      </View>
    );
  }
}

export default class Background extends Component {
  render () {
    return (
      <View style={{flex:1}}>
        <View style={{flex}}: 4, backgroundColor: 'powederblue'}}/>
        <View style={{flex}}: 1, backgroundColor: 'grey'}}/>
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
});