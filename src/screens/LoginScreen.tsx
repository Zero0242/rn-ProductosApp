import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Background, WhiteLogo } from '../components'
import { loginStyles } from '../theme/loginTheme'


export const LoginScreen = () => {
  return (
    <>
      {/* Background */}
      <Background />
      {/* View del keyboard */}
      <View style={loginStyles.formContainer}>
        <WhiteLogo />
        <Text style={loginStyles.title}>Login</Text>
        <Text style={loginStyles.label}>Email</Text>
        <TextInput
          placeholder='Ingrese su email'
          placeholderTextColor={"rgba(255,255,255,0.4)"}
          keyboardType="email-address"
          underlineColorAndroid='white'
          style={[
            loginStyles.inputField,
            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
          ]}
          selectionColor="white"
          //TODO: onchange,value
          autoCapitalize='none'
          autoCorrect={false}
        />
        <Text style={loginStyles.label}>Contraseña</Text>
        <TextInput
          placeholder='*******'
          placeholderTextColor={"rgba(255,255,255,0.4)"}
          underlineColorAndroid='white'
          style={[
            loginStyles.inputField,
            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
          ]}
          secureTextEntry
          selectionColor="white"
        //TODO: onchange,value
        />
        {/* Boton Login */}
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyles.button}
          >
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        {/* Crear Nueva Cuenta */}
        <View style={loginStyles.newUserContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log('hola')}
          >
            <Text style={loginStyles.buttonText}>Nueva Cuenta</Text>

          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}
