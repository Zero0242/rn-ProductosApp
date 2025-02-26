import React, { PropsWithChildren } from 'react'
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

export function AuthView({ children }: PropsWithChildren) {
    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    {children}
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'transparent',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
})