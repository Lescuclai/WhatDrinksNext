import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

import { View } from "react-native";
import { Divider, Menu, IconButton } from "react-native-paper";

export default function AuthMenu({ navigation }) {
  const [isVisible, setIsVisible] = useState(false);

  const onSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={{ justifyContent: "center" }}>
      <Menu
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        anchorPosition='bottom'
        anchor={
          <IconButton
            icon='account'
            mode='contained'
            onPress={() => setIsVisible(true)}
          />
        }>
        <Menu.Item
          onPress={() => {
            navigation.navigate("Authentification");
            setIsVisible(false);
          }}
          title='Connnexion'
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate("Création de compte");
            setIsVisible(false);
          }}
          title='Création de compte'
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            onSignOut();
            setIsVisible(false);
          }}
          title='Déconnexion'
        />
      </Menu>
    </View>
  );
}
