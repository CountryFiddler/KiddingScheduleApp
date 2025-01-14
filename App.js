import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import EmailCollectionScreen from './src/screens/EmailCollectionScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddBreedingPairScreen from "./src/screens/AddBreedingPairScreen";
import EditBreedingPairScreen from "./src/screens/EditBreedingPairScreen";

import * as Font from "expo-font";
// import useFonts hook
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen'
import {useCallback, useEffect, useState} from 'react';
import {Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import {TextInput} from "react-native-web";
import { configureFonts, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Parse only once
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('IQKXcMx3dHAEhNwzvjVCQdJQF4Pi9pIJZ1cWCLtD', 'hyrqRPfqz1eXwgoU6DyoZ6jwtAaF7TgeuuCGQaya');
Parse.serverURL = 'https://parseapi.back4app.com/';



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


function StackNavigator(routeName) {
    console.log(routeName.routeName);
  return (
      <PaperProvider theme={theme}>
          <NavigationContainer>
              <Stack.Navigator
                  initialRouteName={'EmailCollectionScreen'}
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
                      //backgroundColor: '#12284B',
                      backgroundColor: '#FFFFFF',
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
                      options={{ headerBackTitleVisible: false, headerLeft: null }}
                  />
                  <Stack.Screen
                      name={"EmailCollectionScreen"}
                      component={EmailCollectionScreen}
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

    // Variable to verify if the user's email address has been collected.
    const [emailCollected, setEmailCollected] = useState(true);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);


    // Use this to setup the email screen routing
   const [initialRoute, setInitialRoute] = useState('Home');

    useEffect(() => {
        // Simulate fetching data (e.g., from AsyncStorage or an API)
        const fetchInitialRoute = async () => {
            try {
                // Fetch data from AsyncStorage
                const emailCollected = await AsyncStorage.getItem('emailCollected');
                if (emailCollected === null) {
                    setInitialRoute('EmailCollectionScreen');
                   // console.log(initialRoute);
                } else {
                    setInitialRoute('Home');
                }
            } catch (error) {
                // Handle errors
                console.error('Error fetching data:', error);
            }
        };

        fetchInitialRoute();
    }, []);

    /*useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, [])*/

    if (!fontsLoaded) {
        return <View><Text> Fonts Loading...</Text></View>;
    }

    if (!emailCollected) {
        return <EmailCollectionScreen/>
    }
        return (
                <StackNavigator routeName={initialRoute}/>
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
        color:'#12284B',
    },
    headerStyle: {
      flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#fff',
        //borderWidth: 3,
    },
});
