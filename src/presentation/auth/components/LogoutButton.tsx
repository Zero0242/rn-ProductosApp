import { MaterialIcons as Icon } from '@expo/vector-icons';
import React from "react";
import { Alert, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export function LogoutButton() {
    const { logout } = useAuthStore()

    const handleLogout = () => {
        console.log('Prompt de prueba');

        Alert.alert('¿Cerrar Sesión?', 'Confirma que quiere salir', [
            {
                text: 'Cancelar',
                style: 'default'
            },
            {
                text: 'Confirmar',
                onPress: () => logout(),
                style: 'destructive'
            },
        ],)
    }

    return (
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => handleLogout()}>
            <Text style={{ color: 'red' }}>Cerrar Sesión </Text>
            <Icon name='exit-to-app' size={20} color={'red'} />
        </TouchableOpacity>
    )
}