import React, { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Rating } from "react-native-stock-star-rating";
import CustomButton from "../../components/CustomButton";
import Header from "../homePage/Header";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useUserContext } from "../../providers/UserProvider";

import foam from "../../../assets/hop.jpg";
import wine_grape from "../../../assets/wine_grape.png";

export default function DrinkList({ navigation, route }) {
  const user = useUserContext();
  const { params } = route.params;
  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const get = async () => {
        const q = query(
          collection(db, "drinks"),
          where("type", "==", params.type),
          where("userId", "==", user.id)
        );

        try {
          const querySnapshot = await getDocs(q);
          setDrinks(
            querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        } catch (e) {
          setDrinks([]);
        }
      };

      if (user) {
        get();
      }
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, user.id]);

  return (
    <View style={styles.container}>
      <Header
        backgroundImage={params.type === "biere" ? foam : wine_grape}
        title={`${params.type.charAt(0).toUpperCase() + params.type.slice(1)}s`}
        navigation={navigation}
      />
      <ScrollView>
        <View style={styles.listContainer}>
          {!user.id ? (
            <Text style={styles.text} variant='bodyLarge'>
              Tu dois être connecté pour voir la liste de tes boissons.
            </Text>
          ) : drinks === undefined || drinks.length === 0 ? (
            <Text style={styles.text} variant='bodyLarge'>
              Tu n'as pas encore enregistré de boisson. Enregistre en une pour
              la voir apparaitre ici.
            </Text>
          ) : (
            drinks.map((drink) => (
              <TouchableOpacity
                key={drink.nom + drink.createAt}
                activeOpacity={0.5}
                style={styles.drink}
                onPress={() =>
                  navigation.navigate("Modifier boisson", {
                    params: { type: params.type, id: drink.id },
                  })
                }>
                <Image source={{ uri: drink.image }} style={styles.image} />
                <Text style={{ marginTop: 5 }}>{drink.nom}</Text>
                <Rating stars={drink.note} maxStars={5} size={20} />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
      <CustomButton
        mode='contained'
        title={
          params.type === "biere"
            ? `Ajouter une ${params.type}`
            : `Ajouter un ${params.type}`
        }
        disabled={!user.id}
        onPressFunc={() =>
          navigation.navigate("Ajouter boisson", {
            params: { type: params.type },
          })
        }
      />
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
  drink: {
    marginHorizontal: 8,
    marginVertical: 15,
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    margin: 20,
  },
});
