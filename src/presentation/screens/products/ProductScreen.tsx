import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { Input, Layout } from '@ui-kitten/components'
import React from 'react'
import { FlatList, ScrollView } from 'react-native'
import { getProductById } from '../../../actions/products'
import { FullLoad } from '../../components/ui'
import { FadeInImage } from '../../components/ui/FadeInImage'
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
            <ScrollView style={{ flex: 1 }}>
                <Layout>
                    <FlatList
                        data={product.images}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item}
                        renderItem={({ item }) =>
                            <FadeInImage
                                uri={item}
                                style={{ height: 300, width: 300, marginHorizontal: 5 }}
                            />
                        }
                    />
                </Layout>
                <Layout style={{ marginHorizontal: 10 }}>
                    <Input
                        label={'Título'}
                        value={product.title}
                        style={{ marginVertical: 7 }}
                    />
                    <Input
                        label={'Slug'}
                        value={product.slug}
                        style={{ marginVertical: 7 }}
                    />
                    <Input
                        label={'Descripción'}
                        value={product.description}
                        numberOfLines={5}
                        style={{ marginVertical: 7 }}
                    />
                </Layout>
                <Layout style={{ marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>
                    <Input
                        label={'Precio'}
                        value={product.price.toString()}
                        style={{ flex: 1 }}
                    />
                    <Input
                        label={'inventario'}
                        value={product.stock.toString()}
                        style={{ flex: 1 }}
                    />
                </Layout>
                <Layout style={{ height: 150 }} />
            </ScrollView>
        </MainLayout>
    )
}