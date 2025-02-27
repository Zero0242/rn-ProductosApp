import { MaterialIcons as Icon } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from "react";
import { Alert, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export function LogoutButton() {
    const { logout } = useAuthStore()

    const handleLogout = () => {
        console.log('Prompt de prueba');
        Haptics.notificationAsync()
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
        <TouchableOpacity style={{ flexDirection: 'row', paddingRight: 8 }} onPress={handleLogout}>
            <Text style={{ color: 'red' }}>Salir </Text>
            <Icon name='exit-to-app' size={20} color={'red'} />
        </TouchableOpacity>
    )
}