const API_URL = process.env.EXPO_PUBLIC_API_URL || "";

export const envs = {
	API_URL,
} as const;
