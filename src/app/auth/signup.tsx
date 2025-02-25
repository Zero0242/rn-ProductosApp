import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

export default function SignUp() {
    const navigation = useRouter()
    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'SpaceMono' }}>Crea tu Cuenta</Text>
            <TextInput style={styles.textInput} />
            <TextInput style={styles.textInput} />
            <TextInput style={styles.textInput} />
            <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1, ...styles.button })}>
                <Text style={{ fontFamily: 'SpaceMono', color: 'white' }}>Registrar</Text>
            </Pressable>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'SpaceMono', fontSize: 12 }}>¿Ya tienes cuenta?</Text>
                <Pressable onPress={() => navigation.back()}>
                    <Text style={{ fontFamily: 'SpaceMono', color: 'blue', fontSize: 12 }}>Ingresa acá</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'flex-start', justifyContent: 'center', paddingHorizontal: 20 },
    textInput: { borderRadius: 10, borderColor: 'black', borderWidth: 2, width: '100%', marginVertical: 10 },
    button: {
        backgroundColor: 'blue',
        width: '100%',
        padding: 15, marginVertical: 10,
        justifyContent: 'center', alignItems: 'center', borderRadius: 20
    }
})