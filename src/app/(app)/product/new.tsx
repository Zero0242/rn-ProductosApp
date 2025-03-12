import { Gender, Sizes } from '@/src/core/products'
import { Field, MultiSelectButton } from '@/src/presentation/shared'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const sizes: Sizes[] = Object.values(Sizes)
const genders: Gender[] = Object.values(Gender)

export default function New() {
    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
            <Field
                placeholder="Nombre del producto"
            />
            <Field
                placeholder="Descripción del producto"
                numberOfLines={5}
            />
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Field
                    placeholder="Precio"
                    keyboardType="numeric"
                    style={{ flex: 1 }}
                />
                <Field
                    placeholder="Stock"
                    keyboardType="numeric"
                    style={{ flex: 1 }}
                />
            </View>
            <Text style={{ marginVertical: 10 }}>Tallas</Text>
            <MultiSelectButton
                onSelectionChange={(selected) => console.log(selected)}
                options={sizes}
            />
            <Text style={{ marginVertical: 10 }}>Género</Text>
            <MultiSelectButton
                onSelectionChange={(selected) => console.log(selected)}
                options={genders}
            />
        </ScrollView>
    )
}