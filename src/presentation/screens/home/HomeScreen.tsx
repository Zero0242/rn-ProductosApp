import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { RootStackParams } from '../../router'
import { useAuthStore } from '../../store'

interface Props extends NativeStackScreenProps<RootStackParams, 'HomeScreen'> { }

export function HomeScreen({ navigation, route }: Props) {
    const logout = useAuthStore(state => state.logout)
    const user = useAuthStore(state => state.user)

    return (
        <Layout>
            <Text>HomeScreen {user?.fullName ?? ''}</Text>

            <Button onPress={logout}>
                Salir
            </Button>
        </Layout>
    )
}


