import React, { useState } from "react";

import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { Text, View } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Authentification({ navigation }) {
  const [isVisible, setIsVisible] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const submitSignIn = async (data) => {
    try {
      clearErrors();
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigation.goBack();
    } catch (error) {
      setError("root", {
        type: "custom",
        message: "Oups ! Les identifiants sont incorrects.",
      });
    }
  };

  return (
    <View>
      <CustomInput
        control={control}
        name='password'
        visibleToggle={() => setIsVisible(!isVisible)}
        isVisible={isVisible}
        label='Password'
        secureTextEntry={!isVisible}
        rules={{ required: "Le champ est recquis" }}
        mdp
      />
      <CustomInput
        control={control}
        name='email'
        label='Email'
        rules={{
          required: "Le champ est recquis",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Format invalide",
          },
        }}
      />

      {Boolean(errors.root) && (
        <Text style={{ paddingTop: 15 }} color='error'>
          {errors.root?.message}
        </Text>
      )}
      <CustomButton
        mode='contained'
        title='Connexion'
        onPressFunc={handleSubmit(submitSignIn)}
      />
    </View>
  );
}

export default Authentification;
