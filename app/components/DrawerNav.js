import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./Home";
import Settings from "./Settings";
import UpdateStatus from "./UpdateStatus";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>You are on the notification screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Update Status" component={UpdateStatus} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
