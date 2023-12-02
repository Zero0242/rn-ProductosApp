import React, { createContext, useState } from 'react'
import { Producto } from '../interfaces/productInterface';

type ProductsContextProps = {
    products: Producto[],
    loadProducts: () => void,
    addProducts: (categoryID: string, productName: string) => Promise<void>,
    updateProducts: (categoryID: string, productName: string, productID: string) => void,
    deleteProduct: (id: string) => Promise<void>,
    loadProductById: (id: string) => Promise<Producto>,
    uploadImage: (data: any, id: string) => Promise<void>
}

export const ProductsContext = createContext({} as ProductsContextProps)

export const ProductsProvider = ({ children }: any) => {
    const [products, setProducts] = useState<Producto[]>([])

    const loadProducts = async() => { }
    const addProducts = async (categoryID: string, productName: string) => { }
    const updateProducts = (categoryID: string, productName: string, productID: string) => { }
    const deleteProduct = async (id: string) => { }
    const loadProductById = async (id: string) => products[0]
    const uploadImage = async (data: any, id: string) => { }

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProducts,
            deleteProduct,
            loadProductById,
            updateProducts,
            uploadImage,
        }}>
            {children}
        </ProductsContext.Provider>
    )
}