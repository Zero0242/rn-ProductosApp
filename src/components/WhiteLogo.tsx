import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const WhiteLogo = () => {
    return (
        <View style={{
            alignItems: 'center',
        }}>
            <Image
                source={require('../assets/react-logo-white.png')}
                style={{ width: 110, height: 110 }}
            />
        </View>
    )
}


const styles = StyleSheet.create({})