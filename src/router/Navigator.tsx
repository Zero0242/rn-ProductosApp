import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, ProtectedScreen, RegisterScreen } from '../screens';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            header: () => null,
            contentStyle: { backgroundColor: 'white' }
        }}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
            <Stack.Screen name='ProtectedScreen' component={ProtectedScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})