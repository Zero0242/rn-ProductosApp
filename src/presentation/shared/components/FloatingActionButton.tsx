import { MaterialIcons as Icon } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { OpaqueColorValue, Pressable } from 'react-native';

interface Props {
    onPress: () => void
    iconName: keyof typeof Icon.glyphMap;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
    iconColor?: string | OpaqueColorValue
    buttonColor?: string | OpaqueColorValue
}

export function FloatingActionButton({ iconName, onPress, position = 'bottom-right', buttonColor = 'blue', iconColor = 'white' }: Props) {

    function handlePress() {
        Haptics.notificationAsync()
        onPress()
    }

    return (
        <Pressable
            style={{
                backgroundColor: buttonColor,
                borderRadius: 100,
                padding: 12,
                position: 'absolute',
                bottom: position.includes('bottom') ? 20 : undefined,
                top: position.includes('top') ? 20 : undefined,
                right: position.includes('right') ? 20 : undefined,
                left: position.includes('left') ? 20 : undefined,
            }}
            onPress={handlePress}
        >
            <Icon name={iconName} color={iconColor} size={30} />
        </Pressable>
    )
}