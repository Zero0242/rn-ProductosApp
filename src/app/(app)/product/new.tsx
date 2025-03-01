import { Field } from '@/src/presentation/shared'
import React from 'react'
import { ScrollView, View } from 'react-native'

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
        </ScrollView>
    )
}