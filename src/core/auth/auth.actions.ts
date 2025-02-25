import { apiClient } from "@/src/core/api";
import { User } from "./interfaces/user";

export class AuthActions {
	static async login() {
		try {
			const { data } = await apiClient.post<User>("/api/auth/login");
			return {
				user: data,
				token: data.token,
			};
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async register() {
		try {
			const { data } = await apiClient.post<User>("/api/auth/register");

			return {
				user: data,
				token: data.token,
			};
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async checkSession() {
		try {
			const { data } = await apiClient.get<User>("/api/auth/check-status");
			return {
				user: data,
				token: data.token,
			};
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
