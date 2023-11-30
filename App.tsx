import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Navigator } from './src/router/Navigator'
import { AuthProvider } from './src/context/authContext'

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}

const AppState = ({ children }:any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export default App

const styles = StyleSheet.create({})