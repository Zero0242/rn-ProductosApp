import { Button } from '@ui-kitten/components'
import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { AppIcon } from './AppIcon'

interface Props {
    iconName: string
    onPress: () => void
    style?: StyleProp<ViewStyle>
}

export function Fab({ onPress, style = {}, iconName }: Props) {
    return (
        <Button
            style={[style, {
                shadowColor: 'black',
                shadowOffset: {
                    height: 10,
                    width: 0,
                },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 3,
                borderRadius: 13,
            }]}

            accessoryLeft={<AppIcon name={iconName} white />}
            onPress={onPress}
        />
    )
}