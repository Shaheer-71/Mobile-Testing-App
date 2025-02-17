import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useButtonContext } from '../../../ButtonContext';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const numColumns = 7;
const size = width / numColumns;
const numRows = Math.ceil(height / size - 1);

const TouchTestScreen = () => {
    const [activeBoxes, setActiveBoxes] = useState({});
    const { setScreenState } = useButtonContext();
    const navigation = useNavigation();
    const firstUpdate = useRef(true);
    const boxes = [];



    useEffect(() => {
        const initialBoxes = {};
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numColumns; col++) {
                initialBoxes[`${row}-${col}`] = false;
            }
        }
        setActiveBoxes(initialBoxes);
    }, []);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (checkAllBoxesActive()) {
            console.log("All boxes are active now.");
            setScreenState("#7CB342");  
            navigation.goBack();       
        }
    }, [activeBoxes]);
    
    const checkAllBoxesActive = () => {
        return Object.values(activeBoxes).every(isActive => isActive);
    };

    const onGestureEvent = (event) => {
        const { x, y } = event.nativeEvent;
        const col = Math.floor(x / size);
        const row = Math.floor(y / size);
        const key = `${row}-${col}`;
        setActiveBoxes(prevState => ({
            ...prevState,
            [key]: true
        }));
    };

    const renderBox = (row, col) => {
        const key = `${row}-${col}`;
        const isActive = !!activeBoxes[key];
        return (
            <View
                key={key}
                style={[styles.box, isActive && styles.activeBox]}
            />
        );
    };

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numColumns; col++) {
            boxes.push(renderBox(row, col));
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <View style={styles.container}>
                    {boxes}
                </View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: '#EBCFA4',
        width: width,
        height: height,
    },
    box: {
        width: size,
        height: size,
        borderWidth: 0.3,
        borderColor: 'grey',
    },
    activeBox: {
        backgroundColor: '#AED581',
    },
});

export default TouchTestScreen;
