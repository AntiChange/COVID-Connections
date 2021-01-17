import React, { useEffect, useState } from 'react';
import { loginUser, useAuthState, useAuthDispatch } from '../auth';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, navigation} from 'react-native';
import 'react-native-gesture-handler';
/*import PasswordField from './PasswordField';
import UsernameField from './UsernameField';*/
import { Button, TextInput } from 'react-native-paper';
import { register } from '../auth/actions';



function Register({ navigation }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
    const [fullName, setName] = useState('');

	const dispatch = useAuthDispatch();
	const { loading, errorMessage } = useAuthState();

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
      let response = await register(dispatch, { username: username, password: password, name: fullName });
      navigation.push("Login")

		} catch (error) {
			console.log(error);
		}
    };
    
	return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
                  
          <View>
              
              <Text
                  style={{fontSize: 30}}
                  >Register</Text>

                <Text style={{marginBottom:20, marginTop: 15}}>
                <Text>Have an account? </Text>
                <Text 
                  style={{color:"#B19CD9"}}
                  onPress={() => navigation.push("Login")}
                    > Login</Text></Text>

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
                <TextInput
                label="Full name"
                value={fullName}
                onChangeText={fullName => setName(fullName)}
                />
                <Text></Text>
      
                <Text 
                backgroundColor = "#FFFFFFF"
                style={styles.button3} 
                //currently placeholder function
                onPress={handleRegister}
                >Register</Text>
      
                <Text></Text>
    
            </View>
                  
          </ScrollView>
        </SafeAreaView>
        );
}

export default Register;


const styles = StyleSheet.create({
  button3: {
    backgroundColor: '#B19CD9',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    width: 170,
    textAlign:"center",
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
  }
});
