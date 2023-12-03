import React, { useState } from 'react'

export const useForm = <T extends Object>(initState: T) => {
    const [state, setstate] = useState(initState)

    function onChange<K extends Object>(value: K, key: keyof T) {
        setstate({ ...state, [key]: value })
    }
    function setFormValue(form: T) {
        setstate(form)
    }

    return { ...state, form: state, onChange, setFormValue }
}