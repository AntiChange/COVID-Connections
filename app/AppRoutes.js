import React, { useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuthState, useAuthDispatch, restoreToken } from './auth';

import DrawerNav from "./components/DrawerNav";

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
		<NavigationContainer independent={true}>
        <Stack.Navigator>
        {userDetails.token != null ? (
            <Stack.Screen name="COVID Connections" component={DrawerNav}/>
        ) : (
            <React.Fragment>
            <Stack.Screen name="Login" component={Login} /><Stack.Screen name="Registry" component={Register} />
            
            </React.Fragment>
            
            
            
        )}
        </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRoutes;