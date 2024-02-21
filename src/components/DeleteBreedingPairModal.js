import React, {useEffect, useState} from 'react';
import {View, Text, Modal, Button, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

export const DeleteBreedingPairModal = ({ visible, closeModal, deleteBreedingPair }) => {

    const closeDeleteModal = () => {
        closeModal();
    };

    const triggerDelete = () => {
        deleteBreedingPair(true);
        closeModal();
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                closeModal();
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.kiddingEntryLabel}>Are you sure you want to delete this breeding pair?</Text>
                    <View style={styles.decorativeLine2}/>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={closeDeleteModal}>
                            <View style={styles.cancelButtonContainer}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {triggerDelete()}}>
                            <View style={styles.deleteButtonContainer}>
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 100,
        paddingHorizontal: 25,
        borderRadius: 10,
        elevation: 5,
    },
    textInputText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 17,
    },
    kiddingEntryLabel: { fontFamily: 'WestonFree',  fontSize: 22, marginTop: '2%', color: '#12284B', textAlign: 'center'},
    buttonContainer: {flexDirection: 'row', justifyContent: 'space-evenly',  width: '100%', marginTop: '5%'},
    cancelButtonContainer: {flexDirection: 'column', alignItems: 'center', marginTop: '5%', borderWidth: '3px', borderColor: 'rgba(18, 40, 75, 0.85)',
        borderRadius: '10%'},
    cancelButtonText: {fontFamily: 'WestonFree',  fontSize: 22, marginTop: '2%', color: 'rgba(18, 40, 75, 0.85)', padding: 10},
    deleteButtonContainer: {flexDirection: 'column', alignItems: 'center', marginTop: '5%', borderWidth: '3px', borderColor: '#C41E3A',
        borderRadius: '10%'},
    deleteButtonText: {fontFamily: 'WestonFree',  fontSize: 22, marginTop: '2%', color: '#C41E3A', padding: 10},
    decorativeLine2: {borderWidth: '2px', borderColor: '#B6922E', marginTop: '5%',  borderRadius: '10%', width: '100%'},
});
