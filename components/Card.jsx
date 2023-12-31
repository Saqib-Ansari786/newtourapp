import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const Card = ({ card, navigation, index }) => {
  // card is the object of the card, navigation is used to navigate between screens, index is the index of the card in the array
  return (
    // TouchableOpacity is used to make the card clickable
    <TouchableOpacity
      key={card.id}
      onPress={() =>
        navigation.navigate("CardDetail", {
          // navigate to the CardDetail screen and pass the card object to it
          title: card.title,
          description: card.description,
          image: card.image,
          id: card.id,
          gallery: card.gallery,
          nextCard: card.nextCard,
          nextIndex: card.nextIndex,
          audio: card.audio,
        })
      }
    >
      <View
        style={[
          styles.cardContainer,
          index % 2 === 0 ? styles.rightCard : styles.leftCard, // if the index is even, the card will be on the right side, else it will be on the left side
        ]}
      >
        <Image
          source={{
            uri: card.image, // image is the url of the image
          }}
          style={{
            width: "50%", // width is used to set the width of the image
            resizeMode: "cover", // resizeMode is used to set the image fit cover
            overflow: "hidden", // overflow is used to hide the content that overflows the width or height of the image
            borderRadius: 10, // borderRadius is used to give the image rounded corners
          }}
        />
        {/* // this is card content which contains the title and the description */}
        <View style={styles.cardContent}>
          <View style={styles.cardPoint}>
            <Text style={styles.pointText}>{card.position}</Text>
          </View>
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Text style={styles.cardDescription} numberOfLines={10}>
            {card.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
  clampedDescription: {
    overflow: "hidden",
  },
  readMoreButton: {
    color: "blue", // Customize the color
    marginTop: 5,
  },
});

export default Card;
