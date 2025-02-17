import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ButtonProvider } from './ButtonContext';
import HomeScreen from './src/screen/commonScreens/Home';
import VolumeScreen from './src/screen/testScreens/VoulumeScreen';
import CameraTest from './src/screen/testScreens/CameraTest';
import SesnsorTest from './src/screen/testScreens/SesnsorTest';
import MicTest from './src/screen/testScreens/MicTest';
import TouchTestScreen from './src/screen/testScreens/ScreenTest';
import NFC from './src/screen/testScreens/NFC';
import Fingerprint from './src/screen/testScreens/Fingerprint';

const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar hidden />
      <ButtonProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Volume" component={VolumeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Screen" component={TouchTestScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Sensor" component={SesnsorTest} options={{ headerShown: false }} />
          <Stack.Screen name="Camera" component={CameraTest} options={{ headerShown: false }} />
          <Stack.Screen name="Mic" component={MicTest} options={{ headerShown: false }} />
          <Stack.Screen name="Nfc" component={NFC} options={{ headerShown: false }} />
          <Stack.Screen name="Fingerprint" component={Fingerprint} options={{ headerShown: false }} />
        </Stack.Navigator>
      </ButtonProvider>
    </NavigationContainer>
  );

}


export default App

const styles = StyleSheet.create({})