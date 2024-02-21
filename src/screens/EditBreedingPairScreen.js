import React, {useEffect, useState} from 'react';
import {View, Text, Modal, Button, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import {RadioButton} from "react-native-paper";
import {DeleteBreedingPairModal} from "../components/DeleteBreedingPairModal";

const EditBreedingPairScreen = props => {

    const [doe, setDoe] = useState(props.route.params.doe);
    const [buck, setBuck] = useState(props.route.params.buck);
    const [breedingDate, setBreedingDate] = useState(new Date(props.route.params.breedingDate));
    const [kiddingDate, setKiddingDate] = useState(props.route.params.kiddingDate);

    // Used to identify the original pair, so that editing changes are saved.
    // Without this, editBreedingPair, will be unable to know which pair to edit.
    const [originalDoe, setOriginalDoe] = useState(props.route.params.doe);
    const [originalBuck, setOriginalBuck] = useState(props.route.params.buck);
    const [originalBreedingDate, setOriginalBreedingDate] = useState(props.route.params.breedingDate);
    const [originalKiddingDate, setOriginalKiddingDate] = useState(props.route.params.kiddingDate);
    const [id, setID] = useState(props.route.params.id);

    const [gestationCalculatorMode, setGestationCalculatorMode] = useState('standard');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [breedingDateSelected, setBreedingDateSelected] = useState(false);
    // Used so that if the user doesn't make changes in the date picker, that the selected date by the
    // user shows right after the "Bred: " label
    const [isCurDateBreedingDate, setIsCurDateBreedingDate] = useState(true);
    const [tempBreedingDate, setTempBreedingDate] = useState(new Date());

    const [deletePairModalVisible, setDeletePairModalVisible] = useState(false);

    const breedingPair = {
        doe: doe,
        buck: buck,
        breedingDate: breedingDate.toDateString(),
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

    const closeDeletePairModal = () => {
        setDeletePairModalVisible(false);
    };

    const openDeletePairModal = () => {
        setDeletePairModalVisible(true);
    };

    const deletePairCallback = (deletePair) => {
        if (deletePair) {
            deleteBreedingPair('breedingPairs', breedingPair)
        }
    };

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
            //calculateKiddingDate();
        }
        setBreedingDate(tempBreedingDate);
        calculateKiddingDate(tempBreedingDate);
        setShow(false);

    };

    async function deleteBreedingPair (key, pairToDelete) {
        try {
            const updatedArray = [];
            const existingData = await AsyncStorage.getItem(key);
            const parsedExistingBreedingPairs = existingData ? JSON.parse(existingData) : [];
            console.log('Delete this pair: ' + pairToDelete.id)
            for (let i = 0; i < parsedExistingBreedingPairs.length; i++) {
                console.log(parsedExistingBreedingPairs[i]);
                if (parsedExistingBreedingPairs[i].id === pairToDelete.id) {
                    console.log('Success');;
                } else {
                    updatedArray.push(parsedExistingBreedingPairs[i]);
                }
            }

            await AsyncStorage.setItem(key, JSON.stringify(updatedArray));

            console.log('Array concatenated and stored successfully.');
            props.navigation.navigate('HomeScreen')
            setDoe('');
            setBuck('');
            props.navigation.navigate('HomeScreen')
        } catch (error) {
            console.error('Error concatenating array:', error);
        }
    };

    async function editBreedingPair (key, pairToEdit, originalPair) {
        try {
            const existingData = await AsyncStorage.getItem(key);
            const parsedExistingBreedingPairs = existingData ? JSON.parse(existingData) : [];
            console.log('Edit this pair: ' + pairToEdit.id)
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

            await AsyncStorage.setItem(key, JSON.stringify(updatedArray));

            console.log('Array concatenated and stored successfully.');
            setDoe('');
            setBuck('');
            props.navigation.navigate('HomeScreen')
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

    useEffect(() => {
        calculateKiddingDate(breedingDate)
    }, [deleteBreedingPair])

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
                                <Text style={styles.kiddingEntryLabel}>{breedingDate.toDateString()}</Text>
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
                            <TouchableOpacity onPress={() => {editBreedingPair('breedingPairs', breedingPair, originalBreedingPair)}}>
                                <View style={styles.submitButtonContainer}>
                                    <Text style={styles.submitButtonText}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => {openDeletePairModal()}}>
                                <View style={styles.deleteButtonContainer}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <DeleteBreedingPairModal visible={deletePairModalVisible} closeModal={closeDeletePairModal}
                                                 deleteBreedingPair={deletePairCallback}/>
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
    deleteButtonContainer: {flexDirection: 'column', alignItems: 'center', marginTop: '5%', borderWidth: '3px', borderColor: '#C41E3A',
        borderRadius: '10%'},
    deleteButtonText: {fontFamily: 'WestonFree',  fontSize: 22, marginTop: '2%', color: '#C41E3A', padding: 10},
    decorativeLine: {borderWidth: '2px', borderColor: '#B6922E', marginTop: '2%', borderRadius: '10%', width: '95%'
        , backgroundColor: '#000034'},
    decorativeLine2: {borderWidth: '2px', borderColor: '#B6922E', marginTop: '2%', marginBottom: '2%', borderRadius: '10%', width: '100%'
        , backgroundColor: '#000034'},
    decorativeLine3: {borderWidth: '2px', borderColor: '#B6922E', borderRadius: '10%', width: '100%'
        , backgroundColor: '#000034'},

});

export default EditBreedingPairScreen;
