import { Gender, Sizes } from '@/src/core/products'
import { useProductCreate } from '@/src/presentation/products'
import { Field, FormButton, MultiSelectButton } from '@/src/presentation/shared'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const sizes: Sizes[] = Object.values(Sizes)
const genders: Gender[] = Object.values(Gender)



export default function New() {
    const { values, handleChange, handleSubmit, setFieldValue } = useProductCreate()

    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
            <Field
                placeholder="Nombre del producto"
                value={values.title}
                onChangeText={handleChange('title')}
            />
            <Field
                placeholder="Descripción del producto"
                numberOfLines={5}
                value={values.description}
                onChangeText={handleChange('description')}
            />
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Field
                    placeholder="Precio"
                    keyboardType="numeric"
                    style={{ flex: 1 }}
                    value={values.price}
                    onChangeText={handleChange('price')}
                />
                <Field
                    placeholder="Stock"
                    keyboardType="numeric"
                    value={values.stock}
                    onChangeText={handleChange('stock')}
                    style={{ flex: 1 }}
                />
            </View>
            <Text style={{ marginVertical: 10 }}>Tallas</Text>
            <MultiSelectButton
                onSelectionChange={(selected) => setFieldValue('sizes', selected)}
                options={sizes}
            />
            <Text style={{ marginVertical: 10 }}>Género</Text>
            <MultiSelectButton
                onSelectionChange={(selected) => setFieldValue('gender', selected)}
                options={genders}
            />
            <FormButton onPress={() => handleSubmit()}>
                Guardar
            </FormButton>
        </ScrollView>
    )
}