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
        const resp = await cafeApi.post<Producto>('/productos', { nombre: productName, categoria: categoryID })
        setProducts([...products, resp.data])
    }

    const updateProducts = async (categoryID: string, productName: string, productID: string) => {
        const resp = await cafeApi.put<Producto>(`/productos/${productID}`, { nombre: productName, categoria: categoryID })
        setProducts(products.map((producto) => {
            if (producto._id === productID) return resp.data;
            return producto;
        }
        ))

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