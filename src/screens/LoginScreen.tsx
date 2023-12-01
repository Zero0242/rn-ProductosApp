import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Background, WhiteLogo } from '../components'
import { loginStyles } from '../theme/loginTheme'
import { useForm } from '../hooks/useForm'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthContext } from '../context/authContext'
import { LoginData } from '../interfaces/appInterfaces'

// PAra acceder a props del navigation
interface Props extends NativeStackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {
  const { email, password, onChange, form } = useForm({ email: '', password: '' })
  const { signIn, errorMessage, removeError } = useContext(AuthContext)

  const onLogin = () => {
    signIn({ correo: email, password })
    Keyboard.dismiss()
  }

  useEffect(() => {
    if (errorMessage.length === 0) return
    Alert.alert('Error de autenticación', errorMessage,
      [{ text: 'ok', onPress: removeError }]
    )
  }, [errorMessage])



  return (
    <>
      {/* Background */}
      <Background />
      {/* View del keyboard */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
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
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
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
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
          />
          {/* Boton Login */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onLogin}
              style={loginStyles.button}
            >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          {/* Crear Nueva Cuenta */}
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              <Text style={loginStyles.buttonText}>Nueva Cuenta</Text>

            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
