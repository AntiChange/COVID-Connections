import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import { useAuthState } from '../auth';
import Constants from 'expo-constants';

const ROOT_URL = Constants.manifest.extra.serverUrl;

function Toggle({on, title, id}) {
  const [text, setText] = useState(on)
  const userDetails = useAuthState();

  async function changeSetting(isOn) {
    fetch(`${ROOT_URL}/api/settings/edit`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': userDetails.token
        },
        body: JSON.stringify({index:id, setting: isOn})
      })
      .then(response => response.json())
      .catch(err => console.log(err))

  }
  return (
      <View style={{marginTop:15}}>
      <View style={{height:35, justifyContent: "center"}}><Text style={{color: "#777777", fontWeight: "bold"}}>{title}</Text></View>
      <TouchableOpacity
        style={{
            backgroundColor: text==true? "#4dd256" : "#e64e4f",
            alignItems: 'center',
            padding: 10,
            borderRadius: 16,
            width: 170,
            height: 35,
            justifyContent: 'center',
            marginBottom: 10
        }}
        activeOpacity={0.6}
        onPress={() => {
          if (text == true) {
            setText(false)
            changeSetting(false);
          } else {
            setText(true)
            changeSetting(true);
          }
          
        }}>
        <Text style={{color:"#fff", fontWeight: "bold"}}>{text==true? "ON" : "OFF"}</Text>
        </TouchableOpacity>
        </View>
  )
}

export default function Settings() {
  const [initialSettings, setSettings] = useState(null);
  const userDetails = useAuthState();

  async function getData() {
    fetch(`${ROOT_URL}/api/settings/`, {
        method: 'GET',
        headers: {
          'Authorization': userDetails.token
    }})
      .then(response => response.json())
      .then(data => {
        if (data == undefined) {
          ToastAndroid.show("Error connecting to server", ToastAndroid.SHORT);
        }
        else {
          setSettings(data);
        }
      })
      .catch(err => {
        ToastAndroid.show("Error: " + err, ToastAndroid.SHORT);
      })
  }
  useEffect(() => {
    getData()
        .catch(err => console.log(err))
  }, []);


  return initialSettings == null ? (
    <Provider>
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <Portal>
        <Modal visible={true}>
          <ActivityIndicator size={100} color="#B19CD9" animating={true} />
        </Modal>
      </Portal>
      <Text style={styles.text}>Settings</Text>
    </View>
    </ScrollView>
    </Provider>
  ) : (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Toggle on={initialSettings[0]} title="Show Status to Close Contacts" id={0}/>
      <Toggle on={initialSettings[1]} title="Show Status to Other Contacts" id={1} />
      <Toggle on={initialSettings[2]} title="Show Status to Non-Contacts" id={2} />
      <Toggle on={initialSettings[3]} title="Hide My Connections" id={3} />
      <Toggle on={initialSettings[4]} title="Hide Me From Others' Connections Lists" id={4} />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 90,
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