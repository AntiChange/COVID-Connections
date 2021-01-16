import React, { useEffect, useState } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as AppAuth from 'expo-app-auth';

global.isSignedIn = false;

export default function Authenticator() {
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
    <View style={styles.container }>
        
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
            navigation.navigate()
            }}
          > Sign in with Google </Text>
        
      </View>
  );
        
  
  }
  
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
      paddingTop: 375,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });