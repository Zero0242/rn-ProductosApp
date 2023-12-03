import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { ProductsContext } from '../context/productsContext'
import { Producto } from '../interfaces/productInterface'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProductsStackParams } from '../router/ProductsNavigator'
import Icon from 'react-native-vector-icons/Ionicons'


interface Props extends NativeStackScreenProps<ProductsStackParams, 'ProductsScreen'> { }
export const ProductsScreen = ({ navigation }: Props) => {
  const { products, loadProducts } = useContext(ProductsContext)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddButton onPress={() => navigation.navigate('ProductScreen', {})} />
    })
  }, [])

  const renderItem = (item: Producto) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={
        () => navigation.navigate('ProductScreen', { id: item._id, name: item.nombre })
      }>
      <Text style={styles.productLabel}>{item.nombre}</Text>
    </TouchableOpacity>
  )


  /* Añadir Pull to Refresh */
  return (
    <View style={styles.container}>
      <Text>ProductsScreen</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  )
}

const AddButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Icon name='add-outline' size={20} />
    <Text>Agregar</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: 'rgba(0,0,0,0.1)'
  },
  productLabel: {}
})