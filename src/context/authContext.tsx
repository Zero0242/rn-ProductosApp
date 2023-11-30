import { StyleSheet, Text, View } from 'react-native'
import React, { createContext } from 'react'
import { Usuario } from '../interfaces/appInterfaces'

type AuthContextProps = {
    errorMessage: string,
    token: string | null,
    usuario: Usuario | null;
    status: 'checking' | 'logged-in' | 'signed-out';
    signUp: () => void,
    signIn: () => void,
    removeError: () => void,
    logOut: () => void,
}



export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {
    return (
        <AuthContext.Provider value={{
            
        }}>
            {children}
        </AuthContext.Provider>
    )
}

