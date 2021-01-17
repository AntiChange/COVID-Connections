import React from 'react';
import { AuthProvider } from "./auth";
import AppRoutes from './AppRoutes'
import 'react-native-gesture-handler';

export default function App({ navigation }) {
  return (
    <AuthProvider>
    <AppRoutes />
    </AuthProvider>
  );
}