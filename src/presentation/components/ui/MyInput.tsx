import { Input, InputProps } from '@ui-kitten/components'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { AppIcon } from './AppIcon'

interface Props extends InputProps {
    showIcon?: boolean

}

export function MyInput({ secureTextEntry: __, accessoryRight: _, showIcon = false, ...props }: Props) {
    const [hidePassword, setHidePassword] = useState(showIcon)
    return (
        <Input
            {...props}
            secureTextEntry={hidePassword}
            accessoryRight={
                (showIcon) ? <Pressable
                    onPress={() => setHidePassword(state => !state)}
                    style={{ alignSelf: 'center' }}
                >
                    <AppIcon
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        color='#605757'
                    />
                </Pressable>
                    : undefined
            }
        />
    )
}