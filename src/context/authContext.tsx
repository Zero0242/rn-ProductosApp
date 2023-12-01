import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useReducer } from 'react'
import { LoginData, LoginResponse, Usuario } from '../interfaces/appInterfaces'
import { AuthState, authReducer } from './authReducer';
import cafeApi from '../api/cafeApi';

type AuthContextProps = {
    errorMessage: string,
    token: string | null,
    usuario: Usuario | null;
    status: 'checking' | 'logged-in' | 'signed-out';
    signUp: () => void,
    signIn: (val: LoginData) => void,
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

    const signIn = async (data: LoginData) => {
        const { correo, password } = data
        try {
            const resp = await cafeApi.post<LoginResponse>('/usuarios', { correo, password });
            const { token, usuario: user } = resp.data
            dispatch({ type: 'signUp', payload: { user, token } })
            console.log(resp.data)
        } catch (error) {
            console.log({ error });
        }
    }
    const signUp = () => { }
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

