import React, { useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { IconButton } from "react-native-paper";
import AuthModal from "../../components/AuthModal";

import Icon from "react-native-vector-icons/FontAwesome";

export default function Header(props) {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <View style={styles.titleContainer}>
      <ImageBackground
        source={props.backgroundImage}
        style={styles.titleBackgroud}>
        <Text style={styles.titleText}>{props.title}</Text>
        <AuthModal hideModal={hideModal} visible={visible}>
          <IconButton
            icon='account'
            mode='contained'
            style={{ position: "absolute", right: 5 }}
            onPress={showModal}
          />
        </AuthModal>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "stretch",
  },
  titleBackgroud: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
});
