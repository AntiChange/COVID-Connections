import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { AsyncStorage, StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';
import Authenticator from './components/Authenticator';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as AppAuth from 'expo-app-auth';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Home" component = {HomeScreen}/>
          <Stack.Screen name = "Home" component = {HomeScreen}/>
          <Stack.Screen name = "Settings" component = {SettingsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
};

const LoginScreen = ({ navigation }) => {
  let [authState, setAuthState] = useState(null);

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  return (
  
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
            
    <View style={styles.container}>
        
        <Text
            style={{fontSize: 30}}
            >Covid Tracker++</Text>
          <Text></Text>

          <Text 
          alignItems = 'cemter'
          backgroundColor = "#FFFFFFF"
          style={styles.button} 
          onPress={async () => {
            const _authState = await signInAsync();
            setAuthState(_authState);
            console.log("This has run!")
            navigation.navigate('Home')
            }}
          > Sign in with Google </Text>
        
      </View>
            
    </ScrollView>
  </SafeAreaView>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView >
      <ScrollView style={styles.scrollView}>
        <Text>You are on the home screen!</Text>   
      </ScrollView>
    </SafeAreaView>
    );
  }

const SettingsScreen = ({navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView style = {styles.scrollView}>
        <text>Testing!</text>
      </ScrollView>
    </SafeAreaView>)
}

  
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8DFF50',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    width: 150,
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
  }
});


let config = {
  issuer: 'https://accounts.google.com',
  scopes: ['openid', 'profile'],
  /* This is the CLIENT_ID generated from a Firebase project */
  clientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
};

let StorageKey = '@MyApp:CustomGoogleOAuthKey';



export async function signInAsync() {
  let authState = await AppAuth.authAsync(config);
  await cacheAuthAsync(authState);
  console.log('signInAsync', authState);
  global.isSignedIn = true;
  console.log("This has run!");
  return authState;
}

async function cacheAuthAsync(authState) {
  return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

export async function getCachedAuthAsync() {
  let value = await AsyncStorage.getItem(StorageKey);
  let authState = JSON.parse(value);
  console.log('getCachedAuthAsync', authState);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }
  return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
  return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
  let authState = await AppAuth.refreshAsync(config, refreshToken);
  console.log('refreshAuth', authState);
  await cacheAuthAsync(authState);
  return authState;
}

export async function signOutAsync({ accessToken }) {
  try {
    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true,
    });
    await AsyncStorage.removeItem(StorageKey);
    return null;
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`);
  }
  global.isSignedIn = false;
}

