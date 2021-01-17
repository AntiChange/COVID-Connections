import React, { useEffect, useState } from 'react';
import {  StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';
import 'react-native-gesture-handler';
import PasswordField from './PasswordField';
import UsernameField from './UsernameField';

export default function LoginScreen() {
    return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
              
      <View style={styles.test}>
          
          <Text
              style={{fontSize: 30}}
              >Covid Tracker++</Text>
            <Text></Text>
            <UsernameField />
            <Text></Text>
            <PasswordField/>
            <Text></Text>
  
            <Text 
            backgroundColor = "#FFFFFFF"
            style={styles.button1} 
            //currently placeholder function
            onPress={async () => {
              
            }}
            > Login </Text>
  
            <Text></Text>
  
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
        backgroundColor: '#B19CD9',
        alignItems: 'center',
        padding: 10,
        borderRadius: 16,
        width: 62,
        
        justifyContent: 'center'
        },
  
    button2: {
      backgroundColor: '#B19CD9',
      alignItems: 'stretch',
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
      
    },
      
    text: {
        fontSize: 50,
        fontWeight: 'bold'
    },
  
    textBox:  {
      flex: 1,
    },
   
  
    
    });
  
  