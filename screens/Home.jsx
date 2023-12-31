import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Swiper from "react-native-swiper";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import Card from "../components/Card";

// pics is the data we are using to display on corousel on  home screen
const pics = [
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    type: "image",
    url: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    type: "video",
    url: "https://v4.cdnpk.net/videvo_files/video/free/video0467/large_watermarked/_import_61543a2ab8a241.87089204_FPpreview.mp4",
  },
  {
    type: "image",
    url: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    type: "video",
    url: "https://v4.cdnpk.net/videvo_files/video/free/video0467/large_watermarked/_import_61543a2ab8a241.87089204_FPpreview.mp4",
  },
];

const CardList = () => {
  // navigation is used to navigate between screens
  const navigation = useNavigation();
  const [firebasedatalist, setDatalist] = useState();
  const [audiolist, setAudiolist] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const dbRef = ref(db, "items/");

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const dataList = Object.values(data);
      setDatalist(dataList);
      setAudiolist(dataList.map((item) => item.audio));

      dispatch({ type: "DATA", payload: dataList });
      dispatch({ type: "AUDIO", payload: dataList.map((item) => item.audio) });
    });
  }, []);
  return (
    // ScrollView is used to make the content scrollable
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* // this is the main container */}
        <Swiper // swiper is used to display the images and videos
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
          autoplay={true} // autoplay is used to autoplay the images and videos
        >
          {/* // pics is the data we want to display in which pics and videos are there. */}
          {pics.map((pic, index) => (
            <View key={index}>
              {pic.type === "image" ? ( // if the type is image then display image else display video
                <Image
                  source={{ uri: pic.url }}
                  style={{
                    width: "100%",
                    height: 250,
                    resizeMode: "cover",
                  }}
                />
              ) : (
                // if the type is video then display video
                <Video
                  source={{ uri: pic.url }}
                  style={{
                    width: "100%",
                    height: 250,
                    resizeMode: "cover",
                  }}
                  shouldPlay
                />
              )}
            </View>
          ))}
        </Swiper>

        <View // this is the header burger icon button which will open the drawer
          style={{
            position: "absolute",
            top: 40,
            left: 20,
            right: 20,
            //height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                // onPress is used to open the drawer
                navigation.openDrawer();
              }}
            >
              <Ionicons name="menu-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            paddingTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.title}>Audio tour guide</Text>
            <FontAwesome5 name="headphones" size={24} color="grey" />
          </View>
          {/* // this is where we are showing firebase data */}
          {firebasedatalist &&
            firebasedatalist.map(
              (
                card,
                index // map is used to loop through the data. Alternative for flatlist
              ) => {
                const nextIndex = (index + 1) % firebasedatalist.length; // Calculate the index of the next object in a circular manner
                const nextCard = firebasedatalist[nextIndex];
                return (
                  <Card
                    card={{
                      ...card, // spread operator is used to spread the data
                      nextCard, // nextCard is used to pass the next card data
                      nextIndex, // nextIndex is used to pass the next index
                      index: index, // index is used to pass the index
                    }}
                    index={index} // index is used to identify the card
                    navigation={navigation} // navigation is used to navigate between screens
                    key={index} // key is used to identify the card
                  />
                );
              }
            )}
        </View>
      </ScrollView>

      {/* // this is the map button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          left: "40%", // left is used to set the position of the button from left
          bottom: "40%", // bottom is used to set the position of the button from bottom
          backgroundColor: "rgba(0,0,0,0.3)", // backgroundColor is used to set the background color of the button
          paddingHorizontal: 20, // paddingHorizontal is used to set the horizontal padding of the button
          paddingVertical: 10, // paddingVertical is used to set the vertical padding of the button
          borderRadius: 10, // borderRadius is used to give the button rounded corners
          flexDirection: "row",
        }}
        onPress={() => navigation.navigate("MapLocation")} // onPress is used to navigate to the MapLocation screen
      >
        <Text style={{ color: "white", fontWeight: "bold", marginRight: 10 }}>
          Map
        </Text>
        {/* // Feather is used to display the map icon */}
        <Feather name="map" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  cardContainer: {
    width: "100%", // width is used to set the width of the card
    borderRadius: 10, // borderRadius is used to give the card rounded corners
    marginBottom: 10, // marginBottom is used to give space between the cards
    flexDirection: "row", // flexDirection is used to set the direction of the content
    paddingHorizontal: 10, // paddingHorizontal is used to give space between the content and the edge of the card
  },
  leftCard: {
    alignSelf: "flex-end", // alignSelf is used to align the card to the left side for even index
    flexDirection: "row-reverse", // flexDirection is used to set the direction of the content
  },
  rightCard: {
    alignSelf: "flex-start", // alignSelf is used to align the card to the right side for odd index
  },
  cardContent: {
    padding: 10, // padding is used to give space between the content and the edge of the card
    alignSelf: "flex-end", // alignSelf is used to align the content to the left side
    width: "50%", // width is used to set the width of the content
  },
  cardTitle: {
    fontWeight: "bold", // fontWeight is used to make the title bold
    fontSize: 20, // fontSize is used to set the size of the title
    color: "#FF5733", // color is used to set the color of the title
    marginBottom: 5, // marginBottom is used to give space between the title and the description
  },
  cardDescription: {
    fontSize: 14, // fontSize is used to set the size of the description
    color: "#000", // color is used to set the color of the description
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2B2B2B",
    margin: 10,
    letterSpacing: 1,
  },
  pointText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginVertical: 5,
    textAlign: "center",
  },
  cardPoint: {
    backgroundColor: "#FF5733",
    borderRadius: 10,
    width: "70%",
  },
});

export default CardList;
