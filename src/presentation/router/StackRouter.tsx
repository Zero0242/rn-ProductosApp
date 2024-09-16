import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { HomeScreen, LoadingScreen } from '../screens'

export type RootStackParams = {
    HomeScreen: undefined
    LoadingScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParams>()

export function StackRouter() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
        </Stack.Navigator>
    )
}