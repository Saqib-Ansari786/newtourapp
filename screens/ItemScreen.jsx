import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import { StyleSheet } from "react-native";
import LineSeparator from "../components/LineSeparator";
import AudioPlayer from "../components/AudioPlayer";
import Header from "../components/Header";
import { cards } from "../data";
import { useNavigation } from "@react-navigation/native";

const pics = [
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/seed/picsum/200/300",
];

export default function CardDetail({ route }) {
  const { video, title, description, id, nextCard, nextIndex } = route.params; // here we are getting the data from route.params
  const navigation = useNavigation();
  const next1Index = (nextIndex + 1) % cards.length;
  const next1Card = cards[next1Index];
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
        {pics.map((pic, index) => (
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
        <AudioPlayer />
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
        onPress={() =>
          navigation.replace("CardDetail", {
            // Detail is the name of the screen we want to navigate to
            title: nextCard.title, // title, image, and description are the data we want to pass to the DetailScreen
            description: nextCard.description,
            image: nextCard.image,
            id: nextCard.id,
            gallery: nextCard.gallery,
            nextCard: next1Card,
            nextIndex: next1Index,
          })
        }
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
            source={{ uri: pics[0] }}
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
              position: "absolute", // position of the text
              bottom: 40, // bottom of the text
              left: 40, // left of the text
              letterSpacing: 2, // letter spacing
              fontWeight: "bold",
            }}
          >
            {nextCard.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "white",
              position: "absolute",
              bottom: 20,
              left: 40,
            }}
          >
            {nextCard.description}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  wrapper: {},
  slide: {},
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
