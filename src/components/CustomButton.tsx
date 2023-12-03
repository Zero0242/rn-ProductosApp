import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'

interface Props {
    title: string
    iconName?: string
    onPress?: () => void
    style?: StyleProp<ViewStyle>
}
export const CustomButton = ({ onPress, title, style, iconName = 'help-circle-outline' }: Props) => {
    return (
        <TouchableOpacity
            style={{ ...styles.customButton, ...style as any }}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Icon name={iconName} color={'white'} size={18} />
            <Text style={styles.buttonLabel}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    customButton: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#5856d6'
    },
    buttonLabel: {
        color: 'white', fontWeight: 'bold', fontSize: 18, marginLeft: 5,
    }
})