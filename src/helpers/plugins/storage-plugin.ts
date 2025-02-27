import store from "@react-native-async-storage/async-storage";

export class StoragePlugin {
	static getItem(key: string): Promise<String | null> {
		return store.getItem(key);
	}

	static async setItem(key: string, value: string): Promise<boolean> {
		await store.setItem(key, value);
		return true;
	}

	static async deleteItem(key: string): Promise<boolean> {
		await store.removeItem(key);
		return true;
	}
}
