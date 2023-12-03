import React, { createContext, useEffect, useState } from 'react'
import { Producto, ProductsResponse } from '../interfaces/productInterface';
import cafeApi from '../api/cafeApi';
import { Asset } from 'react-native-image-picker';

type ProductsContextProps = {
    products: Producto[],
    loadProducts: () => Promise<void>,
    addProducts: (categoryID: string, productName: string) => Promise<Producto>,
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
        //setProducts([...products, ...data.productos])
        setProducts(data.productos)
    }

    const addProducts = async (categoryID: string, productName: string) => {
        const resp = await cafeApi.post<Producto>('/productos', { nombre: productName, categoria: categoryID })
        setProducts([...products, resp.data])
        return resp.data
    }

    const updateProducts = async (categoryID: string, productName: string, productID: string) => {
        const resp = await cafeApi.put<Producto>(`/productos/${productID}`, { nombre: productName, categoria: categoryID })
        setProducts(products.map((producto) => {
            if (producto._id === productID) return resp.data;
            return producto;
        }
        ))
    }

    const deleteProduct = async (id: string) => {
        try {
            const resp = await cafeApi.delete(`/productos/${id}`)
            setProducts(products.filter((producto) => producto._id !== id))
        } catch (error) {
            console.error(error);
        }
    }

    const loadProductById = async (id: string) => {
        const { data } = await cafeApi.get<Producto>(`/productos/${id}`);
        return data;
    }
    const uploadImage = async (data: Asset, id: string) => {
        const fileToUpload = {
            uri: data.uri,
            type: data.type,
            name: data.fileName,
        }

        const formData = new FormData()
        formData.append('archivo', fileToUpload)
        try {
            const resp = await cafeApi.putForm(`/uploads/productos/${id}`, formData)
            console.log(resp.data);
        } catch (error) {
            console.error(error);
        }
    }

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