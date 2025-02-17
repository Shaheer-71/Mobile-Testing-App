import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { requestMicrophonePermission } from '../../components/AudioPermissions';
import { useButtonContext } from '../../../ButtonContext';
import { useNavigation } from '@react-navigation/native';

const audioRecorderPlayer = new AudioRecorderPlayer();

const MicTest = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioPath, setAudioPath] = useState('');
    const [recordingAnimation, setRecordingAnimation] = useState(false);
    const [playingAnimation, setPlayingAnimation] = useState(false);
    const { setMicState } = useButtonContext();
    const navigation = useNavigation();

    useEffect(() => {
        requestMicrophonePermission();
    }, []);

    useEffect(() => {

        if (isRecording) {
            const interval = setInterval(() => {
                setRecordingAnimation(prevState => !prevState);
            }, 500);
            return () => clearInterval(interval);
        }

        if (isPlaying) {
            const interval = setInterval(() => {
                setPlayingAnimation(prevState => !prevState);
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isRecording, isPlaying]);

    const startRecording = async () => {
        try {
            const path = await audioRecorderPlayer.startRecorder();
            console.log('Recording started', path);
            setIsRecording(true);
            setAudioPath(path);
        } catch (error) {
            console.error('startRecording error', error);
            Alert.alert('Error', 'Failed to start recording.');
        }
    };

    const stopRecording = async () => {
        try {
            const result = await audioRecorderPlayer.stopRecorder();
            console.log('Recording stopped', result);
            setIsRecording(false);
        } catch (error) {
            console.error('stopRecording error', error);
            Alert.alert('Error', 'Failed to stop recording.');
        }
    };

    const startPlaying = async () => {
        try {
            const path = audioPath;
            await audioRecorderPlayer.startPlayer(path);
            setIsPlaying(true);
        } catch (error) {
            console.error('startPlaying error', error);
            Alert.alert('Error', 'Failed to start playback.');
        }
    };

    const stopPlaying = async () => {
        try {
            await audioRecorderPlayer.stopPlayer();
            setIsPlaying(false);
        } catch (error) {
            console.error('stopPlaying error', error);
            Alert.alert('Error', 'Failed to stop playback.');
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity
                onPress={isRecording ? stopRecording : startRecording}
                style={styles.button} >
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>

                </View>
                {isRecording && (
                    <View style={styles.recordingAnimationContainer}>
                        <View style={[styles.recordingDot, { opacity: recordingAnimation ? 1 : 0 }]} />
                    </View>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                onPress={isPlaying ? stopPlaying : startPlaying}
                style={[styles.button, !audioPath ? styles.disabledButton : {}]}
                disabled={!audioPath}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text>{isPlaying ? 'Stop Playing' : 'Start Playing'}</Text>

                </View>
                {isPlaying && (
                    <View style={[styles.playingDot, { opacity: playingAnimation ? 1 : 0 }]} />
                )}
            </TouchableOpacity>

            <View style={styles.decisionButtonContainer}>

                <TouchableOpacity style={styles.decisionButton} onPress={() => { setMicState("#7CB342"), navigation.goBack() }}>
                    <Text>Pass</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.decisionButton} onPress={() => { setMicState("#F44336"), navigation.goBack() }}>
                    <Text>Fail</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};

export default MicTest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fdd5b1',
        width: "50%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: "row"
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    decisionButton: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fdd5b1',
        width: "30%",
        borderRadius: 10,
        alignItems: "center",
    },
    decisionButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "50%",
    },
    recordingAnimationContainer: {
        // position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
    },
    recordingDot: {
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: '#F44336',
        alignSelf: "center",
        opacity: 0,
    },
    playingDot: {
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: '#7CB342',
        alignSelf: "center",
        opacity: 0,
    },
});
