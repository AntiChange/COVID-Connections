
import { AuthProvider } from "./auth";
import AppRoutes from './AppRoutes'


import Constants from 'expo-constants';

import React, { useEffect, useState } from 'react';
import {  StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';
import 'react-native-gesture-handler';
import Settings from "./components/Settings";

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
