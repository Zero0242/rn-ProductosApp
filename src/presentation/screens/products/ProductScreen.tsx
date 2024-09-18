import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text } from '@ui-kitten/components'
import React from 'react'
import { MainLayout } from '../../layouts'
import { RootStackParams } from '../../router'

interface Props extends NativeStackScreenProps<RootStackParams, 'ProductScreen'> { }

export function ProductScreen({ route }: Props) {
    return (
        <MainLayout
            title='Product'
            subtitle='Detalle de producto'
        >
            <Text>
                Detalle de {route.params.productId}
            </Text>
        </MainLayout>
    )
}