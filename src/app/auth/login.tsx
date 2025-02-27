import { AuthView, useAuthLogin } from '@/src/presentation/auth';
import { Field, FormButton } from '@/src/presentation/shared';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Login() {
    const { handleSubmit, values, handleChange } = useAuthLogin()

    return (
        <AuthView>
            <Text style={{ fontFamily: 'SpaceMono' }}>Inicia Sesión</Text>
            <Text style={{ fontFamily: 'SpaceMono' }}>Por favor, ingrese para continuar</Text>
            <Field
                value={values.email}
                placeholder='Correo Electrónico'
                onChangeText={handleChange('email')}
                autoCapitalize='none'
                keyboardType='email-address'
            />
            <Field
                value={values.password}
                placeholder='Contraseña'
                onChangeText={handleChange('password')}
                autoCapitalize='none'
                secureTextEntry
            />
            <FormButton onPress={() => handleSubmit()}>
                Ingresar
            </FormButton>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'SpaceMono', fontSize: 12 }}>¿No tienes cuenta?</Text>
                <Link href={'/auth/signup'} asChild>
                    <Text style={{ fontFamily: 'SpaceMono', color: 'blue', fontSize: 12 }}>Registrate acá</Text>
                </Link>
            </View>
        </AuthView>
    )
}
