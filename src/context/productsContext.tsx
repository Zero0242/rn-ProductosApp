import React, { createContext, useEffect, useState } from 'react'
import { Producto, ProductsResponse } from '../interfaces/productInterface';
import cafeApi from '../api/cafeApi';

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

    useEffect(() => {
        loadProducts()
    }, [])


    const loadProducts = async () => {
        const { data } = await cafeApi.get<ProductsResponse>('/productos?limite=50');
        setProducts([...products, ...data.productos])
    }

    const addProducts = async (categoryID: string, productName: string) => {
        console.log('Called', "CREATE");
        console.log({ categoryID, productName });


    }

    const updateProducts = async (categoryID: string, productName: string, productID: string) => {
        console.log('Called', 'UPDATE');
        console.log({ categoryID, productName ,productID});


    }

    const deleteProduct = async (id: string) => { }

    const loadProductById = async (id: string) => {
        const { data } = await cafeApi.get<Producto>(`/productos/${id}`);
        return data;
    }
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