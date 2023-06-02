import React, { useEffect } from "react";
// import video component
import { Video } from "expo-av"; // expo-av is used for playing video
import { StyleSheet, View, Image, Animated, Easing, Text } from "react-native"; // importing required components

const SplashScreen = ({ navigation }) => {
  // Fade animation which have value 0 initially and will be changed slowly to 1
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  // Starting fade animation  and After 5 seconds navigate to Home screen
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // final value of animation
      duration: 8000, // duration of animation
      easing: Easing.linear, // easing function this is used for making animation smooth
      useNativeDriver: true, // this is for making animation smooth
    }).start(() => {
      navigation.navigate("Home"); // navigate to Home screen
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Video component  */}
      <Video
        source={{
          uri: "https://v4.cdnpk.net/videvo_files/video/free/video0467/large_watermarked/_import_61543a2ab8a241.87089204_FPpreview.mp4",
        }} // video source for youtube video
        shouldPlay
        resizeMode="cover"
        style={styles.backgroundVideo}
      />
      {/* Logo component fade animation applied  */}
      {/* opacity is used for fade animation */}

      <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim }}>
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontStyle: "italic",
            letterSpacing: 2,
            marginBottom: 40,
          }}
        >
          | ABOUT |
        </Text>
        <Image
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} // logo source for online image
          style={styles.logo} // logo style
        />
        <Animated.View
          style={{
            opacity: fadeAnim,
            top: "180%",
            position: "absolute",
            width: 200,
            backgroundColor: "rgba(0,0,0,0.3)",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              marginBottom: 40,
              textAlign: "center",
            }}
          >
            lorem akda jada jadna jada ajdhad ajdad adkajda dkajdhad adikad
            amdkadna dkadjnakd akdakd asjd jasdnasd asdja
          </Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  // this is just default setting for container
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // for making video backgroundVideo
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  // for making logoContainer so that it covers the whole screen and logo is visible on the top of video
  logoContainer: {
    position: "absolute",
    top: "30%",
  },
  // defining logo size
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});

export default SplashScreen;
