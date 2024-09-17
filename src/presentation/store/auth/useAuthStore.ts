import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import * as Auth from '../../../actions/auth';
import {AppConstants} from '../../../config/constants/app-constants';
import {User} from '../../../domain/entities';

interface AuthState {
  user: User | null;
  authStatus: 'checking' | 'authenticated' | 'not-authenticated';
}

interface AuthActions {
  validateToken: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (options: {
    email: string;
    password: string;
    fullName: string;
  }) => Promise<boolean>;
}

export const useAuthStore = create<AuthState & AuthActions>()((set, get) => ({
  user: null,
  authStatus: 'checking',
  validateToken: async () => {
    const resp = await Auth.revalidateUser();
    if (!resp) {
      set({authStatus: 'not-authenticated'});
    } else {
      set({user: resp.user, authStatus: 'authenticated'});
    }
  },
  login: async (email, password) => {
    const resp = await Auth.loginUser(email, password);
    if (!resp) return false;

    set({user: resp.user, authStatus: 'authenticated'});

    return true;
  },

  register: async form => {
    const resp = await Auth.registerUser(form);
    if (!resp) return false;

    set({user: resp.user, authStatus: 'authenticated'});

    return true;
  },

  logout: async () => {
    await AsyncStorage.removeItem(AppConstants.token);

    set({user: null, authStatus: 'not-authenticated'});
  },
}));
