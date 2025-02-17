// import { StyleSheet, Text, View } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import Proximity from 'react-native-proximity';

// const SesnsorTest = () => {
//   // State to store proximity and distance
//   const [proximityData, setProximityData] = useState({
//     proximity: false,
//     distance: 0, // Note: distance is only supported on Android
//   });

//   // Effect to handle lifecycle events
//   useEffect(() => {
//     const proximityListener = (data) => {
//       setProximityData({
//         proximity: data.proximity,
//         distance: data.distance,
//       });
//     };

//     // Add the proximity sensor listener
//     Proximity.addListener(proximityListener);

//     // Return a cleanup function to remove the listener
//     return () => {
//       Proximity.removeListener(proximityListener);
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>SesnsorTest</Text>
//       <Text>Proximity: {proximityData.proximity ? 'Near' : 'Far'}</Text>
//       {/* Display distance if available */}
//       {proximityData.distance !== undefined && (
//         <Text>Distance: {proximityData.distance} cm</Text>
//       )}
//     </View>
//   );
// };

// export default SesnsorTest;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
// });

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SesnsorTest = () => {
  return (
    <View>
      <Text>SesnsorTest</Text>
    </View>
  )
}

export default SesnsorTest

const styles = StyleSheet.create({})
