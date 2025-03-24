import { isAxiosError } from "axios";
import { apiClient } from "../api";
import { Product } from "./interfaces/product";
import { ProductUtils } from "./product.utils";

export class ProductActions {
	static async getProducts(
		page: number,
		limit: number = 10
	): Promise<Product[]> {
		const { data } = await apiClient.get<Product[]>(
			`/api/products?limit=${limit}&offset=${page * limit}`
		);

		return data.map(ProductUtils.mapProduct);
	}

	static async getOneProduct(uid: string): Promise<Product> {
		const { data } = await apiClient.get<Product>(`/api/products/${uid}`);

		return ProductUtils.mapProduct(data);
	}

	/// * =======================================================
	/// * Product Mutations
	/// * =======================================================

	static async createOrUpdateProduct(
		product: Partial<Product>
	): Promise<Product> {
		product.price = ProductUtils.safeParseInt(product.price);
		product.stock = ProductUtils.safeParseInt(product.stock);
		product.images = await ProductUtils.processImages(product.images ?? []);

		if (product.id) {
			return ProductActions.updateProduct(product);
		}
		return ProductActions.createProduct(product);
	}

	private static async createProduct(product: Partial<Product>) {
		const { id: _, ...rest } = product;
		try {
			const { data } = await apiClient.post<Product>(`/api/products`, {
				...rest,
			});
			return ProductUtils.mapProduct(data);
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

			return ProductUtils.mapProduct(data);
		} catch (error) {
			console.error(`Error al actualizar: ${error}`);
			if (isAxiosError(error)) {
				console.error(error.response?.data);
			}
			throw new Error(`No se pudo actualizar el producto con id ${id}`);
		}
	}
}
