import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-native-paper";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  doc,
  collection,
  getFirestore,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../firebase";
import { RatingInput } from "react-native-stock-star-rating";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import getDrinkData from "../../data/drink";

export default function DrinkUpdate({ route, navigation }) {
  const [image, setImage] = useState(null);
  const { params } = route.params;
  const data = getDrinkData(params);

  const { handleSubmit, control } = useForm({
    defaultValues: async () => {
      const firestore = getFirestore();
      const ref = doc(collection(firestore, "drinks"), params.id);
      return (await getDoc(ref)).data();
    },
  });

  const onEdit = async (data) => {
    try {
      const docRef = await doc(db, "drinks", params.id);
      await updateDoc(docRef, { ...data, id: params.id });
      navigation.navigate("Liste des boissons", {
        params: { type: params.type },
      });
    } catch (err) {
      console.log("error, can't modify data", err);
    }
  };

  const onDelete = async (data) => {
    try {
      const docRef = await doc(db, "drinks", params.id);
      await deleteDoc(docRef, { ...data, id: params.id });
      navigation.navigate("Liste des boissons", {
        params: { type: params.type },
      });
    } catch (err) {
      console.log("error, can't delete data", err);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            margin: 20,
          }}>
          <Button mode='elevated' onPress={pickImage}>
            Choisir une photo
          </Button>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>

        <Controller
          control={control}
          rules={require && { required: "Le champ est recquis" }}
          name='note'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={styles.container}>
              <Text>Note*</Text>
              <RatingInput
                rating={value}
                size={30}
                maxStars={5}
                bordered={false}
                setRating={onChange}
              />
              {error && (
                <Text
                  style={{
                    color: "purple",
                    fontWeight: 800,
                    marginLeft: 5,
                    marginBottom: 15,
                  }}>
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />

        {data.map(({ label, key, require, multiline, percent }) => {
          return (
            <View key={key}>
              <CustomInput
                control={control}
                name={key}
                label={require ? `${label}*` : label}
                rules={require && { required: "Le champ est recquis" }}
                style={styles.input}
                multiline={multiline}
                percent={percent}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.buttons}>
        <CustomButton
          mode='contained'
          title='Modifier'
          onPressFunc={handleSubmit(onEdit)}
        />
        <CustomButton
          mode='outlined'
          title='Suprimer'
          onPressFunc={handleSubmit(onDelete)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 12,
  },
  container: {
    alignItems: "center",
  },
  input: {
    margin: 5,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginBottom: 20,
  },
});
