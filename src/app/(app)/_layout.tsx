import { LogoutButton, useAuthStore } from '@/src/presentation/auth';
import { FullScreenLoader } from '@/src/presentation/shared';
import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';

export default function Layout() {
    const { stage, checkToken } = useAuthStore()

    useEffect(() => {
        checkToken()
    }, [])

    if (stage === 'checking') return <FullScreenLoader />
    if (stage === 'not-authenticated') {
        return <Redirect href={"/auth/login"} />
    }

    return (
        <Stack>
            <Stack.Screen
                name='(home)/index'
                options={{
                    title: 'Productos',
                    headerRight: () => <LogoutButton />
                }}
            />
            <Stack.Screen
                name='product/[id]'
                options={{ title: 'Producto' }}
            />
        </Stack>
    )
}