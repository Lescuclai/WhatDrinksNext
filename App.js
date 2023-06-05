import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";

import HomePage from "./src/views/homePage";
import DrinkList from "./src/views/drink/DrinkList";
import DrinkCreate from "./src/views/drink/DrinkCreate";
import DrinkUpdate from "./src/views/drink/DrinkUpdate";
import Authentification from "./src/views/Authentification";
import SignUp from "./src/views/SignUp";
import UserProvider from "./src/providers/UserProvider";
import { Provider } from "react-native-paper";
import AuthMenu from "./src/components/AuthMenu";

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <UserProvider>
        <Provider>
          <NavigationContainer>
            <Navigator>
              <Screen
                name='Accueil'
                component={HomePage}
                options={({ navigation }) => ({
                  headerRight: () => <AuthMenu navigation={navigation} />,
                })}
              />
              <Screen
                name='Liste des boissons'
                component={DrinkList}
                options={({ navigation }) => ({
                  headerRight: () => <AuthMenu navigation={navigation} />,
                })}
              />
              <Screen name='Ajouter boisson' component={DrinkCreate} />
              <Screen name='Modifier boisson' component={DrinkUpdate} />
              <Screen name='Authentification' component={Authentification} />
              <Screen name='Création de compte' component={SignUp} />
            </Navigator>
          </NavigationContainer>
        </Provider>
      </UserProvider>
    </PaperProvider>
  );
}
