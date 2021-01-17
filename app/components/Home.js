import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Modal, Portal, Provider, TextInput} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { useAuthDispatch, logout } from '../auth';

export default function Home() {
  const CONTENT = [
    {
      title: 'Aidan Lee', subtitle: 'Healthy',
      content: "Status: " + "Self-isolating, " + "Unvaccinated" + "\n\n" + "January 16th" + " - " + "Went to grocery store\nJanuary 14th - Went to friends birthday party\nJanuary 4th - Returned from Italy trip",
    },
    {
      title: 'Sarah Anderson', subtitle: 'COVID-19 Positive',
      content: "Status: Sick, Self-isolating\n\nWeekly - Works at office\nJanuary 14th - Started to feel unwell\nJanuary 12th - Went to bar after work",
    },
    {
      title: 'Lucas Flores', subtitle: 'Healthy',
      content: "Status: Frontline Worker, Vaccinated\n\nWeekly - Works as Restaurant waiter\nJanuary 12th - Went to eat in nearby restaurant\nJanuary 1st - Celebrated with 2 friends",
    },
  ];
  
  const newUser = {
    title: 'Liam Tucker', subtitle: 'Possible contact with COVID-19',
    content: "Status: Self-isolating, Unvaccinated\n\nWeekly - Works from home\nJanuary 15th - Went grocery shopping\nJanuary 10th - Visited family"
  }
  const [contentList, editContentList] = useState(CONTENT);
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const multipleSelect = false;
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = React.useState('');
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const dispatch = useAuthDispatch();

  function addUser() {
    let newContent = CONTENT;
    newContent.unshift(newUser);
    editContentList(newContent);
    forceUpdate();
  }

  function submitText() {
    ToastAndroid.show("Request sent", ToastAndroid.SHORT);
    setText("");
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
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text><Text style={styles.headerText}>{section.title}</Text><Text style={styles.headerText2}>  |  {section.subtitle}</Text></Text>
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
  return (
    <Provider>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
        <Text style={styles.title} onPress={() => setModalVisible(true)}>Your Circle</Text>

        <TextInput
          label="Add a user..."
          value={text}
          placeholderTextColor="#B19CD9"
          onChangeText={text => setText(text)}
          onEndEditing={submitText}
        />
        <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={{backgroundColor: "#B19CD9", padding:20, borderRadius:25}} style={{marginLeft:20, marginRight:20}}>
          <Text style={{fontWeight:"bold", fontSize:20, lineHeight: 30}}>Sarah Anderson has tested positive for COVID-19. If you have come into contact with Sarah in the past 14 days, please self-isolate and update your status.</Text>
        </Modal>
        </Portal>

        <Accordion
          activeSections={activeSections}
          sections={contentList}
          touchableComponent={TouchableOpacity}
          expandMultiple={multipleSelect}
          renderHeader={renderHeader}
          renderContent={renderContent}
          duration={400}
          onChange={setSections}
        />
        <Text 
          backgroundColor = "#FFFFFFF"
          style={styles.button1} 
          onPress={handleLogout}
          > Log Out </Text>
        
        <Text 
          backgroundColor = "#FFFFFFF00"
          style={{color:"#FFFFFFF00"}}
          onPress={addUser}
          style={{marginTop: 150, fontSize:20}}
          >                             </Text>
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