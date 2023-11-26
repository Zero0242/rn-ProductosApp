import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const Background = () => {
    return (
        <View style={{
            position: 'absolute',
            backgroundColor: '#5856d6',
            top: -250,
            width: 1000,
            height: 1200,
            transform: [{ rotate: '-70deg' }],
        }}>
        </View>
    )
}

const styles = StyleSheet.create({})