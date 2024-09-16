import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StackRouter } from './presentation/router'

export const ProductsApp = () => {
  return (
    <>
      <NavigationContainer>
        <StackRouter />
      </NavigationContainer>
    </>
  )
}
