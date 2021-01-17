import React, { useState, useEffect } from 'react';
import { loginUser, useAuthState, useAuthDispatch, doneError } from '../auth';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import { Modal, Portal, Provider, TextInput } from 'react-native-paper';


function Login({ navigation }) {
    
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();
  
  useEffect(() => {
    if (errorMessage && errorMessage != "") {
      setPassword("");
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      doneError(dispatch);
    }
  })

	const handleLogin = async (e) => {
		e.preventDefault();
    if (username && password && username != "" && password != "") {
      try {
        let response = await loginUser(dispatch, { username: username, password: password });
      } 
      catch (error) {
        console.log(error);
      }
    }
  };
    
	return (
    <Provider>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>      
      <View>

          <Portal>
            <Modal visible={loading}>
              <ActivityIndicator size={100} color="#B19CD9" animating={loading} />
            </Modal>
          </Portal>
          
          <Text
              style={{fontSize: 30}}
              >COVID Connections</Text>
            <Text style={{marginBottom:20, marginTop: 15}}>
            <Text>Don't have an account? </Text>
            <Text 
              style={{color:"#B19CD9"}}
              onPress={() => navigation.navigate("Register")}
                > Register </Text></Text>

            <TextInput
              label="Username"
              value={username}
              onChangeText={username => setUsername(username)}
            />
            <Text></Text>
            <TextInput
            label="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
            />
            <Text></Text>
  
            <Text 
            backgroundColor = "#FFFFFFF"
            style={styles.button1} 
            onPress={handleLogin}
            > Login </Text>
  
            <Text></Text>

        </View>
      </ScrollView>
    </SafeAreaView>
    </Provider>
    );
}

export default Login;


const styles = StyleSheet.create({
  button1: {
    backgroundColor: '#B19CD9',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    width: 170,
    textAlign: "center",
    justifyContent: 'center'
  },

  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight:50
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

