import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../router'

export function useAppRouter() {
    const navigation = useNavigation<NavigationProp<RootStackParams>>()

    return navigation
}