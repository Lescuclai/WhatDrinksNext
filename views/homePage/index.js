import React from 'react';
import {StyleSheet, View, StatusBar, SafeAreaView} from 'react-native';

import Tiles from './Tiles';
import Header from './Header';
import Explanation from './Explanation';

import wood from '../../assets/wood.jpg';

export default function HomePage({navigation}) {
  return (
    <View style={styles.container}>
      <Header backgroundImage={wood} title="What Drinks Next" />
      <Explanation />
      <Tiles navigation={navigation}/>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
