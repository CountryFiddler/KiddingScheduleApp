import React, {useEffect, useState} from 'react';
import {View, Text, Modal, Button, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
//import {storeBreedingPair} from "../functions/AsyncStorageFunctions";
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
    const [triggerDeleteBreedingPair, setTriggerDeleteBreedingPair] = useState(false);

    //console.log(doe);
    //console.log(buck);
    //console.log(breedingDate);
   // console.log(kiddingDate);

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
        //setShow(false);
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
            props.navigation.navigate('HomeScreen')
            setDoe('');
            setBuck('');
           // setBreedingDate('');
            //setKiddingDate('');
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

             //await AsyncStorage.removeItem(key);
            // Save the modified array back to AsyncStorage
            await AsyncStorage.setItem(key, JSON.stringify(updatedArray));

            // Update the state with the modified array
            //setDataArray(updatedArray);
            console.log('Array concatenated and stored successfully.');
            setDoe('');
            setBuck('');
            //setBreedingDate('');
           // setKiddingDate('');
            props.navigation.navigate('HomeScreen')
        } catch (error) {
            console.error('Error concatenating array:', error);
        }
    };

    const calculateKiddingDate = (breedingDate) => {
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

    /*useEffect(() => {
        deleteBreedingPair('breedingPairs', breedingPair)
    }, [triggerDeleteBreedingPair])
*/
    /*return (
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
                                    <Text style={styles.kiddingEntryLabel}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => submitBreedingDate()}>
                                    <Text style={styles.kiddingEntryLabel}>Submit</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                </View>
                <View>
                    <View style={styles.centerColumnView}>
                        <Text style={styles.kiddingEntryLabel}>Calculate Kidding Date</Text>
                        <Text style={[styles.kiddingEntryText, {marginTop: '5%'}]}>Select Breed Type</Text>
                    </View>
                    <RadioButton.Group
                        onValueChange={(newValue) => setGestationCalculatorMode(newValue)}
                        value={gestationCalculatorMode}
                    >
                        <View style={styles.radioButtonContainer}>
                            <RadioButton.Item label="Standard" value="standard" />
                            <RadioButton.Item label="Mini" value="mini" />
                            <RadioButton.Item label="Custom Date" value="custom" />
                        </View>
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
                        <Text style={styles.kiddingEntryText}>{kiddingDate}</Text>
                    </View>
                )}

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => props.navigation.navigate('HomeScreen')}>
                    <Text style={styles.kiddingEntryLabel}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {editBreedingPair('breedingPairs', breedingPair, originalBreedingPair)}}>
                    <Text style={styles.kiddingEntryLabel}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {deleteBreedingPair('breedingPairs', breedingPair)}}>
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
    buttonContainer: {flexDirection: 'row', justifyContent: 'space-evenly',  width: '100%', marginTop: '2%'},
    radioButtonContainer: {flexDirection: 'row', justifyContent: 'space-around',  width: '100%', marginTop: '2%'},
    datePickerContainer: {flexDirection: 'column', alignItems: 'center'},
    centerColumnView: {flexDirection: 'column', alignItems: 'center', marginTop: '5%'},

});
*/
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

/*
                            <TouchableOpacity onPress={() => {deleteBreedingPair('breedingPairs', breedingPair)}}>
                                <View style={styles.deleteButtonContainer}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </View>
                            </TouchableOpacity>
 */
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
/*
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

 */


export default EditBreedingPairScreen;
