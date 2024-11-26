import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
export class CameraPlugin {
  static async takePicture(): Promise<string[]> {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.7,
      cameraType: 'back',
    });

    if (result.assets && result.assets[0].uri) {
      return [result.assets[0].uri];
    }
    return [];
  }
  static async getPictures(): Promise<string[]> {
    const results = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 6,
    });

    if (results.assets) {
      const photos: string[] = [];
      for (const photo of results.assets) {
        if (!photo.uri) continue;
        photos.push(photo.uri);
      }
      return photos;
    }

    return [];
  }
}
