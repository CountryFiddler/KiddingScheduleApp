import {Component} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {AddBreedingPairModal} from "./AddBreedingPairModal";
import {EditBreedingPairModal} from "./EditBreedingPairModal";
import EditBreedingPairScreen from "../screens/EditBreedingPairScreen";


const KiddingEntry = props => {

    console.log(props.doe);

    return (
        <View style={styles.mainContainer}>
            <View >
            <Text> {props.doe} </Text>
            </View>
            <Text> {props.buck} </Text>
            <Text> {props.kiddingDate} </Text>
            <Button title={'Edit'} onPress={() => props.navigation.navigate('EditBreedingPairScreen', {
                doe: props.doe, buck: props.buck, breedingDate: props.breedingDate,
                kiddingDate: props.kiddingDate
            })}/>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {flexDirection: "row", justifyContent: 'space-around', borderColor: 'black', borderWidth: '3px'},
    headerContainer: { flexDirection: "row", justifyContent: 'center'},
    headers: {fontWeight: "bold"},
    does: {alignSelf: 'flex-start'},
    color: {color: 'black'},
})

export default KiddingEntry;
