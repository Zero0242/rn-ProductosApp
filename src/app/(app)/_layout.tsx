import { Stack } from 'expo-router';
import React, { useEffect } from 'react';

export default function Layout() {
    useEffect(() => {
        console.log('Inicializando carga de datos');
    }, [])

    return (
        <Stack>
            <Stack.Screen
                name='(home)/index'
                options={{ title: 'Productos' }}
            />
            <Stack.Screen
                name='product/[id]'
                options={{ title: 'Producto' }}
            />
        </Stack>
    )
}