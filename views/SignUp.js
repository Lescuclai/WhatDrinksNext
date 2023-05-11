import React, { useState } from "react";

import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { Text, View } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUp({ navigation }) {
  const [isVisible, setIsVisible] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const submitSignUp = async (data) => {
    try {
      clearErrors();
      const auth = getAuth();
      await createUserWithEmailAndPassword(
        auth,
        data.createEmail,
        data.createPassword
      );
      navigation.goBack();
    } catch (error) {
      setError("root", {
        type: "custom",
        message: "Oups ! compte non créés, un problème est survenu.",
      });
    }
  };

  return (
    <View>
      <CustomInput
        control={control}
        name='createPassword'
        visibleToggle={() => setIsVisible(!isVisible)}
        label='Password'
        secureTextEntry={!isVisible}
        rules={{ required: "Le champ est recquis" }}
      />
      <CustomInput
        control={control}
        name='createEmail'
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
        title='Enregistrer'
        onPressFunc={handleSubmit(submitSignUp)}
      />
    </View>
  );
}

export default SignUp;
