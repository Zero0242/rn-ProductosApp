import { Usuario } from "../interfaces/appInterfaces"


export interface AuthState {
    errorMessage: string,
    token: string | null,
    usuario: Usuario | null;
    status: 'checking' | 'logged-in' | 'signed-out';
}

type AuthAction =
    | { type: 'signUp', payload: { token: string, user: Usuario } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'authFailed' }
    | { type: 'logout' }



export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "addError":
            return {
                ...state,
                errorMessage: action.payload,
                token: null,
                usuario: null,
                status: 'signed-out',
            }
        case "removeError":
            return {
                ...state,
                errorMessage: ''
            }
        case "signUp":
            return {
                ...state,
                usuario: action.payload.user,
                token: action.payload.token,
                status: 'logged-in',
                errorMessage: '',
            }
        case "logout":
        case "authFailed":
            return {
                ...state,
                token: null,
                usuario: null,
                status: 'signed-out',
            }
        default:
            return state;
    }
}