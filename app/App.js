import React, {useEffect, useState } from 'react'
import { AsyncStorage, StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';


function Toggle({title}) {
  const [text, setText] = useState('Off')
  return (
    <View style={styles.button}>
      <View >
      <Button style={styles.button}
        title={title}
        onPress={() => {
          if (text == 'On') {
            setText('Off')
            console.log(`${title}`, false)
          } else {
            setText('On')
            console.log(`${title}`, true)
          }
          
        }}
      />
      <Text style={styles.button}>{`${title} is ${text}`}</Text>
    </View>
    </View>
  )
}

export default function App() {
  const getAllLogs = async () => {
    const url = logURL;
    try {
        return fetch(url, { method: "GET", })
            .then((response) => response.json())
            .then((logs) => {
                return logs;
            })
    } catch (error) {
        console.log(error);
    }
}

  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Toggle title="Show Status to Close Contacts" />
      <Toggle title="Show Status to Other Contacts"/>
      <Toggle title="Show Status to Non-Contacts"/>
      <Toggle title="Hide My Connections"/>
      <Toggle title="Hide Me From Other's Connections List"/>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8DFF50',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    width: 150,
    justifyContent: 'center',
    marginBottom: 10
 },
  container: {
  flex: 1,
  paddingTop: 100,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},

  scrollView: {

  },
  
  text: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});