import * as Haptics from 'expo-haptics';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    options: string[];
    value: string[];
    onSelectionChange: (selected: string[]) => void;
}

export const MultiSelectButton = ({ options, onSelectionChange, value = [] }: Props) => {

    const toggleOption = (option: string) => {
        const newSelection = value.includes(option)
            ? value.filter(item => item !== option)
            : [...value, option];
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        onSelectionChange(newSelection);
    };

    return (
        <View style={styles.container}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option}
                    style={[
                        styles.button,
                        value.includes(option) ? styles.selectedButton : null,
                    ]}
                    onPress={() => toggleOption(option)}
                >
                    <Text style={[
                        styles.buttonText,
                        value.includes(option) ? styles.selectedButtonText : null,
                    ]}>
                        {option}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 10,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#b6b6b6',
    },
    selectedButton: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    buttonText: {
        color: '#333',
    },
    selectedButtonText: {
        color: '#fff',
    },
});
