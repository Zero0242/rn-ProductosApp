import React from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

interface Props extends TextInputProps {
    errorText?: string
}

export function Field({ errorText, style, ...props }: Props) {
    return (
        <View className='flex-wrap w-full'>
            <TextInput
                className='rounded-lg border border-black bg-white w-full my-2 p-3'
                style={[styles.textInput, style]}
                {...props}
            />
            {errorText && <Text className='text-red-500 font-medium text-sm' numberOfLines={2}>{errorText}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        fontFamily: 'SpaceMono',
    },
})