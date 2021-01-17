import React, {useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

function Toggle({on, title, id}) {
  const [text, setText] = useState(on)
  const [output, setOutput] = useState('Off')
  const [color, setColor] = useState('#3bd247')
  return (
      <View style={{marginTop:15}}>
      <View style={{height:35, justifyContent: "center"}}><Text style={{color: "#777777", fontWeight: "bold"}}>{title}</Text></View>
      <TouchableOpacity
        style={{
            backgroundColor: color,
            alignItems: 'center',
            padding: 10,
            borderRadius: 16,
            width: 170,
            height: 35,
            justifyContent: 'center',
            marginBottom: 10
        }}
        title={output}
        activeOpacity={0.6}
        onPress={() => {
          if (text == true) {
            setText(false)
            setColor('#e64447')
            setOutput('OFF')
          } else {
            setText(true)
            setColor('#3bd247')
            setOutput('ON')
          }
          
        }}>
            <Text style={{color:"#fff", fontWeight: "bold"}}>{output}</Text>
        </TouchableOpacity>
        </View>
  )
}

export default function Settings() {
  
  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Toggle on={false} title="Show Status to Close Contacts" id={0}/>
      <Toggle on={false} title="Show Status to Other Contacts" id={1} />
      <Toggle on={false} title="Show Status to Non-Contacts" id={2} />
      <Toggle on={false} title="Hide My Connections" id={3} />
      <Toggle on={false} title="Hide Me From Other's Connections List" id={4} />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  scrollView: {

  },
  
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20
  }
});