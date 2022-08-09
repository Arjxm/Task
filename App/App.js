import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

//Screens
import Signin from "./screens/Signin";
import SignUp from "./screens/SignUp";
//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from "./screens/Dashboard";
import SplashScreen from "./screens/Splase";
import {StatusBar} from "expo-status-bar";
import {SafeAreaProvider} from "react-native-safe-area-context";


const Stack = createNativeStackNavigator();


const App = () => {
    const [splashScreen, setSplashScreen] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setSplashScreen(true)
        }, 1000)
    }, [])

    return (

        <NavigationContainer style={styles.container}>

            <StatusBar style={"light"}/>
            {splashScreen ?
                <Stack.Navigator>
                    <Stack.Screen component={Signin}
                                  name="signin" options={{headerShown: false}}
                    />
                    <Stack.Screen component={Dashboard}
                                  name="dashboard" options={{headerShown: false}}
                    />

                    <Stack.Screen component={SignUp}
                                  name="signup" options={{headerShown: false}}
                    />

                </Stack.Navigator> : <SafeAreaProvider><SplashScreen/></SafeAreaProvider>
            }
        </NavigationContainer>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(21,21,21,1)"
    },
});

export default App;