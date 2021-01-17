import React, {useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';
import Settings from "./components/Settings";

export default function App() {
  
  return (
    <View style={styles.container}>
      <Settings />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});