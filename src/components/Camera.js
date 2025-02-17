import React, { useState } from 'react';
import { launchCamera } from 'react-native-image-picker';

const Camera = ({ submitted, setSubmitted }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const takePhoto = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.5,
        includeBase64: true,
      });

      if (!result.didCancel && !result.error) {
        const image = result.assets[0];
        setSelectedImage(image);
      } else {
        console.log(result.didCancel ? 'Camera was cancelled' : 'Camera error:', result.error);
      }
    } catch (error) {
      console.log('Error while taking a photo:', error);
    }

    return null;
  };

  return { selectedImage , takePhoto};
};

export default Camera;