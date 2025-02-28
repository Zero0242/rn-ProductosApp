import { envs } from "@/src/config";
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
}

function mapProduct(product: Product): Product {
	return {
		...product,
		images: product.images.map((e) => `${envs.API_URL}/api/files/product/${e}`),
	};
}
