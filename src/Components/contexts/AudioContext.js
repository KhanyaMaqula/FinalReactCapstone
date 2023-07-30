import React, { useState, createContext, useContext } from 'react';

// Create the context
const AudioPlayerContext = createContext();

// Create a custom hook to use the context in child components
export const useAudioPlayer = () => {
  return useContext(AudioPlayerContext);
};

// Create a provider component to wrap the top-level component that needs access to the audio player state
export const AudioPlayerProvider = ({ children }) => {
  const [play, setPlay] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);

  return (
    <AudioPlayerContext.Provider value={{ play, setPlay, currentEpisode, setCurrentEpisode }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
