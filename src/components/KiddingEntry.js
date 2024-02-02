import {Component, useEffect, useState} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {AddBreedingPairModal} from "./AddBreedingPairModal";
import {EditBreedingPairModal} from "./EditBreedingPairModal";
import EditBreedingPairScreen from "../screens/EditBreedingPairScreen";
import {useFonts} from "expo-font";
import * as Font from 'expo-font'
import * as SplashScreen from "expo-splash-screen";
import { AppLoading } from 'expo';
import {TouchableOpacity} from "react-native";


const KiddingEntry = props => {

    const [editMode, setEditMode] = useState(props.editMode)

    const breedingDate = new Date(props.breedingDate);

    const kiddingDate = new Date(props.kiddingDate);

    //console.log(editMode);
    /*const fetchFonts = async () =>
        await Font.loadAsync({
            'Weston Free': require('../assets/fonts/Weston Free.otf'),
        });
    //console.log(props.doe);*/


    if (props.editMode) {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.contentContainer} onPress={() => props.navigation.navigate('EditBreedingPairScreen', {
                    doe: props.doe, buck: props.buck, breedingDate: props.breedingDate,
                    kiddingDate: props.kiddingDate, id: props.id
                })}>
                    <View style={styles.singleTextItemContainer}>
                        <Text style={styles.kiddingEntryLabel}>Doe: </Text>
                        <Text style={styles.kiddingEntryText}>{props.doe}</Text>
                    </View>
                    <View style={styles.singleTextItemContainer}>
                        <Text style={styles.kiddingEntryLabel}>Buck: </Text>
                        <Text style={styles.kiddingEntryText}>{props.buck}</Text>
                    </View>
                    <View style={styles.singleTextItemContainer}>
                        <Text style={styles.kiddingEntryLabel}>Bred: </Text>
                        <Text style={styles.kiddingEntryText}>{props.breedingDate}</Text>
                    </View>
                    <View style={styles.singleTextItemContainer}>
                        <Text style={styles.dueDateLabel}>Due: </Text>
                        <Text style={styles.dueDateText}>{props.kiddingDate}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.decorativeLine}/>
            </View>
        );
    }    else {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>
                        <View style={styles.singleTextItemContainer}>
                            <Text style={styles.kiddingEntryLabel}>Doe: </Text>
                            <Text style={styles.kiddingEntryText}>{props.doe}</Text>
                        </View>
                        <View style={styles.singleTextItemContainer}>
                            <Text style={styles.kiddingEntryLabel}>Buck: </Text>
                            <Text style={styles.kiddingEntryText}>{props.buck}</Text>
                        </View>
                        <View style={styles.singleTextItemContainer}>
                            <Text style={styles.kiddingEntryLabel}>Bred: </Text>
                            <Text style={styles.kiddingEntryText}>{props.breedingDate}</Text>
                        </View>
                        <View style={styles.singleTextItemContainer}>
                            <Text style={styles.dueDateLabel}>Due: </Text>
                            <Text style={styles.dueDateText}>{props.kiddingDate}</Text>
                        </View>
                    </View>
                <View style={styles.decorativeLine}/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    mainContainer: {flexDirection: "column", justifyContent: 'space-around', alignItems: 'center'},
    contentContainer: {flexDirection: "column", width: '95%', marginLeft: '2%', margin: '2%'},
    headerContainer: { flexDirection: "row", justifyContent: 'center'},
    headers: {fontWeight: "bold"},
    does: {alignSelf: 'flex-start'},
    color: {color: 'black'},
    multipleItemsContainer: {flexDirection: "row", justifyContent: 'space-around', margin: '2%'},
    importantDatesContainer: {},
    singleTextItemContainer: {flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'},
    kiddingEntryText: {fontFamily: 'WestonFree',  fontSize: 20, marginTop: '2%', color: '#12284B'},
    kiddingEntryLabel: { fontFamily: 'WestonFree',  fontSize: 22, marginTop: '2%', color: '#12284B'},
    dueDateText: {fontFamily: 'WestonFree',  fontSize: 20, marginTop: '2%', color: '#B6922E'},
    dueDateLabel: { fontFamily: 'WestonFree',  fontSize: 22, marginTop: '2%', color: '#B6922E'},
    decorativeLine: {borderWidth: '2px', borderColor: '#12284B', marginTop: '2%', borderRadius: '10%', width: '95%'
    , backgroundColor: '#12284B'},
})

export default KiddingEntry;
