import React from "react";
import { View, StyleSheet } from "react-native";

import Header from "../homePage/Header";
import foam from "../../assets/hop.jpg";
import wine_grape from "../../assets/wine_grape.png";

export default function Drink({ navigation, route }) {
  const { params } = route.params;

  return (
    <View style={styles.container}>
      <Header
        backgroundImage={params.type === "biere" ? foam : wine_grape}
        // backgroundImage={foam}
        title={params.type.charAt(0).toUpperCase() + params.type.slice(1)}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: "column",
  },
});
