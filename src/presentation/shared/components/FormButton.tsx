import * as Haptics from 'expo-haptics'
import { Pressable, StyleSheet, Text } from 'react-native'

interface Props {
    onPress: () => void
    children: string
}

export function FormButton({ children, onPress }: Props) {

    const handlePress = () => {
        Haptics.selectionAsync()
        onPress()
    }

    return (
        <Pressable
            style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1, ...styles.button })}
            onPress={handlePress}>
            <Text style={styles.buttonText}>
                {children}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        width: '100%',
        padding: 15, marginVertical: 10,
        justifyContent: 'center', alignItems: 'center', borderRadius: 20
    },
    buttonText: {
        fontFamily: 'SpaceMono',
        color: 'white'
    }
})