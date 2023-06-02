import React from "react";
import { View, StyleSheet } from "react-native";

const LineSeparator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default LineSeparator;
