import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProductScreen } from '../screens/ProductScreen';
import { ProductsScreen } from '../screens';

export type ProductsStackParams = {
    ProductsScreen: undefined,
    ProductScreen: { id?: string, name?: string }
}

const Stack = createNativeStackNavigator<ProductsStackParams>()

export const ProductsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ title: 'Productos', headerTitleAlign: 'center' }}
                name='ProductsScreen' component={ProductsScreen}
            />
            <Stack.Screen
                options={{ title: 'Crear nuevo producto', headerTitleAlign: 'center' }}
                name='ProductScreen' component={ProductScreen} />
        </Stack.Navigator>
    )
}
