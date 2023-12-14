import {Component, useState} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import KiddingEntry from "../components/KiddingEntry";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddBreedingPairModal} from "../components/AddBreedingPairModal";


const HomeScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
        return (
            <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headers}> Doe </Text>
                <Text style={styles.headers}> Buck </Text>
                    <Text style={styles.headers}> Bred </Text>
                <Text style={styles.headers}> Due </Text>
            </View>
                    <KiddingEntry doe={"Toffee"} buck={"Shasta"} kiddingDate={'3/11/24'}/>
                    <KiddingEntry doe={"Caramel Mist"} buck={"Chino"} kiddingDate={'3/11/24'}/>
                <Button title={'Add Breeding Pair'} onPress={openModal}/>
                <AddBreedingPairModal visible={modalVisible} closeModal={closeModal}/>

            </View>
        );
};

const styles = StyleSheet.create({
        mainContainer: {flex: 1},
        headerContainer: { flexDirection: "row", justifyContent: 'space-around'},
        headers: {fontWeight: "bold"}
})

export default HomeScreen;
