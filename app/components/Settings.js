import React, {useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useAuthState } from '../auth';

function Toggle({on, title, id}) {
  const [text, setText] = useState(on)
  const [output, setOutput] = useState('Off')
  const [color, setColor] = useState('#3bd247')
  const ROOT_URL = 'http://10.0.0.73:5000';

  async function changeSetting() {
    
    const userDetails = useAuthState();
    let response = await fetch(`${ROOT_URL}/api/settings/edit-index`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userDetails.token
        },
        body: JSON.stringify({index:id, setting: text})
      });
    let status = await response.json();
    console.log(status);

  }
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
            changeSetting();
          } else {
            setText(true)
            setColor('#3bd247')
            setOutput('ON')
            changeSetting();
          }
          
        }}>
            <Text style={{color:"#fff", fontWeight: "bold"}}>{output}</Text>
        </TouchableOpacity>
        </View>
  )
}

export default function Settings() {
  const [initialSettings, setSettings] = useState([false, false, false, true, true]);
  const ROOT_URL = 'http://10.0.0.73:5000';
  async function getData() {
    const userDetails = useAuthState();
    let response = await fetch(`${ROOT_URL}/api/settings/`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + userDetails.token
        }});
    let data = await response.json();
    return data;
  }
  useEffect(() => {
    getData()
        .then(data => {
            initialSettings = data;
        })
  }, [])
  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Toggle on={initialSettings[0]} title="Show Status to Close Contacts" id={0}/>
      <Toggle on={initialSettings[1]} title="Show Status to Other Contacts" id={1} />
      <Toggle on={initialSettings[2]} title="Show Status to Non-Contacts" id={2} />
      <Toggle on={initialSettings[3]} title="Hide My Connections" id={3} />
      <Toggle on={initialSettings[4]} title="Hide Me From Other's Connections List" id={4} />
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