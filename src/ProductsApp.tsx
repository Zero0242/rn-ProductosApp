import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider } from '@ui-kitten/components';
import React from 'react';
import { useColorScheme } from 'react-native';
import { StackRouter } from './presentation/router';

export const ProductsApp = () => {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? eva.dark : eva.light

  return (
    <ApplicationProvider {...eva} theme={theme}>
      <NavigationContainer>
        <StackRouter />
      </NavigationContainer>
    </ApplicationProvider>
  )
}
