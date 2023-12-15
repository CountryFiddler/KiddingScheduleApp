import React, {useEffect, useState} from 'react';
import { View, Text, Modal, Button, StyleSheet, TextInput } from 'react-native';
//import {storeBreedingPair} from "../functions/AsyncStorageFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AddBreedingPairModal = ({ visible, closeModal }) => {

    const [doe, setDoe] = useState('');
    const [buck, setBuck] = useState('');
    const [breedingDate, setBreedingDate] = useState('');
    const [kiddingDate, setKiddingDate] = useState('');

    const breedingPair = {
        doe: doe,
        buck: buck,
        breedingDate: breedingDate,
        kiddingDate: kiddingDate,
    }
    async function storeBreedingPair (key, newData) {
        try {
            // Step 1: Retrieve existing array from AsyncStorage
            const existingData = await AsyncStorage.getItem(key);
            console.log(!Array.isArray(existingData));
            console.log(existingData);
            if (!Array.isArray(existingData)) {
                const breedingPairs = [newData]
                //console.log(breedingPairs);
                // Step 3: Save the updated array back to AsyncStorage
                await AsyncStorage.setItem(key, JSON.stringify(breedingPairs));
            } else {
                const parsedExistingBreedingPairs = existingData ? JSON.parse(existingData) : [];

                // Step 2: Concatenate the new data to the existing array
                const updatedData = [...parsedExistingBreedingPairs, ...newData];
                console.log(updatedData);
                await AsyncStorage.setItem(key, JSON.stringify(updatedData));
            }

            console.log('Array concatenated and stored successfully.');
            closeModal();
            setDoe('');
            setBuck('');
            setBreedingDate('');
            setKiddingDate('');
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
                        placeholder={'Doe Name'}
                        onChangeText={text => setDoe(text)}
                        value={doe}
                    />
                    <TextInput
                        style={styles.textInputText}
                        placeholderTextColor='grey'
                        placeholder={'Buck Name'}
                        value={buck}
                        onChangeText={text => setBuck(text)}
                    />
                    <TextInput
                        style={styles.textInputText}
                        placeholderTextColor='grey'
                        placeholder={'Breeding Date'}
                        value={breedingDate}
                        onChangeText={text => setBreedingDate(text)}
                    />
                    <TextInput
                        style={styles.textInputText}
                        placeholderTextColor='grey'
                        placeholder={'Kidding Date'}
                        value={kiddingDate}
                        onChangeText={text => setKiddingDate(text)}
                    />
                    <Button title="Close Modal" onPress={closeModal} />
                    <Button title="Submit" onPress={() => storeBreedingPair('breedingPair', breedingPair)} />
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
