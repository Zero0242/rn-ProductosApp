import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppConstants} from '../../../config/constants/app-constants';
import {User} from '../../../domain/entities';
import {AuthResponse} from '../../../infraestructure/interfaces/auth-response.interface';

export async function mapUserAsync(data: AuthResponse) {
  const user: User = {
    id: data.id,
    fullName: data.fullName,
    email: data.email,
    roles: data.roles,
  };

  await AsyncStorage.setItem(AppConstants.token, data.token);

  return {
    user: user,
    token: data.token,
  };
}
