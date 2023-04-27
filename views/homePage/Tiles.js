import React from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";

import bierre from "../../assets/bierre.jpg";
import vin from "../../assets/vin3.jpg";

export default function Tiles({ navigation }) {
  return (
    <View style={styles.tilesContainer}>
      <ImageBackground source={bierre} style={styles.images}>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate("Beers List")}
        >
          Beer
        </Text>
      </ImageBackground>

      <ImageBackground source={vin} style={[styles.images, styles.rightImage]}>
        <Text
          style={styles.text}
          // onPress={() => navigation.navigate("Wines List")}
        >
          Wine
        </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  tilesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  images: {
    width: 140,
    height: 140,
    justifyContent: "center",
  },
  rightImage: {
    alignItems: "flex-end",
  },
  text: {
    width: 100,
    height: 50,
    paddingTop: 8,
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
});
