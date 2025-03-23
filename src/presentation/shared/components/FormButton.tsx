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
            className='bg-blue-700 w-full p-4 my-2 justify-center items-center rounded-3xl opacity-100 active:opacity-80'
            onPress={handlePress}>
            <Text className='text-white' style={styles.buttonText}>
                {children}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'SpaceMono',
    }
})