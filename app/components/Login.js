import React, { useEffect, useState } from 'react';
import { loginUser, useAuthState, useAuthDispatch } from '../auth';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';
import 'react-native-gesture-handler';
import PasswordField from './PasswordField';
import UsernameField from './UsernameField';

function Login({ navigation }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAuthDispatch();
	const { loading, errorMessage } = useAuthState();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
            //let response = await loginUser(dispatch, { username, password });
            let response = await loginUser(dispatch, { username: "e", password: "abc" });

		} catch (error) {
			console.log(error);
		}
	};

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

export default Login;


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

