import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { RatingInput } from "react-native-stock-star-rating";
import upload from "../../firebase/upload";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useUserContext } from "../../providers/UserProvider";

export default function DrinkCreate({ route, navigation }) {
  const [image, setImage] = useState(null);
  const { params } = route.params;
  const user = useUserContext();

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
      note: null,
    },
  });
  const onSave = async (data) => {
    const userId = user.id;
    let url = null;
    try {
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        url = await upload(blob);
      }
      await addDoc(collection(db, "drinks"), {
        ...data,
        type: params.type,
        userId,
        image: url,
        createAt: Date.now(),
      });
      navigation.navigate("Liste des boissons", {
        params: { type: "biere" },
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
      require: true,
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
      require: params.type === "vin",
    },
    {
      label: "Arômes",
      key: "aromes",
    },
    {
      label: "Degrès d'alcool",
      key: "alcool",
      percent: true,
    },
    {
      label: "Commentaire",
      key: "commentaire",
      multiline: true,
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
      <CustomButton
        mode='contained'
        title='Envoyer'
        onPressFunc={handleSubmit(onSave)}
      />
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
