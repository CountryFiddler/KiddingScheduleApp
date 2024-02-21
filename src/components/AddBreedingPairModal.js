import React, {useEffect, useState} from 'react';
import { View, Text, Modal, Button, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AddBreedingPairModal = ({ visible, closeModal, addedBreedingPair }) => {

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
            const existingData = await AsyncStorage.getItem(key);
            if (existingData === null) {
                const breedingPairs = [newData]
                await AsyncStorage.setItem(key, JSON.stringify(breedingPairs));
            } else {
                const parsedExistingBreedingPairs = existingData ? JSON.parse(existingData) : [];
                const updatedData = [...parsedExistingBreedingPairs, newData];
                await AsyncStorage.setItem(key, JSON.stringify(updatedData));
            }

            console.log('Array concatenated and stored successfully.');
            addedBreedingPair();
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
