import React, { useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuthState, useAuthDispatch, restoreToken } from './auth';

const Stack = createStackNavigator();
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

	return (
		<NavigationContainer>
        <Stack.Navigator>
        {userDetails.token != null ? (
            <Stack.Screen name="Home" component={Home}/>
        ) : (
            <Stack.Screen name="Register" component={Register} />,
            <Stack.Screen name="Login" component={Login} />
        )}
        </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRoutes;