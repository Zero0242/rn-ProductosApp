// Generated by https://quicktype.io

export interface ProductsResponse {
    total: number;
    productos: Producto[];
}

export interface Producto {
    precio: number;
    _id: string;
    nombre: string;
    categoria: Categoria;
    usuario: Categoria;
    img?: string
}

export interface Categoria {
    _id: string;
    nombre: string;
    usuario?: { _id: string, nombre: string }
}

// Generated by https://quicktype.io

export interface CategoryResponse {
    total: number;
    categorias: Categoria[];
}