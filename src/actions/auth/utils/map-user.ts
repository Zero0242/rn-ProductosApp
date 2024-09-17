import {User} from '../../../domain/entities';
import {AuthResponse} from '../../../infraestructure/interfaces/auth-response.interface';

export function mapUser(data: AuthResponse) {
  const user: User = {
    id: data.id,
    fullName: data.fullName,
    email: data.email,
    roles: data.roles,
  };
  return {
    user: user,
    token: data.token,
  };
}
