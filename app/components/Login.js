import React, { useState } from 'react';
import { loginUser, useAuthState, useAuthDispatch } from '../auth';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';

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
		<View>
			<Button onPress={handleLogin} title="login"/>
		</View>
	);
}

export default Login;

const styles = StyleSheet.create({
	container: {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        width: "200px"
    },
    error: {

    },
    
    loginForm: {
        display: "flex",
        flexDirection: "column",
    },
    
    loginFormItem: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "10px"
    }
})