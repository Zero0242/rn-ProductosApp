import { useAuthStore } from '@/src/presentation/auth'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

export default function Index() {
    const { logout } = useAuthStore()
    return (
        <View>
            <Text>Index</Text>
            <Pressable onPress={logout}>
                <Text>Salir</Text>
            </Pressable>
        </View>
    )
}