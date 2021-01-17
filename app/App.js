import React, { useEffect, useState } from 'react';
import {  StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';
import 'react-native-gesture-handler';

import LoginScreen from "./components/LoginScreen";



export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}



  


  const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  });

