import AsyncStorage from '@react-native-async-storage/async-storage';
import {tesloApi} from '../../config/api/tesloApi';
import {AppConstants} from '../../config/constants/app-constants';
import {AuthResponse} from '../../infraestructure/interfaces/auth-response.interface';
import {mapUser} from './utils/map-user';

export const revalidateUser = async () => {
  try {
    const {data, status} = await tesloApi.get<AuthResponse>(
      '/api/auth/check-status',
    );
    if (status.toString().startsWith('2')) {
      await AsyncStorage.setItem(AppConstants.token, data.token);
      return mapUser(data);
    }

    return null;
  } catch (error) {
    // throw new Error('Algo inesperado ocurrió');
    console.error(`Algo inesperado ocurrió : ${error}`);

    return null;
  }
};
