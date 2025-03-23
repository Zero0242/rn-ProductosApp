import { MaterialIcons as Icon } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from "react";
import { Alert, Pressable } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export function LogoutButton() {
    const { logout } = useAuthStore()

    const handleLogout = async () => {
        await Haptics.notificationAsync()
        Alert.alert('¿Cerrar Sesión?', 'Confirma que quiere salir',
            [
                {
                    text: 'Cancelar',
                    style: 'default'
                },
                {
                    text: 'Confirmar',
                    onPress: () => logout(),
                    style: 'destructive'
                },
            ],
        )
    }

    return (
        <Pressable
            className='flex-row gap-1 py-2 px-4 bg-red-500 rounded-full opacity-100 active:opacity-80'
            onPress={() => handleLogout()}>
            <Icon name='exit-to-app' size={20} color={'white'} />
        </Pressable>
    )
}

