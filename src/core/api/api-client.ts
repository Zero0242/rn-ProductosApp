import axios from "axios";
import { AppConstants } from "../constants";
import { envs } from "../envs";
import { StoragePlugin } from "../plugins";

const apiClient = axios.create({
	baseURL: envs.API_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(async function (config) {
	const token = await StoragePlugin.read(AppConstants.JWT_KEY);
	if (token) config.headers["x-token"] = `Bearer ${token}`;
	return config;
});

export { apiClient };
