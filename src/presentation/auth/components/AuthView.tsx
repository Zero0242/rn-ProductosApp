import React, { PropsWithChildren } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';

export function AuthView({ children }: PropsWithChildren) {
    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                    className='flex-1 px-5 justify-center items-start'
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Image
                        className='w-[200px] h-[200px] -top-5 -right-5 absolute'
                        /* style={styles.image} */
                        source={require('@/assets/images/react-logo.png')}
                    />
                    {children}
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </>
    )
}

