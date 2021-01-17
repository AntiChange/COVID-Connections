import React, { useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import LoginScreen from './components/LoginScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuthState, useAuthDispatch, restoreToken } from './auth';

function AppRoutes() {
    
    async function getToken() {
        const dispatch = useAuthDispatch();
        await restoreToken(dispatch);
    }

    useEffect(() => {
        getToken();
        return;
    }, []);

    const userDetails = useAuthState();
    const Stack = createStackNavigator();

	return (
		<NavigationContainer>
        <Stack.Navigator>
        {userDetails.token != null ? (
            <Stack.Screen name="Home" component={Home}
                
                 />
        ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
        )}
        </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRoutes;