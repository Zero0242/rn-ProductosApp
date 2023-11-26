import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Background, WhiteLogo } from '../components'
import { loginStyles } from '../theme/loginTheme'


export const LoginScreen = () => {
  return (
    <>
      {/* Background */}
      <Background />
      {/* View del keyboard */}
      <WhiteLogo />
      <Text style={loginStyles.title}>Login</Text>
      <Text style={loginStyles.label}>Email</Text>
      <TextInput
        placeholder='Ingrese su email'
        placeholderTextColor={"rgba(255,255,255,0.4)"}
        keyboardType="email-address"
      />
    </>
  )
}
