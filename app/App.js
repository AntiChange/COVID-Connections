import React, { useEffect, useState } from 'react';
import {  StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';
import 'react-native-gesture-handler';




export default function App() {
  return (
  
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
            
    <View style={styles.container}>
        
        <Text
            style={{fontSize: 30}}
            >Covid Tracker++</Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>

          <Text 
          backgroundColor = "#FFFFFFF"
          style={styles.button1} 
          //currently placeholder function
          onPress={async () => {
            
          }}
          > Login </Text>

          

          <Text 
          backgroundColor = "#FFFFFFF"
          style={styles.button2} 
          //currently placeholder function
          onPress={async () => {
            
          }}
          > Register </Text>
        
      </View>
            
    </ScrollView>
  </SafeAreaView>
  );
}



  
const styles = StyleSheet.create({
button1: {
  backgroundColor: '#8DFF50',
  alignItems: 'center',
  padding: 10,
  borderRadius: 16,
  width: 63,
  justifyContent: 'center'
  },

button2: {
  backgroundColor: '#8DFF50',
  alignItems: 'center',
  padding: 10,
  borderRadius: 16,
  width: 80,
  justifyContent: 'center'
  },
  
container: {
  flex: 1,
  paddingTop: 100,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  },

scrollView: {
    flex: 1,
    paddingBottom: 30,
  },
  
  text: {
    fontSize: 50,
    fontWeight: 'bold'
    
  }
});

