import { View, Text, ScrollView } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import DrawerButton from "../components/DrawerButton";
import { useNavigation } from "@react-navigation/native";

export default function GeneralScreen({ title, subtitle }) {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Text style={{ color: "white", fontSize: 24 }}>Nice City</Text>
      <DrawerButton />
      <View
        style={{
          height: 1,
          backgroundColor: "#C6E4FC",
          marginVertical: 10,
          marginBottom: 60,
        }}
      ></View>
      <View style={styles.textbox}>
        <Text
          style={{
            color: "black",
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          {subtitle}
        </Text>
        <Text style={styles.bodytext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
          urna vel Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          auctor urna vel. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Sed auctor urna vel Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed auctor urna vel. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed auctor urna vel Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Sed auctor urna vel. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed auctor urna vel Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor urna
          vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          auctor urna vel Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Sed auctor urna vel.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#54B0F6",
    paddingLeft: 25,
    paddingBottom: 50,
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 90,
  },
  bodytext: {
    fontSize: 18,
    color: "black",
    textAlign: "justify",
    margin: 20,
  },
  textbox: {
    width: "90%",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
});
