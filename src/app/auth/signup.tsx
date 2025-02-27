import { AuthView, useAuthSignUp } from '@/src/presentation/auth';
import { Field, FormButton } from '@/src/presentation/shared';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function SignUp() {
    const router = useRouter();
    const { handleChange, handleSubmit, values, errors } = useAuthSignUp()
    return (
        <AuthView>
            <Text style={{ fontFamily: 'SpaceMono' }}>Crea tu Cuenta</Text>
            <Field
                onChangeText={handleChange('fullName')}
                value={values.fullName}
                placeholder='Ingresa tu Nombre'
                autoCapitalize='words'
                errorText={errors.fullName} />
            <Field
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder='Ingresa tu correo'
                autoCapitalize='none'
                keyboardType='email-address'
                errorText={errors.email} />
            <Field
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder='Ingresa tu Contraseña'
                autoCapitalize='none'
                secureTextEntry
                errorText={errors.password} />

            <FormButton onPress={() => handleSubmit()}>
                Registrar
            </FormButton>

            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'SpaceMono', fontSize: 12 }}>¿Ya tienes cuenta?</Text>
                <Pressable onPress={() => router.back()}>
                    <Text style={{ fontFamily: 'SpaceMono', color: 'blue', fontSize: 12 }}>Ingresa acá</Text>
                </Pressable>
            </View>
        </AuthView>
    )
}

