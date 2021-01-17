import React, { useState } from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import MyComponent from './AddConnection';
import { useAuthDispatch, logout } from '../auth';


const CONTENT = [
  {
    title: 'Bob Joe - Healthy',
    content: "Status: " + "Self-isolating, " + "Unvaccinated" + "\n\n" + "January 16th" + " - " + "Went to grocery store\nJanuary 14th - Went to friends birthday party\nJanuary 4th - Returned from Italy trip",
  },
  {
    title: 'Billy Joe - Possible Contact',
    content: "Status: Sick, Self-isolating\n\nWeekly - Works at office\nJanuary 14th - Started to feel unwell\nJanuary 12th - Went to bar after work",
  },
  {
    title: 'Billy Bob - Healthy',
    content: "Status: Frontline Worker, Vaccinated\n\nWeekly - Works as Restaurant waiter\nJanuary 12th - Went to eat in nearby restaurant\nJanuary 1th - Celebrated with 2 friends",
  },
];



export default function Home() {
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const multipleSelect = false;

  const dispatch = useAuthDispatch();

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
        <Text style={styles.headerText}>{section.title}</Text>
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
    
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
        <Text style={styles.title}>Contacts</Text>

        <MyComponent />

        

        <TouchableOpacity onPress={toggleExpanded}>
          
        </TouchableOpacity>
        <Collapsible collapsed={collapsed} align="center">
          <View style={styles.content}>
            <Text>
              Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
              ribs
            </Text>
          </View>
        </Collapsible>
        <Accordion
          activeSections={activeSections}
          sections={CONTENT}
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
          //currently placeholder function
          onPress={handleLogout}
          > Log Out </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
  },
  headerText: {
    textAlign: 'left',
    fontSize: 20
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
    backgroundColor: '#F5FCFF',
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