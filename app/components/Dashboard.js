import React from 'react';
import { useAuthDispatch, logout, useAuthState } from '../auth';
import {StyleSheet, View, Button, Text} from 'react-native';

function Dashboard({ navigation }) {
	const dispatch = useAuthDispatch();
	const userDetails = useAuthState();

	const handleLogout = () => {
		logout(dispatch);
		//navigation.navigate('Dashboard');
	};
	return (
		<View>
			<Button title="Logout" onPress={handleLogout} />
			<Text>Welcome</Text>
		</View>
	);
}

export default Dashboard;

const styles = StyleSheet.create({
	logoutBtn: {
		height: '30px',
		width: '100px'
	},
	
	dashboardPage: {
		display: "flex",
		width: "100%"
	}
})