import React, {useEffect, useState } from 'react'
import { AsyncStorage, ActivityIndicator, StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';




function Toggle({title, id}) {
  const [text, setText] = useState('0')
  const [output, setOutput] = useState('Off')
  return (
    <View style={styles.container}>
      <View style={styles.button}>
      <Button
        backgroundColor = {'#fff'}
        color = {'#00CC20'}
        title={title}
        onPress={() => {
          if (text == '1') {
            setText('0')
            setOutput('Off')
            console.log(`${title}`, false)
          } else {
            setText('1')
            setOutput('On')
            console.log(`${title}`, true)
          }
          
        }}
      />
      <Text>{`${title} is ${output}`}</Text>
    </View>
    </View>
  )
}

export default function App() {
  
  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Toggle title="Show Status to Close Contacts" id={0}/>
      <Toggle title="Show Status to Other Contacts" id={1} />
      <Toggle title="Show Status to Non-Contacts" id={2} />
      <Toggle title="Hide My Connections" id={3} />
      <Toggle title="Hide Me From Other's Connections List" id={4} />
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