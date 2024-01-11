import {Component, useCallback, useEffect, useState} from "react";
import { useFonts } from 'expo-font';
import {Button, StyleSheet, Text, View, FlatList, TouchableOpacityComponent} from "react-native";
import KiddingEntry from "../components/KiddingEntry";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font'
import * as SplashScreen from "expo-splash-screen";
import {Feather, FontAwesome} from "@expo/vector-icons";
import {Touchable} from "react-native-web";


const HomeScreen = ({navigation}) => {


    const fetchBreedingPairs = async () => {
        try {
            // Fetch data from AsyncStorage
            const dataString = await AsyncStorage.getItem('breedingPairs');

            if (dataString !== null) {
                // Parse the data if it's not null
                const data = dataString ? JSON.parse(dataString) : [];

                // Now 'data' is a JavaScript object or array
               // console.log('Fetched data:', data);
                return data;
            } else {
                // Data is not available
                console.log('No data found');
            }
        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);
        }
    };

  /* const fetchFonts = async() => {
        await Font.loadAsync({
            'WestonFree': require('../assets/fonts/WestonFree-Regular.ttf'),
        })
    }*/

    const [breedingPairs, setBreedingPairs] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [editMode, setEditMode] = useState(false);

   // const [fontsLoaded, setFontsLoaded] = useState(false);

    const isFocused = useIsFocused();


    const renderKiddingPairs = ( {item} ) => (
        <KiddingEntry doe={item.doe} buck={item.buck} kiddingDate={item.kiddingDate} breedingDate={item.breedingDate}
                      navigation={navigation} editMode={editMode}/>
    );


    useEffect(() => {
        if (isFocused) {
            fetchBreedingPairs().then((token) => {
                setBreedingPairs(token);
                setIsLoading(false);
                console.log('Rerender');
            });
        }
    }, [isFocused]);


    useEffect(() => {
        //console.log('Bob')
    }, [editMode]);


    if (isLoading) {
        return <View><Text>Loading...</Text></View>;
    }

        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headers}>Kidding Schedule</Text>
                    {editMode ? (
                        <TouchableOpacity onPress={() => setEditMode(false)}>
                            <Text style={styles.headers}>Done</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.addOrEditButtonsContainer}>
                            <TouchableOpacity style={styles.iconButtons} onPress={() => navigation.navigate('AddBreedingPairScreen')}>
                                <Feather name="plus" size={33} color={'#000034'} />
                            </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButtons} onPress={() => setEditMode(true)}>
                            <Feather name="edit-2" size={30} color={'#000034'} />
                        </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View style={styles.listView}>
                    <FlatList
                        data={breedingPairs}
                        keyExtractor={(item) => item.doe}
                        renderItem={renderKiddingPairs}
                    />

                </View>

            </View>
        );
};

/*
<KiddingEntry doe={"Toffee"} buck={"Shasta"} kiddingDate={'3/11/24'}/>
                    <KiddingEntry doe={"Caramel Mist"} buck={"Chino"} kiddingDate={'3/11/24'}

                    renderItem={({pair}) => <KiddingEntry doe={pair.doe} buck={pair.buck} kiddingDate={pair.kiddingDate}/>}/>

                                        data={[{doe: 'Toffee', buck: 'Shasta', kiddingDate: '3/23/23', id: '1'},
                        {doe: 'Mist', buck: 'Chino', kiddingDate: '3/11/23', id: '2'}]}

                        <AddBreedingPairModal visible={addPairModalVisible} closeModal={closeAddPairModal} addedBreedingPair={addPair}/>

                            /*useEffect(() => {
        fetchBreedingPairs().then((token) => {
            setBreedingPairs(token);
            setIsLoading(false);
            console.log('Rerender')
        });
    }, [addBreedingPair])

    useEffect(() => {
        fetchBreedingPairs().then((token) => {
            setBreedingPairs(token);
            setIsLoading(false);
            console.log('Rerender')
        });
    }, [addBreedingPair])
        const [addBreedingPair, setAddBreedingPair] = useState(false);
    const [deleteBreedingPair, setDeleteBreedingPair] = useState(false);

        const openAddPairModal = () => {
        setAddPairModalVisible(true);
    };

    const closeAddPairModal = () => {
        setAddPairModalVisible(false);
    };

    const openEditPairModal = () => {
        setEditPairModalVisible(true);
    };

    const closeEditPairModal = () => {
        setEditPairModalVisible(false);
    };

    const addPair = () => {
        setAddBreedingPair(true);
    }

    const deletePair = () => {
        setDeleteBreedingPair(true);
    }

    const [addPairModalVisible, setAddPairModalVisible] = useState(false);
    const [editPairModalVisible, setEditPairModalVisible] = useState(false);
 */




const styles = StyleSheet.create({
        mainContainer: {flex: 1, alignItems: 'center'},
        addOrEditButtonsContainer: {flexDirection: 'row', width: '25%', justifyContent: 'space-between',},
        iconButtons: {margin: '2%'},
        headerContainer: { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', width: '95%'
        , marginTop: '2%', height: '5%'},
        headers: {fontWeight: "bold", fontSize: 24, fontFamily: 'WestonFree', color: '#000034'},
        listView: {marginTop: '2%', width: '95%'},
})

export default HomeScreen;
