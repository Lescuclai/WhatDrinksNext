import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function DrinkCreate({ navigation }) {
  const [image, setImage] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nom: "",
      producteur: "",
      origine: "",
      categorie: "",
      annee: "",
      aromes: "",
      alcool: "",
      note: "",
      commentaire: "",
    },
  });

  const onSave = async (data) => {
    try {
      await addDoc(collection(db, "drinks"), {
        type: "biere",
        createAt: Date.now(),
        ...data,
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
      label: "Note",
      key: "note",
    },
    {
      label: "Commentaire",
      key: "commentaire",
    },
  ];

  return (
    <ScrollView>
      <View style={styles.presBeerContainer}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            margin: 5,
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
                // rules={{
                //   required: true,
                // }}
                name={key}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={label}
                    contained
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    multiline={key === "commentaire"}
                    error={Boolean(errors.root)}
                  />
                )}
              />
              {errors.key && <Text>This is required.</Text>}
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
  presBeerContainer: {
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
    marginBottom: 10,
  },
});
