import React, { useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuthState, useAuthDispatch, restoreToken } from './auth';

import DrawerNav from "./components/DrawerNav";

const Stack = createStackNavigator();
function AppRoutes() {
    
    const dispatch = useAuthDispatch();
    async function getToken() {
        await restoreToken(dispatch);
    }

    useEffect(() => {
        getToken()
            .then(()=>{return})
            .catch(err=>console.log(err))
    }, []);

    const userDetails = useAuthState();
    
	return (
		<NavigationContainer independent={true}>
        <Stack.Navigator>
        {userDetails.token != null ? (
            <Stack.Screen name="COVID Connections" component={DrawerNav}/>
        ) : (
            <React.Fragment>
            <Stack.Screen name="Login" component={Login} /><Stack.Screen name="Register" component={Register} />  
            </React.Fragment>
        )}
        </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRoutes;