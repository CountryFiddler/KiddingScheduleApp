import {Component, useEffect, useState} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {AddBreedingPairModal} from "./AddBreedingPairModal";
import {EditBreedingPairModal} from "./EditBreedingPairModal";
import EditBreedingPairScreen from "../screens/EditBreedingPairScreen";
import {useFonts} from "expo-font";
import * as Font from 'expo-font'
import * as SplashScreen from "expo-splash-screen";
import { AppLoading } from 'expo';


const KiddingEntry = props => {

    const [editMode, setEditMode] = useState(props.editMode)

    //console.log(editMode);
    /*const fetchFonts = async () =>
        await Font.loadAsync({
            'Weston Free': require('../assets/fonts/Weston Free.otf'),
        });
    //console.log(props.doe);*/


        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.multipleItemsContainer}>
                        <View style={styles.singleTextItemContainer}>
                            <Text style={styles.kiddingEntryText}> Doe: {props.doe} </Text>
                        </View>
                        <View style={styles.singleTextItemContainer}>
                            <Text style={styles.kiddingEntryText}> Buck: {props.buck} </Text>
                        </View>
                    </View>
                    <View style={styles.multipleItemsContainer}>
                        <View style={styles.singleTextItemContainer}>
                            <Text style={styles.kiddingEntryText}> Bred: {props.breedingDate} </Text>
                        </View>
                        <View style={styles.singleTextItemContainer}>
                            <Text style={styles.kiddingEntryText}> Due: {props.kiddingDate} </Text>
                        </View>
                    </View>
                    <View style={styles.decorativeLine}/>
                </View>
                {props.editMode ? (
                    <Button title={'Edit'} onPress={() => props.navigation.navigate('EditBreedingPairScreen', {
                        doe: props.doe, buck: props.buck, breedingDate: props.breedingDate,
                        kiddingDate: props.kiddingDate
                    })}/>
                ) : null}

            </View>
        );
};

const styles = StyleSheet.create({
    mainContainer: {flexDirection: "row", justifyContent: 'space-around'},
    contentContainer: {flexDirection: "column", width: '95%', marginLeft: '2%', margin: '2%'},
    headerContainer: { flexDirection: "row", justifyContent: 'center'},
    headers: {fontWeight: "bold"},
    does: {alignSelf: 'flex-start'},
    color: {color: 'black'},
    multipleItemsContainer: {flexDirection: "row", justifyContent: 'flex-start', margin: '2%'},
    importantDatesContainer: {},
    singleTextItemContainer: {flexDirection: 'row', alignSelf: 'flex-start', width:'50%'},
    kiddingEntryText: {fontFamily: 'WestonFree',  fontSize: 18},
    decorativeLine: {borderWidth: '3px', borderColor: '#000034', marginTop: '5%', borderRadius: '10%'},
})

export default KiddingEntry;
