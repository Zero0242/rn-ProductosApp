import * as ImagePicker from "expo-image-picker";

export class PickerPlugin {
	static async pickSingleImage() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: "images",
			allowsEditing: true,
			allowsMultipleSelection: false,
			aspect: [4, 3],
			quality: 1,
		});
		if (result.assets?.length !== 0) {
			const [image] = result.assets!;
			const name = image.uri.split("/").pop() ?? "";
			return { imagePath: image.uri, name: name };
		}

		return null;
	}

	static async pickMultiImages(selectionLimit: number = 6) {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: "images",
			allowsEditing: false,
			allowsMultipleSelection: true,
			aspect: [4, 3],
			quality: 1,
			selectionLimit: selectionLimit,
		});

		const assets: ImagePicker.ImagePickerAsset[] = result.assets ?? [];

		return assets.map((image) => image.uri);
	}
}
