import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { ScrollView, useWindowDimensions } from 'react-native'
import { AppIcon } from '../../components/ui'
import { RootStackParams } from '../../router'

interface Props extends NativeStackScreenProps<RootStackParams, 'LoginScreen'> { }

export function LoginScreen({ navigation, route }: Props) {
    const { height } = useWindowDimensions()
    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }}>
                <Layout style={{ paddingTop: height * 0.35 }}>
                    <Text category='h1'>Ingresar</Text>
                    <Text category='p2'>Por favor, ingrese para continuar</Text>
                </Layout>
                <Layout style={{ height: 20 }} />
                <Input
                    placeholder='Correo electrónico'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    accessoryLeft={<AppIcon name='email-outline' />}
                />
                <Layout style={{ height: 10 }} />
                <Input
                    placeholder='Contraseña'
                    autoCapitalize='none'
                    secureTextEntry
                    accessoryLeft={<AppIcon name='lock-outline' />}
                />
                <Layout style={{ height: 30 }} />
                {/* Acceso */}
                <Button
                    accessoryRight={<AppIcon name='arrow-forward-outline' white />}
                    onPress={() => { }}
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