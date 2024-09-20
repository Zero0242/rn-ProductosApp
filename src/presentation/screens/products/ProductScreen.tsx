import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, ButtonGroup, Input, Layout, useTheme } from '@ui-kitten/components'
import { Formik } from 'formik'
import React, { useRef } from 'react'
import { ScrollView } from 'react-native'
import { getProductById, updateCreateProduct } from '../../../actions/products'
import { Gender, Product, Size } from '../../../domain/entities'
import { ProductGallery } from '../../components/products'
import { AppIcon, FullLoad } from '../../components/ui'
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
    const queryClient = useQueryClient()
    const { data: product, isLoading } = useQuery({
        queryKey: ['products', productId.current],
        queryFn: () => getProductById(productId.current)
    })

    const mutation = useMutation({
        mutationFn: (data: Product) => updateCreateProduct({ ...data, id: productId.current }),
        onSuccess(data: Product) {
            productId.current = data.id
            queryClient.invalidateQueries({
                queryKey: ['products', 'infinite'],
            })
            // Forma 1: eliminar key para que PIDA DE NUEVO el request
            // queryClient.invalidateQueries({
            //     queryKey: ['products', productId.current],
            // })
            // Forma 2: sacamos la data que llega al actualizar, y la mete al caché
            queryClient.setQueryData(['products', data.id], data)
        },
    })

    if (!product) return <MainLayout title='Cargando'><FullLoad /></MainLayout>

    return (
        <Formik
            initialValues={product!}
            onSubmit={mutation.mutate}
        >
            {
                ({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
                    <MainLayout
                        title={values.title}
                        subtitle={`Precio: ${values.price}`}
                    >
                        <ScrollView style={{ flex: 1 }}>
                            <ProductGallery images={values.images} />
                            <Layout style={{ marginHorizontal: 10 }}>
                                <Input
                                    label={'Título'}
                                    value={values.title}
                                    onChangeText={handleChange('title')}
                                    style={{ marginVertical: 7 }}
                                />
                                <Input
                                    label={'Slug'}
                                    value={values.slug}
                                    onChangeText={handleChange('slug')}
                                    style={{ marginVertical: 7 }}
                                />
                                <Input
                                    label={'Descripción'}
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                    numberOfLines={5}
                                    style={{ marginVertical: 7 }}
                                />
                            </Layout>
                            {/* Precio e inventario */}
                            <Layout style={{ marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>
                                <Input
                                    label={'Precio'}
                                    keyboardType='numeric'
                                    value={values.price.toString()}
                                    onChangeText={handleChange('price')}
                                    style={{ flex: 1 }}
                                />
                                <Input
                                    label={'inventario'}
                                    keyboardType='numeric'
                                    value={values.stock.toString()}
                                    onChangeText={handleChange('stock')}
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
                                            onPress={() => {
                                                const isSelected = values.sizes.includes(size)
                                                const updatedSizes: Size[] =
                                                    isSelected ?
                                                        values.sizes.filter(s => s !== size) : [...values.sizes, size]
                                                setFieldValue('sizes', updatedSizes)
                                            }}
                                            style={{
                                                flex: 1,
                                                backgroundColor: values.sizes.includes(size) ? theme['color-primary-200'] : undefined
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
                                            onPress={() => setFieldValue('gender', gender)}
                                            style={{
                                                flex: 1,
                                                backgroundColor: values.gender.includes(gender) ? theme['color-primary-200'] : undefined
                                            }}
                                        >
                                            {gender}
                                        </Button>
                                    ))
                                }
                            </ButtonGroup>
                            {/* Guardar */}
                            <Button
                                disabled={mutation.isPending}
                                onPress={() => handleSubmit()}
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
        </Formik>

    )
}