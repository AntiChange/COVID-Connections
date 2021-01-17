import React from 'react';
import { AuthProvider } from "./auth";
import AppRoutes from './AppRoutes'
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';


export default function App({ navigation }) {

  return (
    <AuthProvider>
    <AppRoutes />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: Constants.statusBarHeight,
  },
});
