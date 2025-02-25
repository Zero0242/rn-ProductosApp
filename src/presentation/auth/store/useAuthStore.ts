import { AppConstants } from "@/src/config";
import { AuthActions, User } from "@/src/core/auth";
import { StoragePlugin } from "@/src/helpers/plugins";
import { create } from "zustand";

type LoaderState = "checking" | "authenticated" | "not-authenticated";

interface AuthState {
	stage: LoaderState;
	user?: User;
	// * Methods
	checkToken: () => Promise<void>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
	stage: "checking",
	user: undefined,
	// * Methods
	async checkToken() {
		const result = await AuthActions.checkSession();
		if (result) {
			await StoragePlugin.setItem(AppConstants.JWT_KEY, result.token);
			set({ stage: "authenticated", user: result.user });
		} else {
			get().logout();
		}
	},
	async login(email, password) {
		const result = await AuthActions.login();
		if (result) {
			await StoragePlugin.setItem(AppConstants.JWT_KEY, result.token);
			set({ stage: "authenticated", user: result.user });
		}
	},
	async logout() {
		await StoragePlugin.deleteItem(AppConstants.JWT_KEY);
		set({ stage: "not-authenticated", user: undefined });
	},
}));
