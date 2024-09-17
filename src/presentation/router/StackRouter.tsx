import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { HomeScreen, LoadingScreen, LoginScreen, RegisterScreen } from '../screens'

export type RootStackParams = {
    HomeScreen: undefined
    LoadingScreen: undefined
    LoginScreen: undefined
    RegisterScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParams>()

export function StackRouter() {
    return (
        <Stack.Navigator
            initialRouteName='LoginScreen'
            screenOptions={{
                headerShown: false,
                animation: 'ios'
            }}>
            <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
        </Stack.Navigator>
    )
}