import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Alert, ScrollView, useWindowDimensions } from 'react-native'
import { z } from 'zod'
import { AppIcon, MyInput } from '../../components/ui'
import { useForm } from '../../hooks'
import { RootStackParams } from '../../router'
import { useAuthStore } from '../../store'

interface Props extends NativeStackScreenProps<RootStackParams, 'LoginScreen'> { }

const validateSchema = z.object({
    email: z.string().email('No es un email valido'),
    password: z.string().min(1, 'No debe quedar vacía la contraseña'),
})

export function LoginScreen({ navigation, route }: Props) {
    const login = useAuthStore(state => state.login)
    const { email, password, updateForm, formState } = useForm({
        email: '', password: ''
    })
    const [isPosting, setIsPosting] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)
    const { height } = useWindowDimensions()

    const onLogin = async () => {
        const { success, error } = validateSchema.safeParse(formState)
        if (!success) {
            const errors: string[] = error?.errors.map(e => e.message) ?? []
            return Alert.alert('Error', errors.join('\n'))
        }

        setIsPosting(true)
        const isOK = await login(email, password)
        setIsPosting(false)
        if (isOK) return;
        Alert.alert('Error', 'No se pudo autenticar al usuario')
    }


    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }}>
                <Layout style={{ paddingTop: height * 0.35 }}>
                    <Text category='h1'>Ingresar</Text>
                    <Text category='p2'>Por favor, ingrese para continuar</Text>
                </Layout>
                <Layout style={{ height: 20 }} />
                <MyInput
                    placeholder='Correo electrónico'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={email}
                    onChangeText={updateForm('email')}
                    accessoryLeft={<AppIcon name='email-outline' />}
                />
                <Layout style={{ height: 10 }} />
                <MyInput
                    placeholder='Contraseña'
                    autoCapitalize='none'
                    value={password}
                    onChangeText={updateForm('password')}
                    accessoryLeft={<AppIcon name='lock-outline' />}
                    showIcon
                />
                <Layout style={{ height: 30 }} />
                {/* Acceso */}
                <Button
                    disabled={isPosting}
                    accessoryRight={<AppIcon name='arrow-forward-outline' white />}
                    onPress={onLogin}
                >
                    Ingresar
                </Button>
                <Layout style={{ height: 40 }} />
                <Layout style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                }}>
                    <Text>No tienes cuenta?</Text>
                    <Text
                        status='primary'
                        category='s1'
                        onPress={() => navigation.navigate('RegisterScreen')}
                    > crea una</Text>
                </Layout>

            </ScrollView>
        </Layout>
    )
}