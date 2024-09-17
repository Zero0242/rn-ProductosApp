import { useState } from "react";

interface ChangeProps {
    target: {
        name: string;
        value: string;
    };
}

export const useForm = <T extends Object>(initialValues: T) => {
    const [formState, setFormState] = useState(initialValues);

    /** Implementación para react html */
    const handleChange = ({ target }: ChangeProps) => {
        setFormState({
            ...formState,
            [target.name]: target.value,
        });
    };

    const changeForm = (state: T) => setFormState(state);

    /** Implementación para react native */
    const updateForm = <K extends Object>(key: keyof T) => {
        return (value: K) => {
            setFormState({
                ...formState,
                [key]: value,
            });
        };
    };

    return {
        formState,
        ...formState,
        handleChange,
        updateForm,
        changeForm,
    };
};
