import { AppConstants } from '@/src/config'
import { AuthActions } from '@/src/core/auth'
import { StoragePlugin } from '@/src/helpers/plugins'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { toast } from 'sonner-native'
import * as Yup from 'yup'

const signupSchema = Yup.object().shape({
    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    password: Yup.string().min(6, 'Too Short!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
})

export default function SignUp() {
    const navigation = useRouter()

    const onRegister = async (formulario: any) => {
        const response = await AuthActions.register(formulario)
        if (response != null) {
            await StoragePlugin.setItem(AppConstants.JWT_KEY, response.token)
            toast.success('Cuenta registrada con exito')
            return navigation.back();
        }
        toast.error('Error al iniciar sesión');
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'SpaceMono' }}>Crea tu Cuenta</Text>
            <Formik
                onSubmit={values => onRegister(values)}
                validationSchema={signupSchema}
                initialValues={{
                    fullName: '',
                    email: '',
                    password: ''
                }}
            >
                {({ handleChange, handleSubmit, values, errors }) => (
                    <>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('fullName')}
                            value={values.fullName}
                            autoCapitalize='words'
                        />
                        {errors.fullName && <Text>{errors.fullName}</Text>}
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('email')}
                            value={values.email}
                            keyboardType='email-address'
                        />
                        {errors.email && <Text>{errors.email}</Text>}
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        {errors.password && <Text>{errors.password}</Text>}
                        <Pressable
                            style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1, ...styles.button })}
                            onPress={() => handleSubmit()}>
                            <Text style={{ fontFamily: 'SpaceMono', color: 'white' }}>Registrar</Text>
                        </Pressable>
                    </>
                )}
            </Formik>

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