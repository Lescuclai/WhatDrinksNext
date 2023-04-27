import React, { useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function Header(props) {
  return (
    <View style={styles.titleContainer}>
      <ImageBackground
        source={props.backgroundImage}
        style={styles.titleBackgroud}
      >
        <Text style={styles.titleText}>{props.title}</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "stretch",
  },
  titleBackgroud: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
});
