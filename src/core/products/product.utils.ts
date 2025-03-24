import { envs } from "@/src/config";
import { isAxiosError } from "axios";
import { apiClient } from "../api";
import { Product } from "./interfaces/product";

export class ProductUtils {
	static mapProduct(product: Product): Product {
		return {
			...product,
			images: product.images.map(
				(e) => `${envs.API_URL}/api/files/product/${e}`
			),
		};
	}

	static async uploadImage(imagePath: string): Promise<string> {
		const formData = new FormData();

		formData.append("file", {
			uri: imagePath,
			type: "image/jpeg",
			name: imagePath.split("/").pop()!,
		});

		try {
			const { data } = await apiClient.post<{ image: string }>(
				"/api/files/product",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			return data.image;
		} catch (error) {
			console.error(`Errores ${error}`);
			if (isAxiosError(error)) {
				console.error(error.response);
			}
			throw new Error("No se pudo subir la imagen :(");
		}
	}

	static async processImages(images: string[]): Promise<string[]> {
		const local = images.filter((e) => e.includes("file://"));
		const server = images.filter((e) => !e.includes("file://"));

		if (local.length > 0) {
			const uploadPromises = local.map(ProductUtils.uploadImage);
			const results = await Promise.all(uploadPromises);
			server.push(...results);
		}

		return server.map((image) => image.split("/").pop()!);
	}

	static safeParseInt(value: any): number {
		const num = Number(value);
		return isNaN(num) ? 0 : num;
	}
}
