import {Component} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {AddBreedingPairModal} from "./AddBreedingPairModal";
import {EditBreedingPairModal} from "./EditBreedingPairModal";
import EditBreedingPairScreen from "../screens/EditBreedingPairScreen";
import {useFonts} from "expo-font";
import * as Font from 'expo-font'


const KiddingEntry = props => {

    const fetchFonts = async () =>
        await Font.loadAsync({
            'Weston Free': require('../assets/fonts/Weston Free.otf'),
        });
    //console.log(props.doe);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
            <View style={styles.multipleItemsContainer}>
                <View style={styles.singleTextItemContainer}>
                <Text style={styles.kiddingEntryText}> Doe: {props.doe} </Text>
                </View>
                <View style={styles.singleTextItemContainer}>
                <Text> Buck: {props.buck} </Text>
                </View>
            </View>
        <View style={styles.multipleItemsContainer}>
            <View style={styles.singleTextItemContainer}>
            <Text> Bred: {props.breedingDate} </Text>
            </View>
            <View style={styles.singleTextItemContainer}>
            <Text> Due: {props.kiddingDate} </Text>
            </View>
        </View>
            </View>
            <Button title={'Edit'} onPress={() => props.navigation.navigate('EditBreedingPairScreen', {
                doe: props.doe, buck: props.buck, breedingDate: props.breedingDate,
                kiddingDate: props.kiddingDate
            })}/>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {flexDirection: "row", justifyContent: 'space-around', borderColor: 'black', borderWidth: '3px'},
    contentContainer: {flexDirection: "column", borderColor: 'black', borderWidth: '3px', width: '85%', margin: '2%'},
    headerContainer: { flexDirection: "row", justifyContent: 'center'},
    headers: {fontWeight: "bold"},
    does: {alignSelf: 'flex-start'},
    color: {color: 'black'},
    multipleItemsContainer: {flexDirection: "row", borderColor: 'green', borderWidth: '3px', justifyContent: 'flex-start'},
    importantDatesContainer: {},
    singleTextItemContainer: {flexDirection: 'row', borderColor: 'blue', borderWidth: '3px', alignSelf: 'flex-start', width:'50%'},
    kiddingEntryText: {fontFamily: 'Weston Free', fontSize: 20},
})

export default KiddingEntry;
