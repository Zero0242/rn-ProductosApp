import { Icon, useTheme } from '@ui-kitten/components'
import React, { useMemo } from 'react'

interface Props {
    name: string
    color?: string
    white?: boolean
}

export function AppIcon({ name, color, white = false }: Props) {
    const theme = useTheme()
    const style = useMemo(() => {
        if (white) {
            return theme['color-info-100']
        } else if (!color) {
            return theme['text-basic-color']
        } else {
            return color
        }
    }, [theme])




    return (
        <Icon
            fill={style}
            name={name}
            style={{
                width: 32,
                height: 32,
            }}
        />
    )
}