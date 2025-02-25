import { Link } from 'expo-router'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Login() {
    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'SpaceMono' }}>Inicia Sesión</Text>
            <Text style={{ fontFamily: 'SpaceMono' }}>Por favor, ingrese para continuar</Text>
            <TextInput style={styles.textInput} />
            <TextInput style={styles.textInput} />
            <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1, ...styles.button })}>
                <Text style={{ fontFamily: 'SpaceMono', color: 'white' }}>Ingresar</Text>
            </Pressable>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'SpaceMono', fontSize: 12 }}>¿No tienes cuenta?</Text>
                <Link href={'/auth/signup'} asChild>
                    <Text style={{ fontFamily: 'SpaceMono', color: 'blue', fontSize: 12 }}>Registrate acá</Text>
                </Link>
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