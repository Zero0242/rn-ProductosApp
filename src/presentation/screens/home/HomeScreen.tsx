import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import { RootStackParams } from '../../router'

interface Props extends NativeStackScreenProps<RootStackParams, 'HomeScreen'> { }

export function HomeScreen({ navigation, route }: Props) {
    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}


