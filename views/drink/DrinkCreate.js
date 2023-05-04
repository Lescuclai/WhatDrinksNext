import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { RatingInput } from "react-native-stock-star-rating";
import upload from "../../firebase/upload";

export default function DrinkCreate({ route }) {
  const [image, setImage] = useState(null);
  const [rating, setRating] = React.useState(0);
  const { params } = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nom: "",
      producteur: "",
      origine: "",
      categorie: "",
      annee: "",
      aromes: "",
      alcool: "",
      commentaire: "",
      note: 0,
    },
  });
  const onSave = async (data) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const url = await upload(blob);
      await addDoc(collection(db, "drinks"), {
        ...data,
        type: params.type,
        image: url,
        note: rating,
        createAt: Date.now(),
      });
    } catch (error) {
      console.log("error onSave", error);
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

  const data = [
    {
      label: "Note",
      key: "note",
    },
    {
      label: "Nom",
      key: "nom",
    },
    {
      label: "Producteur",
      key: "producteur",
    },
    {
      label: "Pays d'origine",
      key: "origine",
    },
    {
      label: "Catégorie",
      key: "categorie",
    },
    {
      label: "Année",
      key: "annee",
    },
    {
      label: "Arômes",
      key: "aromes",
    },
    {
      label: "Degrès d'alcool",
      key: "alcool",
    },
    {
      label: "Commentaire",
      key: "commentaire",
    },
  ];
  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            margin: 20,
            marginBottom: 20,
          }}>
          <Button mode='elevated' onPress={pickImage}>
            Choisir une photo
          </Button>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>

        {data.map(({ label, key }) => {
          return (
            <View key={key}>
              <Controller
                control={control}
                rules={{
                  required: key === "nom" && true,
                }}
                name={key}
                render={({ field: { onChange, onBlur, value } }) =>
                  key === "note" ? (
                    <View style={styles.container}>
                      <Text>Note</Text>
                      <RatingInput
                        rating={rating}
                        setRating={setRating}
                        size={30}
                        maxStars={5}
                        bordered={false}
                      />
                    </View>
                  ) : (
                    <TextInput
                      label={label === "Nom" ? `${label}*` : label}
                      contained
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      multiline={key === "commentaire"}
                      error={Boolean(errors.root)}
                    />
                  )
                }
              />
              {errors.key && (
                <Text style={{ fontSize: 50, margin: "15px" }}>
                  This is required.
                </Text>
              )}
            </View>
          );
        })}
      </View>
      <Button onPress={handleSubmit(onSave)} style={styles.button}>
        Envoyer
      </Button>
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
  button: {
    marginBottom: 20,
  },
});
