import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useButtonContext } from '../../../ButtonContext';

const HomeScreen = () => {

    const navigation = useNavigation()
    const { speakerState, screenState, cameraState, micState } = useButtonContext()


    return (
        <View style={styles.container}>

            <TouchableOpacity
                onPress={() => navigation.navigate("Mic")}
                style={[styles.button, { backgroundColor: micState ? micState : '#fdd5b1' }]}>
                <Text style={styles.text}>Microphone</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Screen")}
                style={[styles.button, { backgroundColor: screenState ? screenState : '#fdd5b1' }]}>
                <Text style={styles.text}>Screen</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Volume")}
                style={[styles.button, { backgroundColor: speakerState ? speakerState : '#fdd5b1' }]}>
                <Text style={styles.text}>Speaker</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Camera")}
                style={[styles.button, { backgroundColor: cameraState ? cameraState : '#fdd5b1' }]}>
                <Text style={styles.text}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Sensor")}
                style={[styles.button, styles.Opacity]}>
                <Text style={styles.text}>Sensor</Text>
            </TouchableOpacity>



            <TouchableOpacity
                onPress={() => navigation.navigate("Fingerprint")}
                style={[styles.button, styles.Opacity]}>
                <Text style={styles.text}>Finger</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Nfc")}
                style={[styles.button, styles.Opacity]}>
                <Text style={styles.text}>NFC</Text>
            </TouchableOpacity>


        </View >
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    button: {
        margin: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '70%',
        elevation: 3,
        borderRadius: 10
    },
    text: {
        textAlign: 'center',
        color: '#4C4B4B',
        fontSize: 18,
    },

    screen: {
        backgroundColor: '#add8e6',
    },
    Opacity: {
        backgroundColor: '#fdd5b1'
    },

});
