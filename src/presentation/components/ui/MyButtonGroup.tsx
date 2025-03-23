import { Button, ButtonGroup, useTheme } from '@ui-kitten/components'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

interface Props<T> {
    data: T[]
    keyExtractor: (value: T) => string
    style?: StyleProp<ViewStyle>
    // Button
    labelBuilder: (value: T) => string
    selectedPredicate?: (value: T) => boolean
    onButtonPress: (value: T, selected: boolean) => void
}

export function MyButtonGroup<T>({ data, keyExtractor, style, labelBuilder, selectedPredicate, onButtonPress }: Props<T>) {
    const theme = useTheme()

    const resolvePredicate = (item: T) => {
        if (!selectedPredicate) return false
        return selectedPredicate(item)
    }

    return (
        <ButtonGroup
            style={style}
            appearance='outline'
            size='small'
        >
            {
                data.map((item, index) => (
                    <Button
                        onPress={() => onButtonPress(item, resolvePredicate(item))}
                        key={keyExtractor(item)}
                        style={{
                            flex: 1,
                            backgroundColor: resolvePredicate(item) ? theme['color-primary-200'] : undefined
                        }}
                    >
                        {labelBuilder(item)}
                    </Button>
                ))
            }
        </ButtonGroup>
    )
}