import { Usuario } from "../interfaces/appInterfaces"


export interface AuthState {
    status: 'checking' | 'logged-in' | 'signed-out'
    token: string | null
    errorMessage: string
    user: Usuario | null
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
                user: null,
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
                user: action.payload.user,
                token: action.payload.token,
                status: 'logged-in',
                errorMessage: '',
            }
        case "logout":
        case "authFailed":
            return {
                ...state,
                token: null,
                user: null,
                status: 'signed-out',
            }
        default:
            return state;
    }
}