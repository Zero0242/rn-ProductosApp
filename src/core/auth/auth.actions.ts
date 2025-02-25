import { apiClient } from "../config";

export class AuthActions {
	static async login() {
		try {
			const { data } = await apiClient.post("/api/auth/login");
			return {
				user: data.user,
				token: data.token,
			};
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async register() {
		try {
			const { data } = await apiClient.post("/api/auth/register");

			return {
				user: data.user,
				token: data.token,
			};
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async checkSession() {
		try {
			const { data } = await apiClient.get("/api/auth/login");
			return {
				user: data.user,
				token: data.token,
			};
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
