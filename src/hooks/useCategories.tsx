import React, { useEffect, useState } from 'react'
import { Categoria, CategoryResponse } from '../interfaces/productInterface'
import cafeApi from '../api/cafeApi'

export const useCategories = () => {
    const [categories, setCategories] = useState<Categoria[]>([])

    const loadCategories = async () => {
        const { data } = await cafeApi.get<CategoryResponse>('categorias')
        setCategories(data.categorias)
    }

    useEffect(() => {
        loadCategories()
    }, [])


    return { categories }
}
