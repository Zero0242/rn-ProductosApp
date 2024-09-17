import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { useColorScheme } from 'react-native';
import { StackRouter } from './presentation/router';

export const ProductsApp = () => {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? eva.dark : eva.light

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <StackRouter />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  )
}
