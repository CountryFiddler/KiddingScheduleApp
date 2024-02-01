import React, {useEffect, useState} from 'react';
import { View, Text, Modal, Button, StyleSheet, TextInput } from 'react-native';
//import {storeBreedingPair} from "../functions/AsyncStorageFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DeleteBreedingPairModal = ({ visible, closeModal, deletedBreedingPair,doe, buck, breedingDate, kiddingDate }) => {

    const [currentDoe, setCurrentDoe] = useState(doe);
    const [currentBuck, setCurrentBuck] = useState(buck);
    const [currentBreedingDate, setCurrentBreedingDate] = useState(breedingDate);
    const [currentKiddingDate, setCurrentKiddingDate] = useState(kiddingDate);

    const [reRenderModal, setReRenderModal] = useState(false);

    const breedingPair = {
        doe: doe,
        buck: buck,
        breedingDate: breedingDate,
        kiddingDate: kiddingDate,
    }

    const closeEditModal = () => {
        //setCurrentDoe('');
        //setCurrentBuck('');
        /// setCurrentBreedingDate('');
        // setCurrentKiddingDate('');
        // setReRenderModal(true);
        deletedBreedingPair();
        closeModal();
    };

    async function deleteBreedingPair (key, pairToDelete) {
        try {
            //const [dataArray, setDataArray] = useState([]);
            // Step 1: Retrieve existing array from AsyncStorage
            const existingData = await AsyncStorage.getItem(key);
            //  console.log(!Array.isArray(existingData));
            // console.log(existingData);
            const parsedExistingBreedingPairs = existingData ? JSON.parse(existingData) : [];
            // Step 2: Concatenate the new data to the existing array
            console.log('Delete this pair: ' + pairToDelete.doe)
            //console.log(parsedExistingBreedingPairs);
            // Modify the array to remove the item
            for (let i = 0; i < parsedExistingBreedingPairs.length; i++) {
                console.log(parsedExistingBreedingPairs[i]);
                if (parsedExistingBreedingPairs[i].doe === pairToDelete.doe) {
                    console.log('Success');
                    parsedExistingBreedingPairs.splice(i);
                }
            }
            const updatedArray = parsedExistingBreedingPairs.filter(item => item !== pairToDelete);
            //console.log(updatedArray);

            // await AsyncStorage.removeItem(key);
            // Save the modified array back to AsyncStorage
            await AsyncStorage.setItem(key, JSON.stringify(updatedArray));

            // Update the state with the modified array
            //setDataArray(updatedArray);
            console.log('Array concatenated and stored successfully.');
            deletedBreedingPair();
            closeModal();
            setCurrentDoe('');
            setCurrentBuck('');
            setCurrentBreedingDate('');
            setCurrentKiddingDate('');
        } catch (error) {
            console.error('Error concatenating array:', error);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                closeModal();
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>This is your modal content!</Text>
                    <TextInput
                        style={styles.textInputText}
                        placeholderTextColor='grey'
                        placeholder={doe}
                        onChangeText={text => setCurrentDoe(text)}
                        value={currentDoe}
                    />
                    <TextInput
                        style={styles.textInputText}
                        placeholderTextColor='grey'
                        placeholder={buck}
                        value={currentBuck}
                        onChangeText={text => setCurrentBuck(text)}
                    />
                    <TextInput
                        style={styles.textInputText}
                        placeholderTextColor='grey'
                        placeholder={breedingDate}
                        value={currentBreedingDate}
                        onChangeText={text => setCurrentBreedingDate(text)}
                    />
                    <TextInput
                        style={styles.textInputText}
                        placeholderTextColor='grey'
                        placeholder={kiddingDate}
                        value={currentKiddingDate}
                        onChangeText={text => setCurrentKiddingDate(text)}
                    />
                    <Button title="Close Modal" onPress={closeEditModal} />
                    <Button title="Submit" onPress={() => storeBreedingPair('breedingPairs', breedingPair)} />
                    <Button title="Delete Pair" onPress={() => deleteBreedingPair('breedingPairs', breedingPair)} />
                </View>
            </View>
        </Modal>
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
