import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect, useReducer } from 'react'
import { LoginData, LoginResponse, Usuario } from '../interfaces/appInterfaces'
import { AuthState, authReducer } from './authReducer';
import cafeApi from '../api/cafeApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

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


    useEffect(() => {
        checkToken()
    }, [])


    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log({token});
        
        if (!token) return dispatch({ type: 'authFailed' })
        // Login si tienen el token
        const { data } = await cafeApi.get<LoginResponse>('/auth')
        dispatch({ type: 'signUp', payload: { user: data.usuario, token: data.token } })
        await AsyncStorage.setItem('token', data.token)
    }

    const signIn = async (data: LoginData) => {
        const { correo, password } = data
        try {
            const resp = await cafeApi.post<LoginResponse>('/auth/login', { correo, password });
            const { token, usuario: user } = resp.data
            dispatch({ type: 'signUp', payload: { user, token } })
            await AsyncStorage.setItem('token', token)
        } catch (error: any) {
            console.log(error.response.data);
            dispatch({ type: 'addError', payload: error.response.data.msg ?? 'Credenciales invalidas' })
        }
    }
    const signUp = () => { }
    const removeError = () => dispatch({ type: 'removeError' })
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

