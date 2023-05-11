import React from "react";
import { Controller } from "react-hook-form";
import { Text } from "react-native";
import { TextInput } from "react-native-paper";

export default function CustomInput({
  name,
  control,
  label,
  secureTextEntry = false,
  visibleToggle = null,
  rules = {},
  style = {},
  multiline = false,
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <TextInput
            label={label}
            secureTextEntry={secureTextEntry}
            onChangeText={onChange}
            right={
              name === "password" && (
                <TextInput.Icon icon='eye' onPress={() => visibleToggle()} />
              )
            }
            value={value}
            style={style}
            multiline={multiline}
          />
          {error && (
            <Text
              style={{
                color: { error } ? "purple" : "black",
                fontWeight: { error } ? 800 : 600,
                marginLeft: 5,
                marginBottom: 15,
              }}>
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  );
}
