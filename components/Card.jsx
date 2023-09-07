import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const Card = ({ card, navigation, index }) => {
  return (
    <TouchableOpacity
      key={card.id}
      onPress={() =>
        navigation.navigate("CardDetail", {
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
          index % 2 === 0 ? styles.rightCard : styles.leftCard,
        ]}
      >
        <Image
          source={{
            uri: card.image,
          }}
          style={{
            width: "50%",
            resizeMode: "cover",
            overflow: "hidden",
            borderRadius: 10,
          }}
        />

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
