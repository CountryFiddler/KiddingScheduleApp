import {Component} from "react";
import {StyleSheet, Text, View} from "react-native";


const KiddingEntry = props => {

    console.log(props.doe);

    return (
        <View style={styles.mainContainer}>
            <View >
            <Text> {props.doe} </Text>
            </View>
            <Text> {props.buck} </Text>
            <Text> {props.kiddingDate} </Text>
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
