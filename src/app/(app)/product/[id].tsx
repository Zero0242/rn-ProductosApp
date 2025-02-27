import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function ProductPage() {
    const { id } = useLocalSearchParams()

    return (
        <View>
            <Text>ProductPage</Text>
            <Text>{id}</Text>
        </View>
    )
}