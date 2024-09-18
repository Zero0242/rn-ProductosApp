import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Text } from '@ui-kitten/components'
import { MainLayout } from '../../layouts'
import { RootStackParams } from '../../router'
import { useAuthStore } from '../../store'

interface Props extends NativeStackScreenProps<RootStackParams, 'HomeScreen'> { }

export function HomeScreen({ navigation, route }: Props) {
    const logout = useAuthStore(state => state.logout)
    const user = useAuthStore(state => state.user)

    return (
        <MainLayout
            title="Home"
            subtitle="Bienvenido a la aplicación"
        >
            <Text>HomeScreen {user?.fullName ?? ''}</Text>

            <Button onPress={logout}>
                Salir
            </Button>
            <Button onPress={() => navigation.navigate('ProductScreen', { productId: "asdasda" })}>
                Next
            </Button>
        </MainLayout>
    )
}


