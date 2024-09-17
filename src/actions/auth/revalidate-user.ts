import AsyncStorage from '@react-native-async-storage/async-storage';
import {tesloApi} from '../../config/api/tesloApi';
import {AppConstants} from '../../config/constants/app-constants';
import {User} from '../../domain/entities';
import {AuthResponse} from '../../infraestructure/interfaces/auth-response.interface';

export const revalidateUser = async (): Promise<User | null> => {
  try {
    const resp = await tesloApi.get<AuthResponse>('/api/auth/check-status');
    if (resp.status.toString().startsWith('2')) {
      const {token, isActive: _, ...user} = resp.data;

      await AsyncStorage.setItem(AppConstants.token, token);
      return user;
    }

    return null;
  } catch (error) {
    throw new Error('Algo inesperado ocurrió');
  }
};
