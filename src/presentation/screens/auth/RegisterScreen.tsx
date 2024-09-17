import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Alert, ScrollView, useWindowDimensions } from 'react-native'
import { AppIcon } from '../../components/ui'
import { useForm } from '../../hooks'
import { RootStackParams } from '../../router'
import { useAuthStore } from '../../store'

interface Props extends NativeStackScreenProps<RootStackParams, 'RegisterScreen'> { }

export function RegisterScreen({ navigation, route }: Props) {
    const { height } = useWindowDimensions()
    const register = useAuthStore(state => state.register)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { fullName, email, password, updateForm, formState } = useForm({
        email: '', password: '', fullName: ''
    })

    const onRegister = async () => {
        setIsLoading(true)
        const isOK = await register(formState)
        setIsLoading(false)
        if (isOK) return;

        Alert.alert('Error', 'No se pudo crear la cuenta')
    }

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }}>
                <Layout style={{ paddingTop: height * 0.3 }}>
                    <Text category='h1'>Registro</Text>
                    <Text category='p2'>Por favor, crea una cuenta para continuar</Text>
                </Layout>
                <Layout style={{ height: 20 }} />
                <Input
                    placeholder='Nombre Completo'
                    autoCapitalize='words'
                    value={fullName}
                    onChangeText={updateForm('fullName')}
                    accessoryLeft={<AppIcon name='person-outline' />}
                />
                <Layout style={{ height: 10 }} />
                <Input
                    placeholder='Correo electrónico'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={email}
                    onChangeText={updateForm('email')}
                    accessoryLeft={<AppIcon name='email-outline' />}
                />
                <Layout style={{ height: 10 }} />
                <Input
                    placeholder='Contraseña'
                    autoCapitalize='none'
                    secureTextEntry
                    value={password}
                    onChangeText={updateForm('password')}
                    accessoryLeft={<AppIcon name='lock-outline' />}
                />
                <Layout style={{ height: 30 }} />
                {/* Acceso */}
                <Button
                    disabled={isLoading}
                    accessoryRight={<AppIcon name='arrow-forward-outline' white />}
                    onPress={onRegister}
                >
                    Crear Cuenta
                </Button>
                <Layout style={{ height: 40 }} />
                <Layout style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                }}>
                    <Text>Ya tienes una cuenta?</Text>
                    <Text
                        status='primary'
                        category='s1'
                        onPress={() => navigation.pop()}
                    > Ingresar</Text>
                </Layout>


            </ScrollView>
        </Layout>
    )
}