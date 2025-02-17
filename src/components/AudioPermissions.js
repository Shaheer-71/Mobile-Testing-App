import { Platform, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestMicrophonePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const permissionGranted = await AsyncStorage.getItem('micPermissionGranted');

      if (permissionGranted !== 'true') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ];
        
        const granted = await PermissionsAndroid.requestMultiple(permissions);

        if (
          granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Microphone permission granted');
          await AsyncStorage.setItem('micPermissionGranted', 'true');
        } else {
          console.log('Microphone permission denied');
        }
      } else {
        console.log('Microphone permission has already been granted');
      }
    } catch (error) {
      console.error('Error requesting microphone permission:', error);
    }
  }
};
