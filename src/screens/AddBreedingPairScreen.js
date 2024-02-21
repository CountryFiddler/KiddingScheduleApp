import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text, Modal, Button, StyleSheet, TextInput, Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TouchableOpacity} from "react-native";
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
const AddBreedingPairScreen = props => {

    const [doe, setDoe] = useState('');
    const [buck, setBuck] = useState('');
    const [breedingDate, setBreedingDate] = useState(new Date());
    const [tempBreedingDate, setTempBreedingDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [kiddingDate, setKiddingDate] = useState('');
    const [gestationCalculatorMode, setGestationCalculatorMode] = useState('standard');
    const [breedingDateSelected, setBreedingDateSelected] = useState(false);
    const [isCurDateBreedingDate, setIsCurDateBreedingDate] = useState(true);

    const breedingPair = {
        doe: doe,
        buck: buck,
        breedingDate: breedingDate.toDateString(),
        kiddingDate: kiddingDate,
        id: '',
    }


    const onChange = (event, selectedDate) => {
        setIsCurDateBreedingDate(false);
        const currentDate = selectedDate;
        setBreedingDateSelected(true);
        setTempBreedingDate(currentDate);
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
        }
        setBreedingDate(tempBreedingDate);
        calculateKiddingDate(tempBreedingDate);
        setShow(false);

    };

    async function storeBreedingPair (key, newData) {
        try {
            newData.id = newData.doe + newData.buck + newData.breedingDate + newData.kiddingDate;
            let pairExists = false;
            const existingData = await AsyncStorage.getItem(key);
            if (existingData === null) {
                const breedingPairs = [newData]
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
                    const updatedData = [...parsedExistingBreedingPairs, newData];
                    await AsyncStorage.setItem(key, JSON.stringify(updatedData));

                    console.log('Array concatenated and stored successfully.');
                    setDoe('');
                    setBuck('');
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
        } catch (error) {
            console.error('Error concatenating array:', error);
        }
    };

    const calculateKiddingDate = (breedingDate) => {
        const newDate = new Date(breedingDate);
        if ((gestationCalculatorMode) === 'standard') {
            newDate.setDate(breedingDate.getDate() + 150);
            setKiddingDate(newDate.toDateString());
        }
        if (gestationCalculatorMode === 'mini') {
            newDate.setDate(breedingDate.getDate() + 145);
            setKiddingDate(newDate.toDateString());
        }
        if (gestationCalculatorMode === 'custom') {
            setKiddingDate('');
        }

    }

    useEffect(() => {
        calculateKiddingDate(breedingDate)
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
                        <TouchableOpacity style={styles.singleTextItemContainerNoPadding} onPress={showDatepicker}>
                            <Text style={styles.kiddingEntryLabel}>Bred: </Text>
                            {!breedingDateSelected ? (
                                <Text style={styles.selectBreedingDateText}>Select Breeding Date</Text>
                            ) : (
                                <Text style={styles.kiddingEntryLabel}>{breedingDate.toDateString()}</Text>
                            )}
                        </TouchableOpacity>

                    </View>
                    <View>
                        {show && (
                            <View style={styles.datePickerContainer}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={breedingDate}
                                mode={mode}
                                display={'spinner'}
                                is24Hour={true}
                                onChange={onChange}
                            />
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => setShow(false)}>
                                        <View style={styles.cancelButtonContainer}>
                                            <Text style={styles.cancelButtonText}>Cancel</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => submitBreedingDate()}>
                                        <View style={styles.submitButtonContainer}>
                                            <Text style={styles.submitButtonText}>Submit</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        )}
                    </View>
                    {!show ? (
                            <View>
                                <View>
                                    <View style={styles.centerColumnView}>
                                        <Text style={styles.kiddingEntryLabel}>Calculate Kidding Date</Text>
                                        <View style={styles.decorativeLine2}/>
                                    </View>
                                    <RadioButton.Group
                                        onValueChange={(newValue) => setGestationCalculatorMode(newValue)}
                                        value={gestationCalculatorMode}
                                    >
                                        <View style={styles.radioButtonContainer}>
                                            <RadioButton.Item color='#B6922E' label="Standard Breed" value="standard"/>
                                            <RadioButton.Item color='#B6922E' label="Mini Breed" value="mini" />
                                            <RadioButton.Item color='#B6922E' label="Custom Date" value="custom" />
                                        </View>
                                    </RadioButton.Group>
                                </View>
                                <View style={styles.decorativeLine2}/>
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
                                        <Text style={styles.kiddingEntryText}>{kiddingDate}</Text>
                                    </View>
                                )}


                        <View style={styles.decorativeLine2}/>


                        <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('HomeScreen')}>
                        <View style={styles.cancelButtonContainer}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {storeBreedingPair('breedingPairs', breedingPair)}}>
                        <View style={styles.submitButtonContainer}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                        </View>
                        </TouchableOpacity>
                        </View>
                        </View>
                    ) : null}

                </View>

            </View>
    );
};




const styles = StyleSheet.create({
    mainContainer: {flex: 1, flexDirection: "column", alignItems: 'center', backgroundColor: 'white'},
    contentContainer: {flexDirection: "column", justifyContent: 'space-around', width: '95%', marginLeft: '2%', margin: '2%'},
    singleTextItemContainer: {flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingVertical: 5},
    singleTextItemContainerNoPadding: {flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'},
    kiddingEntryText: {fontFamily: 'WestonFree',  fontSize: 20, marginTop: '2%', color: '#12284B'},
    selectBreedingDateText: {fontFamily: 'WestonFree',  fontSize: 20, marginTop: '2%', color: 'grey'},
    kiddingEntryLabel: { fontFamily: 'WestonFree',  fontSize: 22, marginTop: '2%', color: '#12284B'},
    buttonContainer: {flexDirection: 'row', justifyContent: 'space-evenly',  width: '100%', marginTop: '5%'},
    radioButtonContainer: {flexDirection: 'column', justifyContent: 'space-evenly',  width: '100%', marginTop: '2%'},
    radioButtonColor: {color: '#B6922E'},
    datePickerContainer: {flexDirection: 'column', alignItems: 'center'},
    centerColumnView: {flexDirection: 'column', alignItems: 'center', marginTop: '5%'},
    submitButtonContainer: {flexDirection: 'column', alignItems: 'center', marginTop: '5%', backgroundColor: '#12284b', borderRadius: '10%', borderWidth: '3px',
    borderColor: '#12284B'},
    submitButtonText: {fontFamily: 'WestonFree',  fontSize: 22, marginTop: '2%', color: 'white', padding: 10},
    cancelButtonContainer: {flexDirection: 'column', alignItems: 'center', marginTop: '5%', borderWidth: '3px', borderColor: 'rgba(18, 40, 75, 0.85)',
        borderRadius: '10%'},
    cancelButtonText: {fontFamily: 'WestonFree',  fontSize: 22, marginTop: '2%', color: 'rgba(18, 40, 75, 0.85)', padding: 10},
    decorativeLine: {borderWidth: '2px', borderColor: '#B6922E', marginTop: '2%', borderRadius: '10%', width: '95%'
        , backgroundColor: '#000034'},
    decorativeLine2: {borderWidth: '2px', borderColor: '#B6922E', marginTop: '2%', marginBottom: '2%', borderRadius: '10%', width: '100%'
        , backgroundColor: '#000034'},
    decorativeLine3: {borderWidth: '2px', borderColor: '#B6922E', borderRadius: '10%', width: '100%'
        , backgroundColor: '#000034'},

});

export default AddBreedingPairScreen;
