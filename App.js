import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";

import HomePage from "./views/homePage";
import BeerList from "./views/beerPage/BeerList";
import BeerPage from "./views/beerPage/Beer";
import AddBeerPage from "./views/beerPage/AddBeer";

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Navigator>
          <Screen name='Home' component={HomePage} />
          <Screen name='Beers List' component={BeerList} />
          {/* <Screen name="Wines List" component={WineList} /> */}
          <Screen name='Beer' component={BeerPage} />
          <Screen name='Add Beer' component={AddBeerPage} />
        </Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
