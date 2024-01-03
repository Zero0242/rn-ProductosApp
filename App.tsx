import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { PaperProvider } from 'react-native-paper'
import { Navigator } from './src/router/'
import { AuthProvider, ProductsProvider } from './src/context/'

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}

const AppState = ({ children }: any) => {
  return (
    <PaperProvider>
      <AuthProvider>
        <ProductsProvider>
          {children}
        </ProductsProvider>
      </AuthProvider>
    </PaperProvider>
  )
}

export default App
