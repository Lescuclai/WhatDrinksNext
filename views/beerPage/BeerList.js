import React from "react";
import { Button } from "react-native-paper";

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Header from "../homePage/Header";

import foam from "../../assets/hop.jpg";

export default function BeerList({ navigation }) {
  const beers = [
    { name: "tutu", stars: 5, img: foam },
    { name: "titi", stars: 4, img: foam },
    { name: "tata", stars: 5, img: foam },
    { name: "tete", stars: 3, img: foam },
    { name: "yoyo", stars: 1, img: foam },
    { name: "yaya", stars: 2, img: foam },
    { name: "yuyu", stars: 5, img: foam },
    { name: "lili", stars: 4, img: foam },
    { name: "lala", stars: 5, img: foam },
    { name: "lulu", stars: 3, img: foam },
    { name: "fifi", stars: 1, img: foam },
    { name: "fafa", stars: 2, img: foam },
  ];
  return (
    <View style={styles.beerContainer}>
      <Header backgroundImage={foam} title='Your Beers' />
      <ScrollView>
        <View style={styles.listContainer}>
          {beers.map((beer) => {
            return (
              <TouchableOpacity
                key={beer.name}
                activeOpacity={0.5}
                style={{
                  marginHorizontal: 8,
                  marginVertical: 15,
                }}
                onPress={() => navigation.navigate("Beer")}>
                <Image
                  source={beer.img}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>{beer.name}</Text>
                <Text style={{ textAlign: "center" }}>{beer.stars}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={{ marginTop: 5, marginBottom: 5 }}>
        <Button
          onPress={() => navigation.navigate("Add Beer")}
          style={styles.button}>
          Ajouter une bière
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  beerContainer: {
    flex: 5,
    flexDirection: "column",
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
