import React, { PropsWithChildren } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export function AuthView({ children }: PropsWithChildren) {
    return (
        <>
            <StatusBar animated hidden />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Image
                        style={styles.image}
                        source={require('@/assets/images/react-logo.png')}
                    />
                    {children}
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    image: {
        width: 200,
        height: 200,
        position: 'absolute',
        top: -20,
        right: -20
    }
})