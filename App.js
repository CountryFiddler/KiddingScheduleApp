import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from './src/screens/HomeScreen';
import AddBreedingPairScreen from "./src/screens/AddBreedingPairScreen";
import EditBreedingPairScreen from "./src/screens/EditBreedingPairScreen";
import * as Font from "expo-font";
// import useFonts hook
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen'
import {useCallback, useEffect} from 'react';
import {Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import {TextInput} from "react-native-web";
import { configureFonts, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';



const Stack = createStackNavigator();

const customFonts = {
    WestonFree: require("./assets/fonts/WestonFree-Regular.ttf"),
};

const brandName = 'Bluegrass Acres Farm'

const fontConfig = {
    fontFamily: 'WestonFree',
}
const theme = {
    ...DefaultTheme,
    fonts: configureFonts({config: fontConfig}),
        colors: {
            ...DefaultTheme.colors,
            primary: 'tomato',
            accent: 'yellow',
        },
};


function StackNavigator() {
  return (
      <PaperProvider theme={theme}>
          <NavigationContainer>
              <Stack.Navigator
                  initialRouteName="Home"
              screenOptions={{
                  headerTitle: () => (
                      <View style={styles.headerStyle}>
                          <Image
                              source={require('./assets/Farm Logo.png')} // Replace with your image path
                              style={{ width: 50, height: 55, resizeMode: 'contain' }}
                          />
                          <Text style={styles.headerTitleStyle}>{brandName}</Text>
                      </View>
                  ),
                  headerStyle: {
                      backgroundColor: '#12284B',
                      height: 130,
                  },

                  headerTintColor: 'white', // Example tint color for back button and title
                  headerBackTitleStyle: {
                      fontFamily: 'WestonFree',
                      fontSize: 17,

                  }
              }}>
                  <Stack.Screen
                      name={"HomeScreen"}
                      component={HomeScreen}
                      options={{ headerBackTitleVisible: false }}
                  />
                  <Stack.Screen
                      name={"AddBreedingPairScreen"}
                      component={AddBreedingPairScreen}
                      options={{ headerBackTitleVisible: false }}
                  />
                  <Stack.Screen
                      name={"EditBreedingPairScreen"}
                      component={EditBreedingPairScreen}
                      options={{ headerBackTitleVisible: false }}
                  />
              </Stack.Navigator>
          </NavigationContainer>
      </PaperProvider>
  )
}

//SplashScreen.preventAutoHideAsync();

export default function App() {
    // the same as Font.loadAsync , the hook returns  true | error
 //   const [fontsLoaded] = useFonts(customFonts);
    const [fontsLoaded] = useFonts({
        "WestonFree": require('./assets/fonts/WestonFree-Regular.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    /*useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, [])*/

    if (!fontsLoaded) {
        return <View><Text> Fonts Loading...</Text></View>;;
    }
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
    font: {fontFamily: "WestonFree"},
    headerTitleStyle: {
        fontFamily: 'WestonFree',
        fontSize: 17,
        color:'black'
    },
    headerStyle: {
      flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 3,
    },
});
