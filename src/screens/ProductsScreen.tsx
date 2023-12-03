import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { ProductsContext } from '../context/productsContext'
import { Producto } from '../interfaces/productInterface'

export const ProductsScreen = () => {
  const { products,loadProducts } = useContext(ProductsContext)

  const renderItem = (item: Producto) => {
    return (
      <>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.productLabel}>{item.nombre}</Text>
        </TouchableOpacity>
      </>
    )
  }

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