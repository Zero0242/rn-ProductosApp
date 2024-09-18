import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { Text } from '@ui-kitten/components'
import React from 'react'
import { getProductById } from '../../../actions/products'
import { FullLoad } from '../../components/ui'
import { MainLayout } from '../../layouts'
import { RootStackParams } from '../../router'

interface Props extends NativeStackScreenProps<RootStackParams, 'ProductScreen'> { }

export function ProductScreen({ route }: Props) {
    const productId = route.params.productId
    const { data: product, isLoading } = useQuery({
        queryKey: ['products', productId],
        queryFn: () => getProductById(productId)
    })

    if (!product) return <MainLayout title='Cargando'><FullLoad /></MainLayout>


    return (
        <MainLayout
            title={product.title}
            subtitle={`Precio: ${product.price}`}
        >
            <Text>
                Detalle de {product?.title ?? ''}
            </Text>
            <Text>
                Detalle de {productId}
            </Text>
        </MainLayout>
    )
}