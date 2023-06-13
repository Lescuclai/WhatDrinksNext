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
  percent = false,
  mdp = false,
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
              (percent && <TextInput.Affix text='%' />) ||
              (mdp && (
                <TextInput.Icon
                  icon='eye'
                  onPress={() => visibleToggle() || false}
                />
              ))
            }
            value={value}
            style={style}
            multiline={multiline}
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
        </>
      )}
    />
  );
}
