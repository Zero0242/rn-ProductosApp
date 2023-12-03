import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProductsStackParams } from '../router/ProductsNavigator'
import { CustomButton } from '../components';


interface Props extends NativeStackScreenProps<ProductsStackParams, 'ProductScreen'> { }
export const ProductScreen = ({ route, navigation }: Props) => {
  const { id, name } = route.params;

  useEffect(() => {
    name && navigation.setOptions({ title: name })
  }, [])


  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre: {name}</Text>
        <Text>ID: {id}</Text>
        <TextInput
          placeholder='Producto'
          style={styles.textInput}
        />
        {/* Date Picker */}
        <Text>Seleccione la categoria:</Text>
        <></>

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