import React, {useEffect, useState } from 'react'
import { AsyncStorage, StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';




function Toggle({title, id}) {
  const [text, setText] = useState('Off')
  settings = getsettings()
  setText(settings[id])
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
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(' /* add in url here*/ https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json.settings))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Toggle title="Show Status to Close Contacts" id={0} />
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