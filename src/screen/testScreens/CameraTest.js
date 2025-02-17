import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useButtonContext } from '../../../ButtonContext';
import { useNavigation } from '@react-navigation/native';
import Camera from '../../components/Camera';

const CameraTest = () => {

    const { setCameraState } = useButtonContext()
    const navigation = useNavigation()
    const [selectedImage, setSelectedImage] = useState(null);

    const { takePhoto } = Camera({ submitted: false, setSubmitted: () => { } });

    const handleLaunchCamera = async () => {
        const image = await takePhoto();
        if (image) {
            setSelectedImage(image);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={handleLaunchCamera}
                style={styles.button}>
                <Text>Launch Camera</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", justifyContent: "space-around", width: "50%" }}>

                <TouchableOpacity style={styles.decisionButton} onPress={() => { setCameraState("#7CB342"), navigation.goBack() }}>
                    <Text>Pass</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.decisionButton} onPress={() => { setCameraState("#F44336"), navigation.goBack() }}>
                    <Text>Fail</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default CameraTest

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
})