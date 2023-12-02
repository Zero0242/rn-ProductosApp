import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoadingScreen, LoginScreen, ProtectedScreen, RegisterScreen } from '../screens';
import { AuthContext } from '../context/authContext';
import { ProductsNavigator } from './ProductsNavigator';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
    const { status } = useContext(AuthContext)

    if (status === 'checking') return <LoadingScreen />
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
                    : (
                        <>
                            {/* <Stack.Screen name='ProtectedScreen' component={ProtectedScreen} /> */}
                            <Stack.Screen name='ProductsNavigator' component={ProductsNavigator} />
                        </>
                    )
            }
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})