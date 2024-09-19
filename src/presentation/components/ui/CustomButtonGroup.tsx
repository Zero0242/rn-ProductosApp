import { ButtonGroup } from '@ui-kitten/components'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

interface Props<T> {
    data: T[]
    keyExtractor: (value: T) => string
    renderItem: (params: { item: T, index: number }) => JSX.Element
    style?: StyleProp<ViewStyle>
}

export function CustomButtonGroup<T>({ data, keyExtractor, renderItem, style }: Props<T>) {
    const Renderer = renderItem

    return (
        <ButtonGroup
            style={style}
            appearance='outline'
            size='small'
        >
            {
                data.map((item, index) => (
                    <Renderer
                        index={index}
                        key={keyExtractor(item)}
                        item={item}
                    />
                ))
            }
        </ButtonGroup>
    )
}