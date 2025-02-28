import { MaterialIcons as Icon } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from "react";
import { Alert, Pressable, StyleSheet } from 'react-native';
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
            style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1, ...styles.baseButton })}
            onPress={() => handleLogout()}>
            <Icon name='exit-to-app' size={20} color={'white'} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    baseButton: {
        flexDirection: 'row',
        gap: 2,
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: 'red',
        borderRadius: 100
    }
})