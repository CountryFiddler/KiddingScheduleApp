import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from './src/screens/HomeScreen';
import AddBreedingPairScreen from "./src/screens/AddBreedingPairScreen";
import EditBreedingPairScreen from "./src/screens/EditBreedingPairScreen";


const Stack = createStackNavigator();


function StackNavigator() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home">
          <Stack.Screen
              name={"HomeScreen"}
              component={HomeScreen}
              />
            <Stack.Screen
                name={"AddBreedingPairScreen"}
                component={AddBreedingPairScreen}
            />
            <Stack.Screen
                name={"EditBreedingPairScreen"}
                component={EditBreedingPairScreen}
            />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default function App() {
  return (
      <StackNavigator/>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
