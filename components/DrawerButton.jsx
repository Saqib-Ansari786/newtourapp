import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DrawerButton() {
  const navigation = useNavigation();

  return (
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
  );
}
