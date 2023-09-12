import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import TrackPlayer, {
  Capability,
  State,
  Event,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  AppKilledPlaybackBehavior,
} from "react-native-track-player";
import Slider from "@react-native-community/slider";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

function MusicPlayer({ audioUrl, stopAudio, skipto }) {
  const { audiolist } = useSelector((state) => state.data);

  const podcastsCount = audiolist.length;
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();

  const playBackState = usePlaybackState();
  const progress = useProgress();

  const tracks = audiolist.map((audioUrl) => ({
    id: audioUrl, // You can set a unique ID for each track
    url: audioUrl,
    title: "Your Default Title", // Set your default title here
    artist: "Your Default Artist", // Set your default artist here
    artwork: "URL_to_default_artwork_image", // Set a default artwork URL here
  }));

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer(); // this is where we initialize the player
      await TrackPlayer.updateOptions({
        // this is where we set the player controls
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        // An array of capabilities that will show up when the notification is in the compact form on Android
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        // this function Appkilled will be called when the app is closed and we want to stop the audio
      });
      await TrackPlayer.add(tracks); // add the tracks to the playlist
      await gettrackdata(); // get the track data
      await TrackPlayer.play(); // start playing the tracks
    } catch (error) {
      console.log(error);
    }
  };

  const gettrackdata = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack(); // get the current track
    let trackObject = await TrackPlayer.getTrack(trackIndex); // get the current track object
    console.log(trackIndex);
    setTrackIndex(trackIndex);
    setTrackTitle(trackObject.title);
    setTrackArtist(trackObject.artist);
    setTrackArtwork(trackObject.artwork);
  };

  const togglePlayBack = async (playBackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack(); // this is where we get the current track
    if (currentTrack != null) {
      // if there is a track playing at the moment
      if ((playBackState == State.Paused) | (playBackState == State.Ready)) {
        // if the current state of the track is paused or ready
        await TrackPlayer.play(); // start playing the track
      } else {
        await TrackPlayer.pause(); // else pause the track
      }
    }
  };

  const nexttrack = async () => {
    if (trackIndex < podcastsCount - 1) {
      // if the track index is less than the total number of tracks
      await TrackPlayer.skipToNext(); // skip to the next track
      gettrackdata();
    }
  };

  const previoustrack = async () => {
    if (trackIndex >= 0) {
      // if the track index is greater than and equal to 0
      await TrackPlayer.skipToPrevious(); // skip to the previous track
      gettrackdata(); // get the track data
    }
  };

  const skipTo = async (trackIndex) => {
    if (trackIndex >= podcastsCount - 1) {
      // if the track index is greater than and equal to the total number of tracks
      trackIndex = podcastsCount - 1; // set the track index to the total number of tracks
    }

    if (trackIndex >= 0) {
      await TrackPlayer.skip(trackIndex); // skip to the track index
      gettrackdata(); // get the track data
    }
  };

  useEffect(() => {
    setupPlayer(); // initialized the player first time
  }, []);

  useEffect(() => {
    if (skipto) {
      // if the there is index to skip to
      skipTo(skipto);
    }
  }, [skipto]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.songText}>
          {/* // this is where we display the track data */}
          <Text style={[styles.songContent, styles.songTitle]}>
            {trackTitle}
          </Text>
          <Text style={[styles.songContent, styles.songArtist]}>
            {trackArtist}
          </Text>
        </View>
        <View>
          {/* // slider to show the progress of the track */}
          <Slider
            style={styles.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="black"
            maximumTrackTintColor="gray"
            onSlidingComplete={async (value) =>
              await TrackPlayer.getRepeatMode()
            }
          />
          {/* // this is where we show the current position */}
          <View style={styles.progressLevelDuraiton}>
            <Text style={styles.progressLabelText}>
              {new Date(progress.position * 1000)
                .toLocaleTimeString()
                .substring(3)}
            </Text>
            {/* //  this is where we show the total duration of the track */}
            <Text style={styles.progressLabelText}>
              {new Date((progress.duration - progress.position) * 1000)
                .toLocaleTimeString()
                .substring(3)}
            </Text>
          </View>
        </View>
        {/* // this is where we show music controls */}
        <View style={styles.musicControlsContainer}>
          {/* // this is the previous track button */}
          <TouchableOpacity onPress={previoustrack}>
            <Ionicons name="play-skip-back-outline" size={35} color="black" />
          </TouchableOpacity>
          {/* // this is the play/pause button */}
          <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
            <Ionicons
              name={
                playBackState === State.Playing
                  ? "ios-pause-circle"
                  : playBackState === State.Connecting
                  ? "ios-caret-down-circle"
                  : "ios-play-circle"
              }
              size={75}
              color="black"
            />
          </TouchableOpacity>
          {/* // this is the next track button */}
          <TouchableOpacity onPress={nexttrack}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MusicPlayer;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    color: "black",
  },
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainWrapper: {
    width: width,
    height: width,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    alignSelf: "center",
    width: "90%",
    height: "90%",
    borderRadius: 15,
  },
  songText: {
    marginTop: 2,
    height: 70,
  },
  songContent: {
    textAlign: "center",
    color: "black",
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  songArtist: {
    fontSize: 16,
    fontWeight: "300",
  },
  progressBar: {
    alignSelf: "stretch",
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
  progressLevelDuraiton: {
    width: width,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {},
  musicControlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "60%",
  },
});
