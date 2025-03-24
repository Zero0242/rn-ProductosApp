import { Gender, Sizes } from '@/src/core/products'
import { PickerPlugin } from '@/src/helpers/plugins'
import { useProductCreate } from '@/src/presentation/products'
import { Field, FormButton, MultiSelectButton } from '@/src/presentation/shared'
import { MaterialIcons as Icons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { FlatList, Image, Pressable, ScrollView, Text } from 'react-native'

const sizes: Sizes[] = Object.values(Sizes)
const genders: Gender[] = Object.values(Gender)



export default function New() {
    const { values, errors, handleChange, handleSubmit, setFieldValue } = useProductCreate()

    return (
        <ScrollView className='flex-1 px-2'>
            {
                values.images.length !== 0 &&
                <FlatList
                    data={values.images}
                    keyExtractor={(image, index) => image + index.toString()}
                    renderItem={({ item }) => <Image
                        key={item}
                        source={{ uri: item }}
                        className='h-[300px] w-screen shadow-sm p-2 rounded-lg'
                    />}
                    /* Modo Carrucel + Snapping */
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    snapToAlignment="center"
                    decelerationRate="fast"
                />
            }
            <Field
                placeholder="Nombre del producto"
                value={values.title}
                errorText={errors.title}
                onChangeText={handleChange('title')}
            />
            <Field
                placeholder="Slug"
                value={values.slug}
                errorText={errors.slug}
                onChangeText={handleChange('slug')}
            />
            <Field
                placeholder="Descripción del producto"
                numberOfLines={5}
                value={values.description}
                errorText={errors.description}
                onChangeText={handleChange('description')}
            />
            <Field
                placeholder="Precio"
                keyboardType="numeric"
                value={values.price}
                errorText={errors.price}
                onChangeText={handleChange('price')}
            />
            <Field
                placeholder="Stock"
                keyboardType="numeric"
                value={values.stock}
                errorText={errors.stock}
                onChangeText={handleChange('stock')}
            />
            <Pressable
                className='rounded-full bg-purple-800 p-2 active:opacity-80 flex-row justify-center'
                onPress={async () => {
                    const images = await PickerPlugin.pickMultiImages()
                    setFieldValue('images', images)
                }}>
                <Text className='text-white'>Agregar Fotos </Text>
                <Icons name='camera-alt' color={'white'} size={25} />
            </Pressable>
            <Text className='my-3'>Tallas</Text>
            <MultiSelectButton
                onSelectionChange={(selected) => setFieldValue('sizes', selected)}
                options={sizes}
                value={values.sizes}
            />
            {errors.sizes && <Text style={{ color: 'red', fontSize: 12, fontWeight: '500' }}>{errors.sizes}</Text>}
            <Text className='my-3'>Género</Text>
            <Picker
                style={{ backgroundColor: 'white' }}
                selectedValue={values.gender}
                onValueChange={(itemValue) => setFieldValue('gender', itemValue)}>
                {
                    genders.map(e => (<Picker.Item key={e} label={e} value={e} />))
                }
            </Picker>
            <FormButton onPress={() => handleSubmit()}>
                Guardar
            </FormButton>
        </ScrollView>
    )
}