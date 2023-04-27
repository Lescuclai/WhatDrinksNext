import React from "react";

import { View,  StyleSheet, Text, Controller,TextInput } from "react-native";

const Card = ({
  options,
  control,
}) => {
  return <Controller
  control={control}
  name="test"
  render={() => (
    // options.map(( i ) => {
    //   return <View 
    //     key={i}
    //     style={styles.card}
    //   >
     <TextInput>"toto"</TextInput>
    // </View>

    // })
    
  )}
/>
};


const styles = StyleSheet.create({
    card: {
      flex: 1,
      padding: "8px 4px",
      width: 200,
      height: 170,
      alignItems:"items-center",
      position:"relative",
      borderRadius:8
    }
  });

 
export default Card;