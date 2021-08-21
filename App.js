import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/screens/home"
import BusinessPage from "./src/screens/BusinessPage"

const headerConfig = { 
  headerStyle:{
    backgroundColor: "#7095FF",
  },
  headerTintColor: "whitesmoke",
  headerTitleStyle: "bold",
 }

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={headerConfig} />
        <Stack.Screen name="BusinessPage" component={BusinessPage} options={{ ...headerConfig, title: "placeholder" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


