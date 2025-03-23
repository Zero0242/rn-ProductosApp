import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { StackRouter } from './presentation/router';

const queryClient = new QueryClient()

export const ProductsApp = () => {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const theme = isDark ? eva.dark : eva.light
  const background = (isDark)
    ? theme['color-basic-800']
    : theme['color-basic-100']

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer theme={{
          dark: isDark,
          colors: {
            primary: theme['color-primary-500'],
            background: background,
            text: theme['text-basic-color'],
            card: theme['color-basic-100'],
            border: theme['color-basic-800'],
            notification: theme['color-primary-500'],
          }
        }}>
          <AuthProvider>
            <StackRouter />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  )
}
