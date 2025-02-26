import React from 'react'
import { StyleSheet, Text, TextInput, TextInputProps } from 'react-native'

interface Props extends TextInputProps {
    errorText?: string
}

export function Field({ errorText, style, ...props }: Props) {
    return (
        <>
            <TextInput
                style={[styles.textInput, style]}
                {...props}
            />
            {errorText && <Text style={styles.errorText} numberOfLines={2}>{errorText}</Text>}
        </>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
        marginVertical: 10,
        fontFamily: 'SpaceMono',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        fontWeight: '500'
    }
})