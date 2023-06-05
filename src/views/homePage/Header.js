import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function Header({ backgroundImage, title }) {
  return (
    <View style={{ position: "relative", zIndex: 99 }}>
      <ImageBackground source={backgroundImage} style={styles.titleBackgroud}>
        <View style={styles.container}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
  titleBackgroud: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
});
