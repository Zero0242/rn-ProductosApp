import { Gender, Sizes } from '@/src/core/products'
import { useProductCreate } from '@/src/presentation/products'
import { Field, FormButton, MultiSelectButton } from '@/src/presentation/shared'
import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const sizes: Sizes[] = Object.values(Sizes)
const genders: Gender[] = Object.values(Gender)



export default function New() {
    const { values, errors, handleChange, handleSubmit, setFieldValue } = useProductCreate()

    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
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
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Field
                    placeholder="Precio"
                    keyboardType="numeric"
                    style={{ flex: 1 }}
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
                    style={{ flex: 1 }}
                />
            </View>
            <Text style={{ marginVertical: 10 }}>Tallas</Text>
            <MultiSelectButton
                onSelectionChange={(selected) => setFieldValue('sizes', selected)}
                options={sizes}
                initialSelected={values.sizes}
            />
            {errors.sizes && <Text style={{ color: 'red', fontSize: 12, fontWeight: '500' }}>{errors.sizes}</Text>}
            <Text style={{ marginVertical: 10 }}>Género</Text>
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