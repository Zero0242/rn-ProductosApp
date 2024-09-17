import React, { PropsWithChildren, useEffect } from 'react'
import { useAppRouter } from '../hooks'
import { useAuthStore } from '../store'

export function AuthProvider({ children }: PropsWithChildren) {
    const validateToken = useAuthStore(state => state.validateToken)
    const authStatus = useAuthStore(state => state.authStatus)
    const navigation = useAppRouter()

    useEffect(() => {
        validateToken()
    }, [])

    useEffect(() => {
        console.log(`Nuevo estado: ${authStatus}`);
        if (authStatus === 'not-authenticated') {
            navigation.reset({ routes: [{ name: 'LoginScreen' }] })
        } else if (authStatus === 'authenticated') {
            navigation.reset({ routes: [{ name: 'HomeScreen' }] })
        }
    }, [authStatus])

    return (
        <>
            {children}
        </>
    )
}