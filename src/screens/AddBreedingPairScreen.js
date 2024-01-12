import React, {useEffect, useState} from 'react';
import { View, Text, Modal, Button, StyleSheet, TextInput } from 'react-native';
//import {storeBreedingPair} from "../functions/AsyncStorageFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TouchableOpacity} from "react-native";

const AddBreedingPairScreen = props => {

    const [doe, setDoe] = useState('');
    const [buck, setBuck] = useState('');
    const [breedingDate, setBreedingDate] = useState('');
    const [kiddingDate, setKiddingDate] = useState('');

    const breedingPair = {
        doe: doe,
        buck: buck,
        breedingDate: breedingDate,
        kiddingDate: kiddingDate,
        id: '',
    }

     const addBreedingPair = () => {
        props.reRender();
     };

    async function storeBreedingPair (key, newData) {
        try {
            // Step 1: Retrieve existing array from AsyncStorage
            newData.id = newData.doe + newData.buck + newData.breedingDate + newData.kiddingDate;
           // console.log(newData.id);
            const existingData = await AsyncStorage.getItem(key);
            //  console.log(!Array.isArray(existingData));
            // console.log(existingData);
            if (existingData === null) {
                const breedingPairs = [newData]
                //console.log(breedingPairs);
                // Step 3: Save the updated array back to AsyncStorage
                await AsyncStorage.setItem(key, JSON.stringify(breedingPairs));
            } else {
                const parsedExistingBreedingPairs = existingData ? JSON.parse(existingData) : [];
                // Step 2: Concatenate the new data to the existing array
                const updatedData = [...parsedExistingBreedingPairs, newData];
                //  console.log(updatedData);
                await AsyncStorage.setItem(key, JSON.stringify(updatedData));
            }
            //await AsyncStorage.removeItem(key);
            console.log('Array concatenated and stored successfully.');
            setDoe('');
            setBuck('');
            setBreedingDate('');
            setKiddingDate('');
            props.navigation.navigate('HomeScreen')
            //addBreedingPair();
        } catch (error) {
            console.error('Error concatenating array:', error);
        }
    };

    return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.singleTextItemContainer}>
                        <Text style={styles.kiddingEntryLabel}>Doe: </Text>
                        <TextInput
                            style={styles.kiddingEntryText}
                            placeholderTextColor='grey'
                            placeholder={'Doe Name'}
                            onChangeText={text => setDoe(text)}
                            value={doe}
                        />
                    </View>
                    <View style={styles.singleTextItemContainer}>
                        <Text style={styles.kiddingEntryLabel}>Buck: </Text>
                        <TextInput
                            style={styles.kiddingEntryText}
                            placeholderTextColor='grey'
                            placeholder={'Buck Name'}
                            value={buck}
                            onChangeText={text => setBuck(text)}
                        />
                    </View>
                    <View style={styles.singleTextItemContainer}>
                        <Text style={styles.kiddingEntryLabel}>Bred: </Text>
                        <TextInput
                            style={styles.kiddingEntryText}
                            placeholderTextColor='grey'
                            placeholder={'Breeding Date'}
                            value={breedingDate}
                            onChangeText={text => setBreedingDate(text)}
                        />
                    </View>
                    <View style={styles.singleTextItemContainer}>
                        <Text style={styles.kiddingEntryLabel}>Due: </Text>
                        <TextInput
                            style={styles.kiddingEntryText}
                            placeholderTextColor='grey'
                            placeholder={'Kidding Date'}
                            value={kiddingDate}
                            onChangeText={text => setKiddingDate(text)}
                        />
                    </View>

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('HomeScreen')}>
                        <Text style={styles.kiddingEntryLabel}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {storeBreedingPair('breedingPairs', breedingPair)}}>
                        <Text style={styles.kiddingEntryLabel}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
};




const styles = StyleSheet.create({
    mainContainer: {flexDirection: "column", justifyContent: 'space-around', alignItems: 'center'},
    contentContainer: {flexDirection: "column", width: '95%', marginLeft: '2%', margin: '2%'},
    singleTextItemContainer: {flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'},
    kiddingEntryText: {fontFamily: 'WestonFree',  fontSize: 20, marginTop: '2%', color: '#000034'},
    kiddingEntryLabel: { fontFamily: 'WestonFree',  fontSize: 22, marginTop: '2%', color: '#000034'},
    buttonContainer: {flexDirection: 'row', justifyContent: 'space-evenly',  width: '100%', marginTop: '2%'}
});

export default AddBreedingPairScreen;
