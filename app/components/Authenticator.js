import React, { useEffect, useState } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as AppAuth from 'expo-app-auth';



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
    <View style={styles.container}>
      <Text style={{ color: "#000000" }}>  Sign in with Google</Text>
      <TouchableOpacity
        style = {styles.button}
        
        onPress={async () => {
          const _authState = await signInAsync();
          setAuthState(_authState);
        }}
        
      />
      <Text style={{ color: "#000000" }}>  Sign Out</Text>
      <TouchableOpacity
        style = {styles.button}
        
        onPress={async () => {
          await signOutAsync(authState);
          setAuthState(null);
        }}
      />
      
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
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0277BD',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        width: 120
    },
    container: {
      flex: 1,
      paddingTop: 400,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });