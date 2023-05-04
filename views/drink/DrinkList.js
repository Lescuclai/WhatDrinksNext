import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Rating } from "react-native-stock-star-rating";

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

export default function DrinkList({ navigation, route }) {
  const { params } = route.params;
  const [drinks, setDrinks] = useState();
  useEffect(() => {
    const get = async () => {
      const q = query(
        collection(db, "drinks"),
        where("type", "==", params.type)
      );
      try {
        const querySnapshot = await getDocs(q);
        setDrinks(querySnapshot.docs.map((doc) => doc.data()));
      } catch (e) {
        setDrinks([]);
      }
    };
    get();
  }, []);
  return (
    <View style={styles.container}>
      <Header
        backgroundImage={foam}
        title={`${params.type.charAt(0).toUpperCase() + params.type.slice(1)}s`}
      />
      <ScrollView>
        <View style={styles.listContainer}>
          {drinks &&
            drinks.map((drink) => (
              <TouchableOpacity
                key={drink.nom + drink.createAt}
                activeOpacity={0.5}
                style={{
                  marginHorizontal: 8,
                  marginVertical: 15,
                }}
                onPress={() =>
                  navigation.navigate("Boisson", {
                    params: { type: params.type },
                  })
                }>
                <Image
                  source={{ uri: drink.image }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>{drink.nom}</Text>
                <Rating stars={drink.note} maxStars={5} size={20} />
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
      <View style={{ marginTop: 5, marginBottom: 5 }}>
        <Button
          onPress={() =>
            navigation.navigate("Ajouter boisson", {
              params: { type: "biere" },
            })
          }
          style={styles.button}>
          Ajouter une bière
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
