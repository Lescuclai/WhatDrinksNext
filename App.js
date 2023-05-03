import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";

import HomePage from "./views/homePage";
import DrinkList from "./views/drink/DrinkList";
import Drink from "./views/drink/Drink";
import DrinkCreate from "./views/drink/DrinkCreate";

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Navigator>
          <Screen name='Home' component={HomePage} />
          <Screen name='Liste des boissons' component={DrinkList} />
          <Screen name='Boisson' component={Drink} />
          <Screen name='Ajouter boisson' component={DrinkCreate} />
        </Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
