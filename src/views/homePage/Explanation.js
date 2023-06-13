import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Explanation() {
  return (
    <View style={styles.explainationsContainer}>
      <Text style={styles.subTitle} variant='titleLarge'>
        Tu aimes l'eau les fruits et les céréales, tu es au bon endroit !
      </Text>
      <Text style={styles.paragraph} variant='bodyLarge'>
        Le principe est simple, tu ne veux plus oublier le nom de cette super
        bouteille partagée en amoureux, ou la bonne brune de ta dernière soirée
        entre pots, ou encore, ne plus t'infliger "cette boisson" qui était
        sensé être un grand cru... Et bien c'est ici que tu pourras noter toutes
        tes découvertes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  explainationsContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    marginHorizontal: 70,
    textAlign: "center",
    color: "#542201",
    fontWeight: "bold",
    justifyContent: "center",
    paddingBottom: 25,
  },
  paragraph: {
    color: "#2e1200",
    textAlign: "justify",
    marginHorizontal: 22,
  },
});
