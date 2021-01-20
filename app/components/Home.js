import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import {Modal, Portal, Provider, TextInput} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { useAuthDispatch, logout, useAuthState } from '../auth';
import Constants from 'expo-constants';

const ROOT_URL = Constants.manifest.extra.serverUrl;

export default function Home() {
  const [contentList, setContentList] = useState(null);
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const multipleSelect = false;
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = React.useState('');
  const [notifs, setNotifs] = React.useState([]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  async function getData() {
    fetch(`${ROOT_URL}/api/contacts/`, {
        method: 'GET',
        headers: {
          'Authorization': userDetails.token
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data == undefined) {
          ToastAndroid.show("Error connecting to server", ToastAndroid.SHORT);
        }
        else {
          setContacts(data);
        }
      })
      .catch(err => {
        ToastAndroid.show("Error: " + err, ToastAndroid.SHORT);
      })
  }

  async function getNotifications() {
    fetch(`${ROOT_URL}/api/notifications/`, {
      method: 'GET',
      headers: {
        'Authorization': userDetails.token
    }})
      .then(response => response.json())
      .then(data => {
        if (data) {
          setNotifs(data);
        }
      })
      .catch(err => console.log(err));
    }

  useEffect(() => {
    getData()
        .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    getNotifications()
        .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    if (notifs.length > 0) {
      setModalVisible(true);
    }
  }, notifs)

  function dismissModal() {
    setModalVisible(false);
    let newNotifs = notifs;
    newNotifs.shift();
    setNotifs(newNotifs);
  }

  async function addUser(username) {
    if (username == userDetails.user.username) {
      ToastAndroid.show(`Cannot add self`, ToastAndroid.SHORT);
      return;
    }
    setText("");
    if (username) {
      fetch(`${ROOT_URL}/api/contacts/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': userDetails.token
        },
        body: JSON.stringify({username:username})
      })
        .then(response => response.json())
        .then(data => {
          if (data == null) {
            return;
          }
          else if (typeof(data) == "string") {
            ToastAndroid.show(data, ToastAndroid.SHORT);
          }
          else {
            let newList = contentList;
            newList.push(formatUser(data));
            setContentList(newList);
          }
        })
        .catch(err => ToastAndroid.show(`Error: ${err}`, ToastAndroid.SHORT));
    }
  }

  function formatUser(contact) {
    let user = {
      title: contact.name,
    };
    // This is really annoying we need to fix this
    if (contact.covidStatus) { 
      switch(contact.covidStatus) {
        case "noExposure":
          user.subtitle = "No known exposure";
          break;
        case "potentialContact":
          user.subtitle = "Possible Contact with Confirmed Case";
          break;
        case "definiteContact":
          user.subtitle = "Close Contact with Confirmed Case";
          break;
        case "positiveCase":
          user.subtitle = "Tested Positive for COVID-19";
          break;
      }
    }
    else {
      user.subtitle = ""
    }
    let content = "";
    if (contact.otherStatus) {
      content = content + `Status: ${contact.otherStatus == "isolationTrue" ? "Self-isolating" : "Not self-isolating"}`;
    }
    if (contact.activities) {
      content += "\n\nRecent activity: ";
      contact.activities.forEach(activity => {
        content += `\n${activity}`;
      });
    }
    user.content = content;
    return user;
  }

  function setContacts(data) {
    if (data.length > 0) {
      setContentList(data.map(contact => {
        return formatUser(contact);
      }));
    }
    else {
      setContentList([]);
    }
    forceUpdate();
  }

  function handleLogout() {
		logout(dispatch);
  };

  function toggleExpanded() {
    setCollapsed(!collapsed);
  };

  function setSections(sections) {
    setActiveSections(sections.includes(undefined) ? [] : sections)
  };

  function renderHeader(section, _, isActive) {
    let subtitle;
    if (section.subtitle) {
      subtitle = (<Text style={styles.headerText2}>  |  {section.subtitle}</Text>);
    }
    else {
      subtitle = (<Text></Text>);
    }
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text><Text style={styles.headerText}>{section.title}</Text>{subtitle}</Text>
      </Animatable.View>
    );
  };

  function renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? 'zoomIn' : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  const contactsList = contentList == null ? (<View></View>) : (
    <Accordion
      activeSections={activeSections}
      sections={contentList}
      touchableComponent={TouchableOpacity}
      expandMultiple={multipleSelect}
      renderHeader={renderHeader}
      renderContent={renderContent}
      duration={400}
      onChange={setSections}
    />);
  return (
    <Provider>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
        <Text style={styles.title}>Your Circle</Text>

        <TextInput
          label="Add contact by username"
          value={text}
          placeholderTextColor="#B19CD9"
          onChangeText={text => setText(text)}
          onSubmitEditing={() => addUser(text)}
        />
        <Portal>
        <Modal visible={modalVisible} onDismiss={dismissModal} contentContainerStyle={{backgroundColor: "#B19CD9", padding:20, borderRadius:25}} style={{marginLeft:20, marginRight:20}}>
          <Text style={{fontWeight:"bold", fontSize:20, lineHeight: 30}}>{notifs[0]}</Text>
        </Modal>
        </Portal>

        {contactsList}

        <Text 
          backgroundColor = "#FFFFFFF"
          style={styles.button1} 
          onPress={handleLogout}
          > Log Out </Text>
      </ScrollView>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#F5FCFF',
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    textAlign: 'left',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    //backgroundColor: '#F5FCFF',
    paddingTop: 30,
  },
  headerText: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: "bold",
    color: "#555555"
  },
  headerText2: {
    textAlign: 'left',
    fontSize: 20,
    color: "#555555"
  },
  content: {
    paddingTop:10
  },
  active: {
    //backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    //backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    //backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  button1: {
    backgroundColor: '#B19CD9',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    width: 150,
    marginTop: 30,
    textAlign: "center",
    justifyContent: 'center'
  },
});