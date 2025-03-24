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
	login: (token: string, user: User) => Promise<void>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
	stage: "checking",
	user: undefined,
	// * Methods
	async checkToken() {
		const result = await AuthActions.checkSession();
		if (result) {
			await StoragePlugin.setItem(AppConstants.JWT_KEY, result.token);
			set({ stage: "authenticated", user: result.user });
		} else {
			set({ stage: "not-authenticated" });
		}
	},
	async login(token, user) {
		set({ stage: "authenticated", user });
		await StoragePlugin.setItem(AppConstants.JWT_KEY, token);
	},
	async logout() {
		await StoragePlugin.deleteItem(AppConstants.JWT_KEY);
		set({ stage: "not-authenticated", user: undefined });
	},
}));
