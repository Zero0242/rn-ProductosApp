import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProductsStackParams } from '../router/ProductsNavigator'


interface Props extends NativeStackScreenProps<ProductsStackParams, 'ProductScreen'> { }
export const ProductScreen = ({ route, navigation }: Props) => {
  const { id, name } = route.params;

  useEffect(() => {
    name && navigation.setOptions({ title: name })
  }, [])


  return (
    <View>
      <Text>ProductScreen</Text>
      <Text>{id} {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})