import {Component, useEffect, useState} from "react";
import {Button, StyleSheet, Text, View, FlatList} from "react-native";
import KiddingEntry from "../components/KiddingEntry";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddBreedingPairModal} from "../components/AddBreedingPairModal";


const HomeScreen = () => {

    const fetchBreedingPairs = async () => {
        try {
            // Fetch data from AsyncStorage
            const dataString = await AsyncStorage.getItem('breedingPairs');

            if (dataString !== null) {
                // Parse the data if it's not null
               // const data = JSON.parse(dataString);
                const data = dataString ? JSON.parse(dataString) : [];

                // Now 'data' is a JavaScript object or array
               // console.log('Fetched data:', data);
                //setBreedingPairs((data));
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

    const [addBreedingPair, setAddBreedingPair] = useState(false);
    const [deleteBreedingPair, setDeleteBreedingPair] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [addPairModalVisible, setAddPairModalVisible] = useState(false);
    const [editPairModalVisible, setEditPairModalVisible] = useState(false);
    const pairs= [
        {doe: 'Toffee', buck: 'Shasta', kiddingDate: '3/23/23', id: '1'},
            {doe: 'Mist', buck: 'Chino', kiddingDate: '3/11/23', id: '2'}];

   // console.log(breedingPairs);


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

    const renderKiddingPairs = ( {item} ) => (
        <KiddingEntry doe={item.doe} buck={item.buck} kiddingDate={item.kiddingDate} breedingDate={item.breedingDate}
                      visible={editPairModalVisible}
                      deletedBreedingPair={deletePair} closeModal={closeEditPairModal} openModal={openEditPairModal}/>
    );

    useEffect(() => {
        fetchBreedingPairs()
    }, [addPair])

    useEffect(() => {
        fetchBreedingPairs().then((token) => {
            setBreedingPairs(token);
            setIsLoading(false);
        });
    }, [])

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
                <Button title={'Add Breeding Pair'} onPress={openAddPairModal}/>
                <AddBreedingPairModal visible={addPairModalVisible} closeModal={closeAddPairModal} addedBreedingPair={addPair}/>

            </View>
        );
};

/*
<KiddingEntry doe={"Toffee"} buck={"Shasta"} kiddingDate={'3/11/24'}/>
                    <KiddingEntry doe={"Caramel Mist"} buck={"Chino"} kiddingDate={'3/11/24'}

                    renderItem={({pair}) => <KiddingEntry doe={pair.doe} buck={pair.buck} kiddingDate={pair.kiddingDate}/>}/>

                                        data={[{doe: 'Toffee', buck: 'Shasta', kiddingDate: '3/23/23', id: '1'},
                        {doe: 'Mist', buck: 'Chino', kiddingDate: '3/11/23', id: '2'}]}
 */

const styles = StyleSheet.create({
        mainContainer: {flex: 1},
        headerContainer: { flexDirection: "row", justifyContent: 'space-around'},
        headers: {fontWeight: "bold"}
})

export default HomeScreen;
