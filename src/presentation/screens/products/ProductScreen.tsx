import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Input, Layout, useTheme } from '@ui-kitten/components'
import { Formik } from 'formik'
import React, { useRef } from 'react'
import { ScrollView } from 'react-native'
import { getProductById, updateCreateProduct } from '../../../actions/products'
import { AppConstants } from '../../../config/constants/app-constants'
import { Product, Size } from '../../../domain/entities'
import { ProductGallery } from '../../components/products'
import { AppIcon, FullLoad, MyButtonGroup } from '../../components/ui'
import { MainLayout } from '../../layouts'
import { RootStackParams } from '../../router'

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
                ({ handleChange, handleSubmit, values, setFieldValue }) => (
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
                            <MyButtonGroup
                                style={{ marginHorizontal: 15, marginTop: 20 }}
                                data={AppConstants.sizes}
                                keyExtractor={size => size}
                                labelBuilder={size => size}
                                selectedPredicate={size => values.sizes.includes(size)}
                                onButtonPress={(size, isSelected) => {
                                    const updatedSizes: Size[] =
                                        isSelected ?
                                            values.sizes.filter(s => s !== size) : [...values.sizes, size]
                                    setFieldValue('sizes', updatedSizes)
                                }}
                            />
                            <MyButtonGroup
                                style={{ marginHorizontal: 15, marginTop: 20 }}
                                data={AppConstants.genders}
                                keyExtractor={gender => gender}
                                labelBuilder={gender => gender}
                                selectedPredicate={gender => values.gender.includes(gender)}
                                onButtonPress={(gender) => setFieldValue('gender', gender)}
                            />
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