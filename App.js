import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";

import HomePage from "./views/homePage";
import DrinkList from "./views/drink/DrinkList";
import Drink from "./views/drink/Drink";
import DrinkCreate from "./views/drink/DrinkCreate";
import Authentification from "./views/Authentification";
import SignUp from "./views/SignUp";
import UserProvider from "./providers/UserProvider";
import { Provider } from "react-native-paper";

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <UserProvider>
        <Provider>
          <NavigationContainer>
            <Navigator>
              <Screen name='Accueil' component={HomePage} />
              <Screen name='Liste des boissons' component={DrinkList} />
              <Screen name='Boisson' component={Drink} />
              <Screen name='Ajouter boisson' component={DrinkCreate} />
              <Screen name='Authentification' component={Authentification} />
              <Screen name='Création de compte' component={SignUp} />
            </Navigator>
          </NavigationContainer>
        </Provider>
      </UserProvider>
    </PaperProvider>
  );
}
