import React, { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Rating } from "react-native-stock-star-rating";
import CustomButton from "../../components/CustomButton";

import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useUserContext } from "../../providers/UserProvider";

import Header from "../homePage/Header";

import foam from "../../assets/hop.jpg";

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
          setDrinks(querySnapshot.docs.map((doc) => doc.data()));
        } catch (e) {
          setDrinks([]);
        }
      };
      if (user.id) {
        get();
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, user.id]);

  return (
    <View style={styles.container}>
      <Header
        backgroundImage={foam}
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
            ))
          )}
        </View>
      </ScrollView>
      <CustomButton
        mode='contained'
        title='Ajouter une bière'
        disabled={!user.id}
        onPressFunc={() =>
          navigation.navigate("Ajouter boisson", {
            params: { type: "biere" },
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
  text: {
    margin: 20,
  },
});
