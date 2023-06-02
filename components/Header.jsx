import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ children }) {
  // children is the view that is passed as a prop to Header
  const navigation = useNavigation(); // get navigation object
  return (
    <View
      style={{
        position: "absolute", // position it absolutely
        top: 40, // 40px from top
        left: 20, // 20px from left
        right: 20, // 20px from right
        flexDirection: "row",
        justifyContent: "space-between", // space between children
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.3)", // 30% opacity black it is a dark overlay
          padding: 10,
          borderRadius: 10,
        }}
      >
        {/* // this button is used a button to go back to the previous screen */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}
