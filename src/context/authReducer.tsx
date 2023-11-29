import {Usuario} from '../interfaces/Usuario';

export interface AuthState {
	status: 'checking' | 'authenticated' | 'not-authenticated';
	token: string | null;
	errorMessage: string;
	user: Usuario | null;
}

type AuthAction =
	| {type: 'singup'; payload: {token: string; user: Usuario}}
	| {type: 'addError'; payload: string}
	| {type: 'removeError'}
	| {type: 'notAuthenticated'}
	| {type: 'logout'};

export const authReducer = (
	state: AuthState,
	action: AuthAction,
): AuthState => {
	switch (action.type) {
		case 'addError':
			return {
				...state,
				status: 'not-authenticated',
				errorMessage: action.payload,
				user: null,
				token: null,
			};
			break;
		case 'removeError':
			return {
				...state,
				errorMessage: '',
			};
			break;
		case 'singup':
			return {
				...state,
				status: 'authenticated',
				token: action.payload.token,
				user: action.payload.user,
			};
			break;
		case 'logout':
		case 'notAuthenticated':
			return {
				...state,
				status: 'not-authenticated',
				user: null,
				token: null,
				errorMessage: '',
			};
			break;
		default:
			return state;
	}
};
