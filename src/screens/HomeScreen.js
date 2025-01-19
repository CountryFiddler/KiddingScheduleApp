import {Component, useCallback, useEffect, useState} from "react";
import {Button, StyleSheet, Text, View, FlatList, TouchableOpacityComponent} from "react-native";
import KiddingEntry from "../components/KiddingEntry";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native'
import {TouchableOpacity} from "react-native";
import { AntDesign } from '@expo/vector-icons';


const HomeScreen = ({navigation}) => {

    const [breedingPairs, setBreedingPairs] = useState([]);

    //const [breedingPairsExist, setBreedingPairsExist] = useState(true);

    const [isLoading, setIsLoading] = useState(true);

    const [editMode, setEditMode] = useState(false);

    function kiddingDateToString(data) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' };
        for (var i = 0; i < data.length; i++) {
            //const formattedDate = date[i].kiddingDate.toLocaleDateString('en-US', options);
            console.log(data[i].kiddingDate);
            data[i].kiddingDate = new Date(data[i].kiddingDate);
            data[i].kiddingDate = data [i].kiddingDate.toLocaleDateString('en-US', options);
            console.log(data[i].kiddingDate);
        }
        return data;
    }

    const fetchBreedingPairs = async () => {
        try {
            // Fetch data from AsyncStorage
            const dataString = await AsyncStorage.getItem('breedingPairs');
            //console.log(dataString)
            if (dataString !== null) {
                // Parse the data if it's not null
                const data = dataString ? JSON.parse(dataString) : [];

                // Now 'data' is a JavaScript object or array
                var sortedData = [...data].sort((a, b) => new Date(a.kiddingDate) - new Date(b.kiddingDate));
                var finalData = kiddingDateToString(sortedData);
                return finalData;
                //return sortedData;
            } else {
                // Data is not available
                console.log('No data found');
            }
        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);
        }
    };

    const isFocused = useIsFocused();


    const renderKiddingPairs = ( {item} ) => (
        <View>
        <KiddingEntry doe={item.doe} buck={item.buck} kiddingDate={item.kiddingDate} breedingDate={item.breedingDate}
                      id={item.id} navigation={navigation} editMode={editMode}/>
        <View style={styles.kiddingEntryDivider}/>
    </View>
    );


    useEffect(() => {
        if (isFocused) {
            fetchBreedingPairs().then((token) => {
                setBreedingPairs(token);
                setIsLoading(false);
                console.log(breedingPairs)
            });
        }
    }, [isFocused]);


    useEffect(() => {
    }, [editMode]);

    useEffect(() => {},
        [breedingPairs]);

    if (isLoading) {
        return <View><Text>Loading...</Text></View>;
    }

        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headers}>Kidding Schedule</Text>
                    {editMode ? (
                            <View style={styles.doneButtonContainer}>
                                <TouchableOpacity  onPress={() => setEditMode(false)}>
                                    <AntDesign name="closecircleo" size={33} color='#000034' />
                                </TouchableOpacity>
                            </View>
                    ) : (
                        <View style={styles.addOrEditButtonsContainer}>
                            <TouchableOpacity style={styles.iconButtons} onPress={() => navigation.navigate('AddBreedingPairScreen')}>
                                <AntDesign name="plus" size={33} color={'#000034'} />
                            </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButtons} onPress={() => setEditMode(true)}>
                            <AntDesign name="edit" size={30} color={'#000034'} />
                        </TouchableOpacity>
                        </View>
                    )}
                </View>
                {(breedingPairs === undefined && !editMode) ? (
                    <View style={styles.welcomeMessageContainer}>
                        <Text style={styles.welcomeMessageText}>Click the + button in to begin adding breeding pairs to your kidding schedule. Here's to a
                        great kidding season!</Text>

                    </View>

                ) : editMode ? (
                    <View style={styles.editModeContainer}>
                        <View >
                            <Text style={styles.welcomeMessageText}>Click on a breeding pair to edit</Text>

                        </View>
                    <View style={styles.editListView}>
                        <FlatList
                            data={breedingPairs}
                            keyExtractor={(item) => item.id}
                            renderItem={renderKiddingPairs}
                        />

                    </View>
                    </View>

                ) : (
                    <View style={styles.listView}>
                        <FlatList
                            data={breedingPairs}
                            keyExtractor={(item) => item.id}
                            renderItem={renderKiddingPairs}
                        />

                    </View>
                )}
                <View style={styles.footerSpacing}/>
            </View>
        );
};


const styles = StyleSheet.create({
        mainContainer: {flex: 1, alignItems: 'center', backgroundColor: 'white'},
        addOrEditButtonsContainer: {flexDirection: 'row', width: '25%', justifyContent: 'space-between',},
        iconButtons: {margin: '2%'},
        headerContainer: { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', width: '95%'
        , marginTop: '2%', height: '5%'},
        headers: {fontWeight: "bold", fontSize: 24, fontFamily: 'WestonFree', color: '#12284B'},
        listView: {marginTop: '2%', width: '100%', flex: 1,},
        editListView: {marginTop: '2%', width: '100%'},
        welcomeMessageContainer: {flex: 1, width: '95%',  alignItems: 'center', marginTop: '15%'},
        welcomeMessageText: {fontWeight: "bold", fontSize: 18, fontFamily: 'WestonFree', color: '#12284B', lineHeight: 35, textAlign: 'center'},
        editModeContainer: {flex: 1, width: '100%',  alignItems: 'center', marginTop: '5%', marginBottom: '10%'},
        doneButtonContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
        doneButtonText: {fontFamily: 'WestonFree',  fontSize: 22, color: 'white', padding: 10},
        kiddingEntryDivider: {padding: 10},
        footerSpacing: {padding: 25},
        editModeFooterSpacing: {padding: 50},
})

export default HomeScreen;
