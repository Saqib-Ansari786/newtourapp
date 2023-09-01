import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import { StyleSheet } from "react-native";
import LineSeparator from "../components/LineSeparator";
import AudioPlayer from "../components/AudioPlayer";
import Header from "../components/Header";
import { cards } from "../data";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import MusicPlayer from "../components/TrackPlayer";

export default function CardDetail({ route }) {
  const { video, title, description, id, nextCard, nextIndex, gallery, audio } =
    route.params; // here we are getting the data from route.params
  const { data } = useSelector((state) => state.data);
  const navigation = useNavigation();
  const next1Index = (nextIndex + 1) % data.length;
  const next1Card = data[next1Index];
  const [stopAudio, setStopAudio] = React.useState(false);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* // this is the main container */}
      <Swiper
        style={styles.wrapper}
        dotColor="#959595" // color of the dots
        dotStyle={{
          // style for the dots
          width: 20,
          height: 5,
          borderRadius: 5,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
        }}
        activeDotColor="white" // color of the active dot
        activeDotStyle={{
          // style for the active dot
          width: 20,
          height: 5,
          borderRadius: 5,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
        }}
        height={250}
        autoplay={true} // autoplay the swiper
      >
        {/* // swiper is used to display the images and videos */}
        {gallery &&
          gallery.map((pic, index) => (
            <View key={index}>
              <Image
                source={{ uri: pic }}
                style={{
                  width: "100%",
                  height: 250,
                  resizeMode: "cover",
                }}
              />
            </View>
          ))}
      </Swiper>
      <Header />

      {/* // this is card content */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>{title}</Text>
        <Text style={{ fontSize: 16, color: "grey" }}>{description}</Text>
      </View>
      <LineSeparator />
      <View>
        <MusicPlayer />
      </View>
      <LineSeparator />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Transcription</Text>
        <Text style={{ fontSize: 16, color: "grey", marginTop: 10 }}>
          {description}
        </Text>
      </View>
      <LineSeparator />

      {/* // this is the next location section */}
      <TouchableOpacity
        style={{ padding: 20 }}
        onPress={() => {
          setStopAudio(true);
          navigation.replace("CardDetail", {
            // Detail is the name of the screen we want to navigate to
            title: nextCard.title, // title, image, and description are the data we want to pass to the DetailScreen
            description: nextCard.description,
            image: nextCard.image,
            id: nextCard.id,
            gallery: nextCard.gallery,
            nextCard: next1Card,
            nextIndex: next1Index,
          });
        }}
      >
        {/* // this is the title */}
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Next Locations</Text>
        <View
          style={{
            flex: 1,
            marginRight: 10,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image // this is the image
            source={{ uri: nextCard.image }}
            style={{
              width: "90%", // width of the image
              height: 150,
              resizeMode: "cover",
              borderRadius: 20,
            }}
          />
          <Text // this is the text
            style={{
              fontSize: 28, // font size
              color: "white", // color of the text
              bottom: 100, // bottom of the text
              letterSpacing: 2, // letter spacing
              fontWeight: "bold",
            }}
          >
            {nextCard.title}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
