import AsyncStorage from '@react-native-async-storage/async-storage';
import {tesloApi} from '../../config/api/tesloApi';
import {AppConstants} from '../../config/constants/app-constants';
import {User} from '../../domain/entities';
import {AuthResponse} from '../../infraestructure/interfaces/auth-response.interface';

export const loginUser = async (
  email: string,
  password: string,
): Promise<User> => {
  try {
    const body = JSON.stringify({email, password});
    const {data} = await tesloApi.post<AuthResponse>('/api/auth/login', body);
    const {token, isActive: _, ...user} = data;

    await AsyncStorage.setItem(AppConstants.token, token);
    return user;
  } catch (error) {
    throw new Error('No se pudo autenticar al usuario');
  }
};
