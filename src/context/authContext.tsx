import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useReducer } from 'react'
import { Usuario } from '../interfaces/appInterfaces'
import { AuthState, authReducer } from './authReducer';

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

const authInitialState: AuthState = {
    errorMessage: '',
    status: 'checking',
    token: null,
    usuario: null,
}


export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {
    const [authState, dispatch] = useReducer(authReducer, authInitialState)

    const signUp = () => { }
    const signIn = () => { }
    const removeError = () => { }
    const logOut = () => { }

    

    return (
        <AuthContext.Provider value={{
            ...authState,
            signUp,
            signIn,
            removeError,
            logOut,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

