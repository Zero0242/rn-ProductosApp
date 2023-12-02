import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProductsStackParams } from '../router/ProductsNavigator'


interface Props extends NativeStackScreenProps<ProductsStackParams, 'ProductScreen'> { }
export const ProductScreen = ({ }: Props) => {
  return (
    <View>
      <Text>ProductScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})