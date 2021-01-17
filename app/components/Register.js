import React, { useEffect, useState } from 'react';
import { useAuthState, useAuthDispatch } from '../auth';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import { Modal, Portal, Provider, TextInput } from 'react-native-paper';
import { register, doneError } from '../auth/actions';

function Register({ navigation }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
  const [fullName, setName] = useState('');

	const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  useEffect(() => {
    if (errorMessage && errorMessage != "") {
      setPassword("");
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      doneError(dispatch);
    }
  })

	const handleRegister = async (e) => {
		e.preventDefault();
    if (username && password && fullName && username != "" && password != "" && fullName != "") {
      try {
        let response = await register(dispatch, { username: username, password: password, name: fullName });
        if (response == true) {
          navigation.navigate("Login")
        }
      } 
      catch (error) {
        console.log(error);
      } 
    }
  };
    
	return (
    <Provider>
    <SafeAreaView style={styles.container}>
      <ScrollView >      
      <View>
          <Portal>
            <Modal visible={loading}>
              <ActivityIndicator size={100} color="#B19CD9" animating={loading} />
            </Modal>
          </Portal>
          <Text
              style={{fontSize: 30}}
              >Register</Text>

            <Text style={{marginBottom:20, marginTop: 15}}>
            <Text>Have an account? </Text>
            <Text 
              style={{color:"#B19CD9"}}
              onPress={() => navigation.navigate("Login")}
                > Login</Text></Text>

            <TextInput
            label="Full name"
            value={fullName}
            onChangeText={fullName => setName(fullName)}
            />
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
            secureTextEntry={true}
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
    </Provider>
    );
}

export default Register;


const styles = StyleSheet.create({

  
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight:50
  },

  button3: {
    backgroundColor: '#B19CD9',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    width: 170,
    textAlign:"center",
    justifyContent: 'center'
  },
  
  scrollView: {
    
  },
  text: {
      fontSize: 50,
      fontWeight: 'bold'
  },
});
