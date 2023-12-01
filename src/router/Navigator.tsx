import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, ProtectedScreen, RegisterScreen } from '../screens';
import { AuthContext } from '../context/authContext';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
    const { status } = useContext(AuthContext)
    return (
        <Stack.Navigator screenOptions={{
            header: () => null,
            contentStyle: { backgroundColor: 'white' }
        }}>
            {
                (status !== 'logged-in')
                    ?
                    (
                        <>
                            <Stack.Screen name='LoginScreen' component={LoginScreen} />
                            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
                        </>
                    )
                    : <Stack.Screen name='ProtectedScreen' component={ProtectedScreen} />
            }
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})