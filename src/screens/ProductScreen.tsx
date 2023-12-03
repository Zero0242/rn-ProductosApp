import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProductsStackParams } from '../router/ProductsNavigator'
import { CustomButton } from '../components';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/productsContext';

interface Props extends NativeStackScreenProps<ProductsStackParams, 'ProductScreen'> { }
export const ProductScreen = ({ route, navigation }: Props) => {
  const { id = '', name = '' } = route.params;
  const [selectedCategory, setselectedCategory] = useState('')
  const { loadProductById } = useContext(ProductsContext)
  const { categories } = useCategories()

  const { nombre, form, onChange, setFormValue } = useForm({ _id: id, categoriaID: '', nombre: name, imagen: '' })

  useEffect(() => {
    name && navigation.setOptions({ title: name })
  }, [])

  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    if (id) {
      const producto = await loadProductById(id)
      setFormValue({
        _id: id,
        categoriaID: producto.categoria._id,
        imagen: producto.img ?? '',
        nombre
      })
    }
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre: {name}</Text>
        <Text>ID: {id}</Text>
        <TextInput
          value={nombre}
          placeholder='Producto'
          onChangeText={(value) => onChange(value, 'nombre')}
          style={styles.textInput}
        />
        {/* Date Picker */}
        <Text>Seleccione la categoria:{selectedCategory}</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            const category = categories[itemIndex]
            onChange(itemValue, 'categoriaID')
            setselectedCategory(category.nombre)
          }}
        >
          {categories.map(
            (category) => <Picker.Item key={category._id} label={category.nombre} value={category._id} />
          )}
        </Picker>

        <Button
          title='Guardar'
          onPress={() => { }}
          color='#5856d6'
        />

        <View style={styles.optionRow}>
          <CustomButton
            title='Camara'
            iconName='camera-outline'
          />
          <CustomButton
            title='Galeria'
            iconName='images-outline'
          />
        </View>
        <Text>{JSON.stringify(form, null, 5)}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%'
  },
})