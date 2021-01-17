import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import Home from "./components/Home";


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Home />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: Constants.statusBarHeight,
  },
});