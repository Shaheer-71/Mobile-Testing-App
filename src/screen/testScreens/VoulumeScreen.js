import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Sound from 'react-native-sound';
import { VolumeManager } from 'react-native-volume-manager';
import { useButtonContext } from '../../../ButtonContext';
import { useNavigation } from '@react-navigation/native';

const VolumeScreen = () => {
    const [volume, setVolume] = useState(0.5);
    const [soundPlaying, setSoundPlaying] = useState(false);
    const [soundInstance, setSoundInstance] = useState(null);
    const { setSpeakerState } = useButtonContext()
    const navigation = useNavigation()

    const audioTests = [
        {
            title: 'mp3 in bundle (looped)',
            url: 'testsound.mp3',
            basePath: Sound.MAIN_BUNDLE,
            onPrepared: (sound, component) => {
                sound.setNumberOfLoops(-1);
                component.setState({ loopingSound: sound });
            },
        }
    ];

    useEffect(() => {
        VolumeManager.showNativeVolumeUI({ enabled: true });

        const fetchVolume = async () => {
            const { volume } = await VolumeManager.getVolume();
            setVolume(volume);
        };
        fetchVolume();

        const volumeListener = VolumeManager.addVolumeListener((result) => {
            setVolume(result.volume);
        });

        return () => {
            volumeListener.remove();
        };
    }, []);

    const increaseVolume = async () => {
        const newVolume = Math.min(1, volume + 0.1);
        await VolumeManager.setVolume(newVolume);
        setVolume(newVolume);
    };

    const decreaseVolume = async () => {
        const newVolume = Math.max(0, volume - 0.1);
        await VolumeManager.setVolume(newVolume);
        setVolume(newVolume);
    };

    const handlePlaySound = () => {
        if (soundInstance) {
            if (soundPlaying) {
                console.log('Pausing Sound');
                soundInstance.pause();
            } else {
                console.log("Resuming Sound");
                soundInstance.play();
            }
            setSoundPlaying(!soundPlaying);
        } else {
            console.log("Playing Sound");
            const testInfo = audioTests[0];
            console.log("Test URL", testInfo.url);

            if (!testInfo || !testInfo.url) {
                console.log("Test info or URL is invalid");
                return;
            }

            const sound = new Sound(testInfo.url, '', (error) => {
                if (error) {
                    console.log('Failed to load the sound', error);
                    return;
                }

                console.log('Sound loaded successfully');
                setSoundInstance(sound);
                setSoundPlaying(true);

                sound.play((success) => {
                    console.log('Sound playback completed');
                    setSoundPlaying(false);
                    sound.release();
                    setSoundInstance(null);
                });
            });
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text>Current Volume: {volume.toFixed(2)}</Text>

            <TouchableOpacity style={styles.button} onPress={handlePlaySound}>
                <Text>{soundPlaying ? 'Pause Sound' : 'Play Sound'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={increaseVolume}>
                <Text>Increase Volume</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={decreaseVolume}>
                <Text>Decrease Volume</Text>
            </TouchableOpacity>


            <View style={{ flexDirection: "row", justifyContent: "space-around", width: "50%" }}>

                <TouchableOpacity style={styles.decisionButton} onPress={() => { setSpeakerState("#7CB342"), navigation.goBack(), soundInstance?.pause(); }}>
                    <Text>Pass</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.decisionButton} onPress={() => { setSpeakerState("#F44336"), navigation.goBack(), soundInstance?.pause(); }}>
                    <Text>Fail</Text>
                </TouchableOpacity>

            </View>


        </View>
    );
};

export default VolumeScreen;

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fdd5b1',
        width: "50%",
        borderRadius: 10,
        alignItems: "center"
    },
    decisionButton: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fdd5b1',
        width: "30%",
        borderRadius: 10,
        alignItems: "center"
    }
});
