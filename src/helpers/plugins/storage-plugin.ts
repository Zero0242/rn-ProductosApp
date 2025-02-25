import store from "@react-native-async-storage/async-storage";

export class StoragePlugin {
	static getItem(key: string): Promise<String | null> {
		console.log(`Consultando ${key} ....`);
		return store.getItem(key);
	}

	static async setItem(key: string, value: string): Promise<boolean> {
		console.log(`Guardando ${key}: ${value}`);

		await store.setItem(key, value);
		return true;
	}

	static async deleteItem(key: string): Promise<boolean> {
		console.log(`Removiendo ${key} ....`);
		await store.removeItem(key);
		return true;
	}
}
