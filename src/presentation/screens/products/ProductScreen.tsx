import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { Button, ButtonGroup, Input, Layout, useTheme } from '@ui-kitten/components'
import React, { useRef } from 'react'
import { Alert, FlatList, ScrollView } from 'react-native'
import { getProductById } from '../../../actions/products'
import { Gender, Size } from '../../../domain/entities'
import { AppIcon, FullLoad } from '../../components/ui'
import { FadeInImage } from '../../components/ui/FadeInImage'
import { MainLayout } from '../../layouts'
import { RootStackParams } from '../../router'


const sizes: Size[] = [
    Size.Xxl,
    Size.Xl,
    Size.L,
    Size.M,
    Size.S,
    Size.Xs,
]

const genders: Gender[] = [
    Gender.Kid,
    Gender.Unisex,
    Gender.Men,
    Gender.Women,
]

interface Props extends NativeStackScreenProps<RootStackParams, 'ProductScreen'> { }

export function ProductScreen({ route }: Props) {
    const theme = useTheme()
    const productId = useRef(route.params.productId)
    const { data: product, isLoading } = useQuery({
        queryKey: ['products', productId],
        queryFn: () => getProductById(productId.current)
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
                {/* Precio e inventario */}
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
                {/* Selectores */}
                <ButtonGroup
                    style={{ marginHorizontal: 15, marginTop: 20 }}
                    appearance='outline'
                    size='small'
                >
                    {
                        sizes.map(size => (
                            <Button
                                key={size}
                                onPress={() => console.log({ size })}
                                style={{
                                    flex: 1,
                                    backgroundColor: true ? theme['color-primary-200'] : undefined
                                }}
                            >
                                {size}
                            </Button>
                        ))
                    }
                </ButtonGroup>
                <ButtonGroup
                    style={{ marginHorizontal: 15, marginTop: 20 }}
                    appearance='outline'
                    size='small'
                >
                    {
                        genders.map(gender => (
                            <Button
                                key={gender}
                                onPress={() => console.log({ gender })}
                                style={{
                                    flex: 1,
                                    backgroundColor: true ? theme['color-primary-200'] : undefined
                                }}
                            >
                                {gender}
                            </Button>
                        ))
                    }
                </ButtonGroup>
                {/* Guardar */}
                <Button
                    onPress={() => Alert.alert('Guardando')}
                    accessoryLeft={<AppIcon name='save-outline' white />}
                    style={{ marginHorizontal: 15, marginTop: 20 }}
                >
                    Guardar
                </Button>

                <Layout style={{ height: 150 }} />
            </ScrollView>
        </MainLayout>
    )
}