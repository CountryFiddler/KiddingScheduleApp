import React, {useEffect, useState} from 'react';
import { View, Text, Modal, Button, StyleSheet, TextInput } from 'react-native';
//import {storeBreedingPair} from "../functions/AsyncStorageFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditBreedingPairScreen = props => {

    const [doe, setDoe] = useState(props.route.params.doe);
    const [buck, setBuck] = useState(props.route.params.buck);
    const [breedingDate, setBreedingDate] = useState(props.route.params.breedingDate);
    const [kiddingDate, setKiddingDate] = useState(props.route.params.kiddingDate);

    // Used to identify the original pair, so that editing changes are saved.
    // Without this, editBreedingPair, will be unable to know which pair to edit.
    const [originalDoe, setOriginalDoe] = useState(props.route.params.doe);
    const [originalBuck, setOriginalBuck] = useState(props.route.params.buck);
    const [originalBreedingDate, setOriginalBreedingDate] = useState(props.route.params.breedingDate);
    const [originalKiddingDate, setOriginalKiddingDate] = useState(props.route.params.kiddingDate);
    const [id, setID] = useState(props.route.params.id);

    //console.log(doe);
    //console.log(buck);
    //console.log(breedingDate);
   // console.log(kiddingDate);

    const breedingPair = {
        doe: doe,
        buck: buck,
        breedingDate: breedingDate,
        kiddingDate: kiddingDate,
        id: id,
    }

    const originalBreedingPair = {
        doe: originalDoe,
        buck: originalBuck,
        breedingDate: originalBreedingDate,
        kiddingDate: originalKiddingDate,
        id: id,
    }

    async function deleteBreedingPair (key, pairToDelete) {
        try {
            //const [dataArray, setDataArray] = useState([]);
            // Step 1: Retrieve existing array from AsyncStorage
            const updatedArray = [];
            const existingData = await AsyncStorage.getItem(key);
            //  console.log(!Array.isArray(existingData));
            // console.log(existingData);
            const parsedExistingBreedingPairs = existingData ? JSON.parse(existingData) : [];
            // Step 2: Concatenate the new data to the existing array
            console.log('Delete this pair: ' + pairToDelete.id)
            //console.log(parsedExistingBreedingPairs);
            // Modify the array to remove the item
            for (let i = 0; i < parsedExistingBreedingPairs.length; i++) {
                console.log(parsedExistingBreedingPairs[i]);
                if (parsedExistingBreedingPairs[i].id === pairToDelete.id) {
                    console.log('Success');
                    //parsedExistingBreedingPairs.splice(i);
                } else {
                    updatedArray.push(parsedExistingBreedingPairs[i]);
                }
            }
            //const updatedArray = parsedExistingBreedingPairs.filter(item => item !== pairToDelete);
           // const updatedArray = parsedExistingBreedingPairs;
            //console.log(updatedArray);
             //await AsyncStorage.removeItem(key);
            // Save the modified array back to AsyncStorage
            await AsyncStorage.setItem(key, JSON.stringify(updatedArray));

            // Update the state with the modified array
            //setDataArray(updatedArray);
            console.log('Array concatenated and stored successfully.');
            setDoe('');
            setBuck('');
            setBreedingDate('');
            setKiddingDate('');
            //console.log('asdflasdf');
            props.navigation.navigate('HomeScreen')
        } catch (error) {
            console.error('Error concatenating array:', error);
        }
    };

    async function editBreedingPair (key, pairToEdit, originalPair) {
        try {
            //const [dataArray, setDataArray] = useState([]);
            // Step 1: Retrieve existing array from AsyncStorage
            const existingData = await AsyncStorage.getItem(key);
            //  console.log(!Array.isArray(existingData));
            // console.log(existingData);
            const parsedExistingBreedingPairs = existingData ? JSON.parse(existingData) : [];
            // Step 2: Concatenate the new data to the existing array
            console.log('Edit this pair: ' + pairToEdit.id)
            //console.log(parsedExistingBreedingPairs);
            // Modify the array to remove the item
            for (let i = 0; i < parsedExistingBreedingPairs.length; i++) {
                console.log(parsedExistingBreedingPairs[i]);
                if (parsedExistingBreedingPairs[i].id === originalPair.id) {
                    parsedExistingBreedingPairs[i].id = pairToEdit.doe + pairToEdit.buck + pairToEdit.breedingDate + pairToEdit.kiddingDate
                    parsedExistingBreedingPairs[i].doe = pairToEdit.doe;
                    parsedExistingBreedingPairs[i].buck = pairToEdit.buck;
                    parsedExistingBreedingPairs[i].breedingDate = pairToEdit.breedingDate;
                    parsedExistingBreedingPairs[i].kiddingDate = pairToEdit.kiddingDate;
                }
            }
            const updatedArray = parsedExistingBreedingPairs;
            //console.log(updatedArray);

             await AsyncStorage.removeItem(key);
            // Save the modified array back to AsyncStorage
           // await AsyncStorage.setItem(key, JSON.stringify(updatedArray));

            // Update the state with the modified array
            setDataArray(updatedArray);
            console.log('Array concatenated and stored successfully.');
            setDoe('');
            setBuck('');
            setBreedingDate('');
            setKiddingDate('');
            props.navigation.navigate('HomeScreen')
        } catch (error) {
            console.error('Error concatenating array:', error);
        }
    };

    return (
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>This is your modal content!</Text>
                    <TextInput
                        style={styles.textInputText}
                        placeholderTextColor='grey'
                        placeholder={props.doe}
                        onChangeText={text => setDoe(text)}
                        value={doe}
                    />
                    <TextInput
                        style={styles.textInputText}
                        placeholderTextColor='grey'
                        placeholder={props.buck}
                        value={buck}
                        onChangeText={text => setBuck(text)}
                    />
                    <TextInput
                        style={styles.textInputText}
                        placeholderTextColor='grey'
                        placeholder={props.breedingDate}
                        value={breedingDate}
                        onChangeText={text => setBreedingDate(text)}
                    />
                    <TextInput
                        style={styles.textInputText}
                        placeholderTextColor='grey'
                        placeholder={props.kiddingDate}
                        value={kiddingDate}
                        onChangeText={text => setKiddingDate(text)}
                    />
                    <Button title="Close Modal" onPress={() => props.navigation.navigate('HomeScreen')} />
                    <Button title="Submit" onPress={() => editBreedingPair('breedingPairs', breedingPair, originalBreedingPair)} />
                    <Button title="Delete Pair" onPress={() => deleteBreedingPair('breedingPairs', breedingPair)} />
                </View>
            </View>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 100,
        borderRadius: 10,
        elevation: 5,
    },
    textInputText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 17,
    },
});

export default EditBreedingPairScreen;
