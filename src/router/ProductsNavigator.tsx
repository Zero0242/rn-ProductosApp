import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProductScreen } from '../screens/ProductScreen';
import { ProductsScreen } from '../screens';

export type ProductsStackParams = {
    ProductsScreen: undefined,
    ProductScreen: { id?: string }
}

const Stack = createNativeStackNavigator<ProductsStackParams>()

export const ProductsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='ProductScreen' component={ProductScreen} />
            <Stack.Screen name='ProductsScreen' component={ProductsScreen} />
        </Stack.Navigator>
    )
}
