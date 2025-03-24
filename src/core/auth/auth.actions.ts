import { apiClient } from "@/src/core/api";
import { User } from "./interfaces/user";

export class AuthActions {
	static async login(form: { password: string; email: string }) {
		try {
			const { data } = await apiClient.post<User>(
				"/api/auth/login",
				JSON.stringify(form)
			);
			return { user: data, token: data.token };
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async register(form: {
		fullName: string;
		password: string;
		email: string;
	}) {
		try {
			const { data } = await apiClient.post<User>(
				"/api/auth/register",
				JSON.stringify(form)
			);

			return { user: data, token: data.token };
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async checkSession() {
		try {
			const { data } = await apiClient.get<User>("/api/auth/check-status");
			return { user: data, token: data.token };
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
