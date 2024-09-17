import { Button, Icon, Input, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { ScrollView, useWindowDimensions } from 'react-native'

export function LoginScreen() {
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
                />
                <Layout style={{ height: 10 }} />
                <Input
                    placeholder='Contraseña'
                    autoCapitalize='none'
                    secureTextEntry
                />
                <Layout style={{ height: 30 }} />
                {/* Acceso */}
                <Button
                    accessoryRight={<Icon name='arrowhead-right-outline' />}
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
                        onPress={() => { }}
                    > crea una</Text>
                </Layout>

            </ScrollView>
        </Layout>
    )
}