import { AppConstants, envs } from "@/src/config";
import { StoragePlugin } from "@/src/helpers/plugins";
import axios from "axios";

const apiClient = axios.create({
	baseURL: envs.API_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(async function (config) {
	const token = await StoragePlugin.getItem(AppConstants.JWT_KEY);
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export { apiClient };
