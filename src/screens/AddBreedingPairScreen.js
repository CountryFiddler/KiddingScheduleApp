import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text, Modal, Button, StyleSheet, TextInput, Alert} from 'react-native';
//import {storeBreedingPair} from "../functions/AsyncStorageFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TouchableOpacity} from "react-native";
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
//import {RadioGroup} from 'react-native-ui-lib';
//import {RadioButton} from "react-native-ui-lib";
import KiddingEntry from "../components/KiddingEntry"; //eslint-disable-line

const AddBreedingPairScreen = props => {

    const [doe, setDoe] = useState('');
    const [buck, setBuck] = useState('');
    //const [breedingDate, setBreedingDate] = useState(new Date());
    const [breedingDate, setBreedingDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [kiddingDate, setKiddingDate] = useState(new Date());
    const [gestationCalculatorMode, setGestationCalculatorMode] = useState('standard');
    const [breedingDateSelected, setBreedingDateSelected] = useState(false);
    // Used so that if the user doesn't make changes in the date picker, that the selected date by the
    // user shows right after the "Bred: " label
    const [isCurDateBreedingDate, setIsCurDateBreedingDate] = useState(true);

    const breedingPair = {
        doe: doe,
        buck: buck,
        breedingDate: breedingDate,
        kiddingDate: kiddingDate,
        id: '',
    }


    const onChange = (event, selectedDate) => {
        setIsCurDateBreedingDate(false);
        const currentDate = selectedDate;
        //setShow(false);
        setBreedingDateSelected(true);
        setBreedingDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const submitBreedingDate = () => {
        if (isCurDateBreedingDate) {
            setBreedingDateSelected(true);
            //calculateKiddingDate();
        }
        calculateKiddingDate();
        setShow(false);

    };

    async function storeBreedingPair (key, newData) {
        try {
            // Step 1: Retrieve existing array from AsyncStorage
            newData.id = newData.doe + newData.buck + newData.breedingDate + newData.kiddingDate;
            let pairExists = false;
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

                for (let i = 0 ; i < parsedExistingBreedingPairs.length; i++) {
                    if (parsedExistingBreedingPairs[i].id === newData.id) {
                        pairExists = true;
                        break;
                    }
                }

                if (!pairExists) {
                    // Step 2: Concatenate the new data to the existing array
                    const updatedData = [...parsedExistingBreedingPairs, newData];
                    //  console.log(updatedData);
                    await AsyncStorage.setItem(key, JSON.stringify(updatedData));

                    console.log('Array concatenated and stored successfully.');
                    setDoe('');
                    setBuck('');
                    setBreedingDate(null);
                    setKiddingDate('');
                    props.navigation.navigate('HomeScreen')

                } else {
                    Alert.alert(
                        'Breeding Pair Already Exists',
                        'This pair already exists, please enter a different breeding pair',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') }
                        ],
                        { cancelable: false }
                    );
                }
            }
            //await AsyncStorage.removeItem(key);
            //addBreedingPair();
        } catch (error) {
            console.error('Error concatenating array:', error);
        }
    };

    const renderGestationCalculatorOption = ( {color, gestationOption, label} ) => {
        return (
            <View >
                <RadioButton value={gestationOption} label={label}/>
            </View>
        );
    }

    const calculateKiddingDate = () => {
        // Add 10 days to the existing date
        const newDate = new Date(breedingDate);
        //newDate.setDate(breedingDate.getDate() + 150);
        if ((gestationCalculatorMode) === 'standard') {
            newDate.setDate(breedingDate.getDate() + 150);
            setKiddingDate(newDate.toDateString());
        }
        if (gestationCalculatorMode === 'mini') {
            newDate.setDate(breedingDate.getDate() + 145);
            setKiddingDate(newDate.toDateString());
        }

    }

    useEffect(() => {
        calculateKiddingDate()
    }, [gestationCalculatorMode])

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
                        <TouchableOpacity style={styles.singleTextItemContainer} onPress={showDatepicker}>
                            <Text style={styles.kiddingEntryLabel}>Bred: </Text>
                            {!breedingDateSelected ? (
                                <Text style={styles.kiddingEntryText}>Select Breeding Date</Text>
                            ) : (
                                <Text style={styles.kiddingEntryLabel}>{breedingDate.toDateString()}</Text>
                            )}
                        </TouchableOpacity>

                    </View>
                    <View>
                        {show && (
                            <View>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={breedingDate}
                                mode={mode}
                                display={'spinner'}
                                is24Hour={true}
                                onChange={onChange}
                            />
                                <TouchableOpacity onPress={() => submitBreedingDate()}>
                                    <Text style={styles.kiddingEntryLabel}>Submit</Text>
                                </TouchableOpacity>

                            </View>
                        )}
                    </View>
                    <View>
                        <Text style={styles.kiddingEntryLabel}>Calculate Kidding Date</Text>
                        <RadioButton.Group
                            onValueChange={(newValue) => setGestationCalculatorMode(newValue)}
                            value={gestationCalculatorMode}
                        >
                            <RadioButton.Item label="Standard Breed" value="standard" />
                            <RadioButton.Item label="Mini Breed" value="mini" />
                            <RadioButton.Item label="Custom Kidding Date" value="custom" />
                        </RadioButton.Group>
                    </View>
                    {gestationCalculatorMode === 'custom' ? (
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
                    ) : (
                        <View style={styles.singleTextItemContainer}>
                            <Text style={styles.kiddingEntryLabel}>Due: </Text>
                            <Text style={styles.kiddingEntryText}>{kiddingDate.toDateString()}</Text>
                        </View>
                    )}

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
