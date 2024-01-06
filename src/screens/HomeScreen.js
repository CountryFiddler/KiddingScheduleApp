import {Component, useEffect, useState} from "react";
import { useFonts } from 'expo-font';
import {Button, StyleSheet, Text, View, FlatList} from "react-native";
import KiddingEntry from "../components/KiddingEntry";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native'


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

    const [breedingPairs, setBreedingPairs] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const isFocused = useIsFocused();


    const renderKiddingPairs = ( {item} ) => (
        <KiddingEntry doe={item.doe} buck={item.buck} kiddingDate={item.kiddingDate} breedingDate={item.breedingDate}
                      navigation={navigation}/>
    );


    useEffect(() => {
        if (isFocused) {
            fetchBreedingPairs().then((token) => {
                setBreedingPairs(token);
                setIsLoading(false);
                console.log('Rerender')
            });
        }
    }, [isFocused]);

    if (isLoading) {
        return <View><Text>Loading...</Text></View>;
    }
        return (
            <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headers}> Doe </Text>
                <Text style={styles.headers}> Buck </Text>
                    <Text style={styles.headers}> Bred </Text>
                <Text style={styles.headers}> Due </Text>
            </View>
                <FlatList
                    data={breedingPairs}
                    keyExtractor={(item) => item.doe}
                    renderItem={renderKiddingPairs}
                />
                <Button title={'Add Breeding Pair'} onPress={() => navigation.navigate('AddBreedingPairScreen')}/>


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
        mainContainer: {flex: 1},
        headerContainer: { flexDirection: "row", justifyContent: 'space-around'},
        headers: {fontWeight: "bold"}
})

export default HomeScreen;
