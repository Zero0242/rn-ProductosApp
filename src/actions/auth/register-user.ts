import AsyncStorage from '@react-native-async-storage/async-storage';
import {tesloApi} from '../../config/api/tesloApi';
import {AppConstants} from '../../config/constants/app-constants';
import {AuthResponse} from '../../infraestructure/interfaces/auth-response.interface';
import {mapUser} from './utils/map-user';

interface Options {
  email: string;
  password: string;
  fullname: string;
}

export const registerUser = async (options: Options) => {
  try {
    const body = JSON.stringify(options);
    const {data} = await tesloApi.post<AuthResponse>(
      '/api/auth/register',
      body,
    );
    const {token, isActive: _, ...user} = data;

    await AsyncStorage.setItem(AppConstants.token, token);

    return mapUser(data);
  } catch (error) {
    console.error(`No se pudo registrar al usuario : ${error}`);
    // throw new Error('No se pudo registrar al usuario');

    return null;
  }
};
