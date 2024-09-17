import AsyncStorage from '@react-native-async-storage/async-storage';
import {tesloApi} from '../../config/api/tesloApi';
import {AppConstants} from '../../config/constants/app-constants';
import {User} from '../../domain/entities';
import {AuthResponse} from '../../infraestructure/interfaces/auth-response.interface';

interface Options {
  email: string;
  password: string;
  fullname: string;
}

export const registerUser = async (options: Options): Promise<User> => {
  try {
    const body = JSON.stringify(options);
    const {data} = await tesloApi.post<AuthResponse>(
      '/api/auth/register',
      body,
    );
    const {token, isActive: _, ...user} = data;

    await AsyncStorage.setItem(AppConstants.token, token);

    return user;
  } catch (error) {
    throw new Error('No se pudo registrar al usuario');
  }
};
