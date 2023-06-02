import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";

export default function MapLocation() {
  const [coordinates, setCoordinates] = useState({
    latitude: 37.78825, // To be changed with the current location
    longitude: -122.4324,  // To be changed with the current location
    latitudeDelta: 0.0922, // this is the zoom level
    longitudeDelta: 0.0421, // this is the zoom level
  });
  return (
    <View style={styles.container}>
    {/* // this is the map view component from react-native-maps */}
      <MapView style={styles.map} initialRegion={coordinates} /> 
      {/* // this is the header component */}
      <Header> 
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity>
            <Ionicons name="bookmark" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Header>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
