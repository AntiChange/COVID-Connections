import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./Home";
import Settings from "./Settings";
import Status from "./Status";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="My Status" component={Status} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
