import { envs } from "@/src/config";
import { isAxiosError } from "axios";
import { apiClient } from "../api";
import { Product } from "./interfaces/product";

export class ProductActions {
	static async getProducts(
		page: number,
		limit: number = 10
	): Promise<Product[]> {
		const { data } = await apiClient.get<Product[]>(
			`/api/products?limit=${limit}&offset=${page * limit}`
		);

		return data.map(mapProduct);
	}

	static async getOneProduct(uid: string): Promise<Product> {
		const { data } = await apiClient.get<Product>(`/api/products/${uid}`);

		return mapProduct(data);
	}

	/// * =======================================================
	/// * Product Mutations
	/// * =======================================================

	static createOrUpdateProduct(product: Partial<Product>): Promise<Product> {
		product.price = safeParseInt(product.price);
		product.stock = safeParseInt(product.stock);

		if (product.id) {
			return ProductActions.updateProduct(product);
		}
		return ProductActions.createProduct(product);
	}

	private static async createProduct(product: Partial<Product>) {
		const { images: __, id: _, ...rest } = product;
		try {
			const { data } = await apiClient.post<Product>(`/api/products`, {
				...rest,
			});
			return mapProduct(data);
		} catch (error) {
			console.error(`Error al crear: ${error}`);
			if (isAxiosError(error)) {
				console.error(error.response?.data);
			}
			throw new Error(`No se pudo crear el producto`);
		}
	}

	private static async updateProduct(product: Partial<Product>) {
		const { images: _, id, ...rest } = product;

		try {
			const { data } = await apiClient.patch<Product>(`/api/products/${id}`, {
				...rest,
			});

			return mapProduct(data);
		} catch (error) {
			console.error(`Error al actualizar: ${error}`);
			if (isAxiosError(error)) {
				console.error(error.response?.data);
			}
			throw new Error(`No se pudo actualizar el producto con id ${id}`);
		}
	}
}

// * Mappers

function mapProduct(product: Product): Product {
	return {
		...product,
		images: product.images.map((e) => `${envs.API_URL}/api/files/product/${e}`),
	};
}

function safeParseInt(value: any): number {
	const num = Number(value);
	return isNaN(num) ? 0 : num;
}
