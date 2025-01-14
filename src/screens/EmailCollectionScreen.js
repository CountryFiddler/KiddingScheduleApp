import HomeScreen from "./HomeScreen";
import {Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import React, {useState} from "react";
import Parse from 'parse/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


// Initialize Parse only once
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('IQKXcMx3dHAEhNwzvjVCQdJQF4Pi9pIJZ1cWCLtD', 'hyrqRPfqz1eXwgoU6DyoZ6jwtAaF7TgeuuCGQaya');
Parse.serverURL = 'https://parseapi.back4app.com/';

const EmailCollectionScreen = props => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [emailAddress, setEmailAddress] = useState('')
    const doUserRegistration = async function () {
        /*let currentUser = Parse.User.current();
        if (currentUser) {
            // do stuff with the user
            Parse.User.logOut();
        }*/
        AsyncStorage.clear();
        // Note that these values come from state variables that we've declared before
        	  const usernameValue = emailAddress;
        	  const passwordValue = emailAddress;
        	  // Since the signUp method returns a Promise, we need to call it using await
        	  return await Parse.User.signUp(usernameValue, passwordValue)
        	    .then((createdUser) => {
            	      // Parse.User.signUp returns the already created ParseUser object if successful
            	      Alert.alert(
                	        'Success!',
                	        `User ${createdUser.getUsername()} was successfully created!`,
                	      );
            	      return true;
            	    })
        	    .catch((error) => {
            	      // signUp can fail if any parameter is blank or failed an uniqueness check on the server
            	      Alert.alert('Error!', error.message);
                      console.log(error);
            	      return false;
            	    });
        	};

    async function storeEmailAddress(key) {
        try {
            if (isValidEmail) {
                console.log(emailAddress);
                await AsyncStorage.setItem(key, JSON.stringify(true));
                // const user = new Parse.User();
                await doUserRegistration();
            }
        } catch (error) {
            console.error('Error Collecting Email Address', error);
        }
    }

    const [isValidEmail, setIsValidEmail] = useState(true);

    const validateEmail = (input) => {
        setIsValidEmail(emailRegex.test(input)); // Validate email
        setEmailAddress(input); // Update the input value
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.messageText}>Enter Your Email Address to Get Started</Text>
            <TextInput
                style={[styles.emailAddressContainer, {borderColor: isValidEmail ? 'green' : 'red' }]}
                autoCapitalize={'none'}
                placeholderTextColor='grey'
                placeholder={'Email Address'}
                value={emailAddress}
                keyboardType={'email-address'}
                onChangeText={text => validateEmail(text)}/>
            {!isValidEmail && emailAddress.length > 0 && (
                <Text style={styles.errorText}>Invalid email address</Text>
            )}
            <TouchableOpacity onPress={() => {storeEmailAddress('emailCollected')}}>
                <View style={styles.submitButtonContainer}>
                    <Text
                        style={styles.submitButtonText}>Submit</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.footerSpacing}/>
        </View>
    );
};


const styles = StyleSheet.create({
    mainContainer: {flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: 'center'
        , marginTop: '2%', height: '5%'},
    addOrEditButtonsContainer: {flexDirection: 'row', width: '25%', justifyContent: 'space-between',},
    iconButtons: {margin: '2%'},
    headerContainer: { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', width: '95%'
        , marginTop: '2%', height: '5%'},
    headers: {fontWeight: "bold", fontSize: 24, fontFamily: 'WestonFree', color: '#12284B'},
    listView: {marginTop: '2%', width: '100%', flex: 1},
    editListView: {marginTop: '2%', width: '100%'},
    welcomeMessageContainer: {flex: 1, width: '95%',  alignItems: 'center', marginTop: '15%'},
    welcomeMessageText: {fontWeight: "bold", fontSize: 18, fontFamily: 'WestonFree', color: '#12284B', lineHeight: 35, textAlign: 'center'},
    editModeContainer: {flex: 1, width: '100%',  alignItems: 'center', marginTop: '5%', marginBottom: '10%'},
    doneButtonContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
    doneButtonText: {fontFamily: 'WestonFree',  fontSize: 22, color: 'white', padding: 10},
    footerSpacing: {padding: 25},
    editModeFooterSpacing: {padding: 50},
    emailAddressContainer: {
        padding: 15,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: "center",
    },
    submitButtonContainer: {flexDirection: 'column', padding: 5, alignItems: 'center', justifyContent: 'center', marginTop: '5%', backgroundColor: '#12284b', borderRadius: '10%', borderWidth: '3px',
        borderColor: '#12284B'},
    submitButtonText: {fontFamily: 'WestonFree',  fontSize: 22,  color: 'white', padding: 10},
    messageText: {fontFamily: 'Georgia',  fontSize: 20, marginTop: '2%', color: '#000000', marginBottom: '5%'},
})

/*
* Sending Email Code
* import React from 'react';
import { Button, Alert } from 'react-native';

const sendEmail = async () => {
  try {
    const response = await fetch('https://your-backend-api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'example@example.com',
        subject: 'Hello!',
        body: 'This is a test email.',
      }),
    });

    if (response.ok) {
      Alert.alert('Success', 'Email sent successfully!');
    } else {
      Alert.alert('Error', 'Failed to send email.');
    }
  } catch (error) {
    Alert.alert('Error', 'Unable to send email.');
  }
};

export default function App() {
  return <Button title="Send Email" onPress={sendEmail} />;
}
*/
export default EmailCollectionScreen;