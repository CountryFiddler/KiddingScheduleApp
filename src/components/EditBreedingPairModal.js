import React, {useEffect, useState} from 'react';
import { View, Text, Modal, Button, StyleSheet, TextInput } from 'react-native';
//import {storeBreedingPair} from "../functions/AsyncStorageFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const EditBreedingPairModal = ({ visible, closeModal, deleteBreedingPair,doe, buck, breedingDate, kiddingDate }) => {

    //const [doe, setDoe] = useState(doe);
   // const [buck, setBuck] = useState(this.props.buck);
   // const [breedingDate, setBreedingDate] = useState(this.props.breedingDate);
   // const [kiddingDate, setKiddingDate] = useState(this.props.kiddingDate);

    const breedingPair = {
        doe: doe,
        buck: buck,
        breedingDate: breedingDate,
        kiddingDate: kiddingDate,
    }
    async function deleteBreedingPair (key, pairToDelete) {
        try {
            const [dataArray, setDataArray] = useState([]);
            // Step 1: Retrieve existing array from AsyncStorage
            const existingData = await AsyncStorage.getItem(key);
            //  console.log(!Array.isArray(existingData));
            // console.log(existingData);
                const parsedExistingBreedingPairs = existingData ? JSON.parse(existingData) : [];
                // Step 2: Concatenate the new data to the existing array

            // Modify the array to remove the item
            const updatedArray = parsedExistingBreedingPairs.filter(item => item !== pairToDelete);

            // Save the modified array back to AsyncStorage
            await AsyncStorage.setItem(key, JSON.stringify(updatedArray));

            // Update the state with the modified array
            setDataArray(updatedArray);
            console.log('Array concatenated and stored successfully.');
            deleteBreedingPair();
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
