import React, { createContext, useContext, useState } from 'react';

const ButtonContext = createContext();

export const ButtonProvider = ({ children }) => {
  const [speakerState, setSpeakerState] = useState("");
  const [screenState, setScreenState] = useState("");
  const [cameraState, setCameraState] = useState("");
  const [micState, setMicState] = useState("");
  const [sensorState, setSensorState] = useState("");
  const [fingerState, setFingerState] = useState("");
  const [nfcState, setNfcState] = useState("");

  return (
    <ButtonContext.Provider value={{
      speakerState, setSpeakerState,
      screenState, setScreenState,
      cameraState, setCameraState,
      micState, setMicState,
      sensorState, setSensorState,
      fingerState, setFingerState,
      nfcState, setNfcState
    }}>

      {children}
      
    </ButtonContext.Provider>
  );
};

export const useButtonContext = () => useContext(ButtonContext);
