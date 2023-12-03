import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
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
  const { loadProductById, deleteProduct, addProducts, updateProducts } = useContext(ProductsContext)
  const { categories } = useCategories()

  const { _id, categoriaID, nombre, imagen, onChange, setFormValue } = useForm({ _id: id, categoriaID: '', nombre: name, imagen: '' })

  useEffect(() => {
    navigation.setOptions({ title: (nombre) ? nombre : 'Sin nombre de Producto' })
  }, [nombre])

  useEffect(() => {
    loadProduct()
  }, [])

  const removeElement = async () => {
    await deleteProduct(_id)
    navigation.goBack()
  }

  const loadProduct = async () => {
    if (!_id) return;
    const producto = await loadProductById(_id)
    setFormValue({
      categoriaID: producto.categoria._id,
      imagen: producto.img ?? '',
      _id,
      nombre
    })

  }

  const saveOrUpdate = async () => {
    if (_id.length > 0) {
      updateProducts(categoriaID, nombre, _id)
    } else {
      const tempID = categoriaID || categories[0]._id
      const newProduct = await addProducts(tempID, nombre)
      onChange(newProduct._id, '_id')
    }
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre: {name}</Text>
        <Text>ID: {_id}</Text>
        <TextInput
          value={nombre}
          placeholder='Producto'
          onChangeText={(value) => onChange(value, 'nombre')}
          style={styles.textInput}
        />
        <Text>Seleccione la categoria:</Text>
        <Picker
          selectedValue={categoriaID}
          onValueChange={(itemValue) => {
            onChange(itemValue, 'categoriaID')
          }}
        >
          {categories.map(
            (category) => <Picker.Item key={category._id} label={category.nombre} value={category._id} />
          )}
        </Picker>

        <Button
          title='Guardar'
          onPress={saveOrUpdate}
          color='#5856d6'
        />
        {
          _id.length > 0 && (
            <>
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
              <CustomButton
                title='Eliminar'
                iconName='trash-outline'
                onPress={removeElement}
                style={{ backgroundColor: 'red', width: '30%', alignSelf: 'center', marginTop: 20 }} />
            </>

          )
        }
        {
          imagen.length !== 0 && (<Image source={{ uri: imagen }}
            style={{
              width: '100%',
              height: 300,
              marginTop: 20,
            }}
          />
          )
        }
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