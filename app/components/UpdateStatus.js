import React, { useEffect, useState } from 'react';
import {TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import Tags from "react-native-tags";

export default function UpdateStatus() {
    const [exposureSelectedValue, setExposureSelectedValue] = useState("noExposure");
    const [isolationSelectedValue, setIsolationSelectedValue] = useState("isolationFalse");
    const [needs, setNeeds] = useState(["Groceries", "Friend"]); //should get pulled from DB, they are mutable and saved
    // const [needsField, setNeedsField] = useState(""); //dont touch this
    const [dailyActivities, setDailyActivities] = useState(["Grocery Shopping"]); //Append these to DB with current day as timestamp

    
    return (
        <ScrollView>
            <View style={{marginStart: 25, marginEnd: 30, marginBottom:100}}>
                <View style={styles.container}>
                    <Text style={styles.header}>Update Your Status</Text>
                </View>
                <View>
                    <Text style={styles.sectionHeader}>COVID-19 Exposure</Text>

                    {/* <Text style={styles.sectionText}>To the best of your knowledge which of the following describes your exposure to COVID-19</Text> */}
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={exposureSelectedValue}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => setExposureSelectedValue(itemValue)}
                        >
                            <Picker.Item label="No known exposure" value="noExposure" />
                            <Picker.Item label="Possible Contact with Confirmed Case" value="potentialContact" />
                            <Picker.Item label="Close Contact with Confirmed Case" value="definiteContact" />
                            <Picker.Item label="Tested Positive for COVID-19" value="positiveCase" />
                        </Picker>
                    </View>
                </View>

                <View>
                    <Text style={styles.sectionHeader}>Isolation Status</Text>

                    {/* <Text style={styles.sectionText}>Are you currently self-isolating?</Text> */}
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={isolationSelectedValue}
                            style={styles.picker}
                            dropdownIconColor={"black"}
                            onValueChange={(itemValue, itemIndex) => setIsolationSelectedValue(itemValue)}
                        >
                            <Picker.Item label="No" value="isolationFalse" />
                            <Picker.Item label="Yes" value="isolationTrue" />
                        </Picker>
                    </View>
                </View>

                <View>
                    <Text style={styles.sectionHeader}>Do you need a hand with anything?</Text>

                    {/* <Text style={styles.sectionText}>Enter the kinds of things you feel you might need a hand with, the connections
                    you have with the appropriate permissions will be able to see these and could reach out to you. Tap on items below to
                    remove them from your list</Text> */}

                    {/* <TextInput
                        style={{ paddingStart: 12, width : 120, height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setNeedsField(text)}
                        value={needsField}
                    /> */}

                    <Tags
                        initialText=""
                        textInputProps={{
                        placeholder: "What do you need a hand with?"
                        }}
                        initialTags={needs}
                        onChangeTags={tags => console.log(tags)}
                        onTagPress={(index, tagLabel, event, deleted) =>
                            console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                        }
                        containerStyle={{ justifyContent: "flex-start" }}
                        inputStyle={{  borderWidth: 2, borderRadius:25, borderColor: "#B19CD9" , backgroundColor: "white" }}
                        renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                        <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                            <Text style={styles.tag}>{tag}</Text>
                        </TouchableOpacity>
                        )}
                    />

                </View>

                <View>
                    <Text style={styles.sectionHeader}>Recent Activity </Text>

                    <Text style={styles.sectionText}>Were there any times you were in close contact with someone (outside of those you live with) or
                    public areas you visited today?</Text>

                    <Tags
                        initialText=""
                        textInputProps={{
                        placeholder: "Activity"
                        }}
                        initialTags={dailyActivities}
                        onChangeTags={tags => console.log(tags)}
                        onTagPress={(index, tagLabel, event, deleted) =>
                            console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                        }
                        containerStyle={{ justifyContent: "flex-start" }}
                        inputStyle={{  borderWidth: 2, borderRadius:25, borderColor: "#B19CD9" , backgroundColor: "white" }}
                        renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                        <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                            <Text style={styles.tag}>{tag}</Text>
                        </TouchableOpacity>
                        )}
                    />

                </View>
            </View>
        </ScrollView>
    );
}

//https://medicalxpress.com/news/2020-04-covid-contagious-longer.html

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
    },
    header: {
        fontSize: 35,
        margin: 10,
        marginBottom:0,
        fontWeight: 'bold'
    },

    sectionHeader: {
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 30,
        marginBottom:10,
        fontWeight: 'bold',
    },

    sectionText: {
        fontSize: 14,
        textAlign: 'left',
        margin: 10,
        marginTop:0,
        color: "#777777", 
    },

    pickerWrapper: {
        marginLeft: 10,
        marginRight: 10,
        paddingStart:10,
        borderRadius: 10,
        backgroundColor:"#B19CD9"
    },

    picker: {
        height: 40,
        width: 300,
        fontSize: 14,
    },

    tag: {
        backgroundColor: "#B19CD9",
        margin: 5,
        borderRadius: 25,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
    }
})
