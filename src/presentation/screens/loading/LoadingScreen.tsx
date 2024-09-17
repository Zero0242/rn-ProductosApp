import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { RootStackParams } from '../../router'

interface Props extends NativeStackScreenProps<RootStackParams, 'LoadingScreen'> { }

export function LoadingScreen({ }: Props) {
    return (
        <Layout style={{ flex: 1 }}>
            <Text>LoadingScreen</Text>

            <Button
                style={{ marginHorizontal: 12 }}
                accessoryLeft={<Icon name='facebook' />}
            >
                Cerrar Sesión
            </Button>
        </Layout>
    )
}