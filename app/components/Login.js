import React, { useEffect, useState } from 'react';
import { loginUser, useAuthState, useAuthDispatch } from '../auth';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
/*import PasswordField from './PasswordField';
import UsernameField from './UsernameField';*/
import { Button, TextInput } from 'react-native-paper';

function Login({ navigation }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAuthDispatch();
	const { loading, errorMessage } = useAuthState();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
            //let response = await loginUser(dispatch, { username, password });
            let response = await loginUser(dispatch, { username: username, password: password });

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
                <TextInput
                label="Username"
                value={username}
                onChangeText={username => setUsername(username)}
                />
                <Text></Text>
                <TextInput
                label="Password"
                value={password}
                onChangeText={password => setPassword(password)}
                />
                <Text></Text>
      
                <Text 
                backgroundColor = "#FFFFFFF"
                style={styles.button1} 
                //currently placeholder function
                onPress={handleLogin}
                > Login </Text>
      
                <Text></Text>
      
                <Text 
                backgroundColor = "#FFFFFFF"
                style={(styles.button2)} 
                //currently placeholder function
                onPress={() => navigation.navigate("Register")}
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

