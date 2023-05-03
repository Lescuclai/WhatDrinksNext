import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

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
                {/* <Image
                  source={drink.img}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                /> */}
                <Text style={{ textAlign: "center" }}>{drink.nom}</Text>
                <Text style={{ textAlign: "center" }}>{drink.note}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
      <View style={{ marginTop: 5, marginBottom: 5 }}>
        <Button
          onPress={() => navigation.navigate("Ajouter boisson")}
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
