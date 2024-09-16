import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import { RootStackParams } from '../../router'

interface Props extends NativeStackScreenProps<RootStackParams, 'LoadingScreen'> { }

export function LoadingScreen({ }: Props) {
    return (
        <View>
            <Text>LoadingScreen</Text>
        </View>
    )
}