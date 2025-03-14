import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    options: string[];
    onSelectionChange: (selected: string[]) => void;
    initialSelected?: string[];
}

export const MultiSelectButton = ({ options, onSelectionChange, initialSelected = [] }: Props) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(initialSelected);

    const toggleOption = (option: string) => {
        const newSelection = selectedItems.includes(option)
            ? selectedItems.filter(item => item !== option)
            : [...selectedItems, option];

        setSelectedItems(newSelection);
        onSelectionChange(newSelection);
    };

    return (
        <View style={styles.container}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option}
                    style={[
                        styles.button,
                        selectedItems.includes(option) ? styles.selectedButton : null,
                    ]}
                    onPress={() => toggleOption(option)}
                >
                    <Text style={[
                        styles.buttonText,
                        selectedItems.includes(option) ? styles.selectedButtonText : null,
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
