import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Layout, Spinner, Text } from '@ui-kitten/components'
import React from 'react'
import { RootStackParams } from '../../router'

interface Props extends NativeStackScreenProps<RootStackParams, 'LoadingScreen'> { }

export function LoadingScreen({ }: Props) {
    return (
        <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text category='h3'>Cargando</Text>
            <Layout style={{ height: 10 }} />
            <Spinner size={'giant'} />
        </Layout>
    )
}