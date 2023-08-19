import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

export default function App({ uri, stopAudio }) {
  const [audio, setAudio] = useState(null); // audio object
  const [isPlaying, setIsPlaying] = useState(false); // isPlaying state variable to check if audio is playing
  const [position, setPosition] = useState(0); // position state variable to set position of audio
  const [duration, setDuration] = useState(0); // duration state variable to set duration of audio

  useEffect(() => {
    const loadAudio = async () => {
      if (uri) {
        const { sound, status } = await Audio.Sound.createAsync(
          { uri }, // source
          { shouldPlay: true, staysActiveInBackground: true } // initial status: auto play the audio and stay active in background
        );
        setAudio(sound); // set audio object
        setDuration(status.durationMillis); // set duration
        setPosition(0); // reset position
        setIsPlaying(true); // set isPlaying to true
      }
    };

    loadAudio(); // load the audio when the component mounts

    return () => {
      if (audio) {
        setIsPlaying(false); // set isPlaying to false
      }
    };
  }, [uri]);

  useEffect(() => {
    if (audio) {
      // if audio is set then set isPlaying to true
      const updatePosition = setInterval(async () => {
        const currentPosition = await audio.getStatusAsync(); // get current position of audio
        setPosition(currentPosition.positionMillis); // set position state variable
      }, 1000);

      return () => clearInterval(updatePosition); // clear interval to avoid memory leaks
    }
  }, [audio]);

  const setAudioMode = async () => {
    if (audio) {
      await audio.setAudioModeAsync({ staysActiveInBackground: true });
    }
  };

  useEffect(() => {
    setAudioMode();
  }, [audio]);

  // Rest of your component code

  useEffect(() => {
    if (audio) {
      if (stopAudio) {
        audio.stopAsync(); // Stop audio if stopAudio is true
        setIsPlaying(false);
        setPosition(0);
      }
    }
  }, [stopAudio]);

  // Rest of your component code

  const handlePlayPause = async () => {
    if (audio) {
      if (isPlaying) {
        // if audio is playing then pause it
        await audio.pauseAsync();
        setIsPlaying(false);
      } else {
        await audio.playAsync(); // if audio is not playing then play it
        setIsPlaying(true);
      }
    }
  };

  const handleSeek = async (value) => {
    if (audio) {
      await audio.setPositionAsync(value); // seek audio to the position
      setPosition(value);
    }
  };

  const handleStop = () => {
    if (audio) {
      audio.stopAsync();
      setIsPlaying(false);
      setPosition(0);
    }
  };

  return (
    <View style={styles.container}>
      {/* // this button will play/pause the audio */}
      <TouchableOpacity onPress={handlePlayPause} style={{ padding: 10 }}>
        {isPlaying ? (
          <Ionicons name="pause" size={24} color="black" />
        ) : (
          <Ionicons name="play" size={24} color="black" />
        )}
      </TouchableOpacity>

      {/* // this is a progress bar of audio */}
      <Slider
        style={styles.slider} // style
        minimumValue={0}
        maximumValue={duration} // maximum value should be duration of audio
        value={position}
        onSlidingComplete={handleSeek} // seek the audio when slider is moved
        disabled={!audio}
      />
      <Text>
        {Math.floor(position / 1000)}s / {Math.floor(duration / 1000)}s
      </Text>
      <TouchableOpacity onPress={handleStop} style={{ padding: 10 }}>
        <MaterialCommunityIcons name="stop" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  slider: {
    width: "50%",
    marginTop: 20,
  },
});
