import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { loginStyles } from '../theme/loginTheme'
import { WhiteLogo } from '../components'
import { useForm } from '../hooks/'
import { AuthContext } from '../context/'


interface Props extends NativeStackScreenProps<any, any> { }
export const RegisterScreen = ({ navigation }: Props) => {
  const { email, password, onChange, name } = useForm({ email: '', password: '', name: '' })
  const { signUp } = useContext(AuthContext)

  const onRegister = () => {
    signUp({ correo: email, password, nombre: name });
    Keyboard.dismiss()
  }

  return (
    <>
      {/* View del keyboard */}
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#5856d6' }}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <View style={loginStyles.formContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Registro</Text>
          <Text style={loginStyles.label}>Nombre</Text>
          <TextInput
            placeholder='Ingrese su nombre'
            placeholderTextColor={"rgba(255,255,255,0.4)"}
            underlineColorAndroid='white'
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ]}
            selectionColor="white"
            autoCapitalize='words'
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
          />
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
            onSubmitEditing={onRegister}
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
            onSubmitEditing={onRegister}
            autoCorrect={false}
          />
          {/* Boton Login */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onRegister}
              style={loginStyles.button}
            >
              <Text style={loginStyles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
          {/* Crear Nueva Cuenta */}
        </View>
        <TouchableOpacity
          style={{ ...loginStyles.button, ...loginStyles.buttonReturn }}
          onPress={navigation.goBack}
          activeOpacity={0.8}
        >
          <Icon name='arrow-back-outline' style={loginStyles.backArrow} />
          <Text style={loginStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  )
}


const styles = StyleSheet.create({})