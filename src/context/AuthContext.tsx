import React, {createContext, useEffect, useReducer} from 'react';
import cafeApi from '../api/cafeApi';
import {LoginData} from '../interfaces/LoginData';
import {Usuario} from '../interfaces/Usuario';
import {authReducer, AuthState} from './authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RegisterData} from '../interfaces/RegisterData';

interface LoginResponse {
	usuario: Usuario;
	token: string;
}

type AuthContextProps = {
	errorMessage: string;
	token: string | null;
	user: Usuario | null;
	status: 'checking' | 'authenticated' | 'not-authenticated';
	signup: (registerData: RegisterData) => void;
	signin: (loginData: LoginData) => void;
	logout: () => void;
	removeError: () => void;
};

const authInitialState: AuthState = {
	status: 'checking',
	token: null,
	user: null,
	errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
	const [state, dispatch] = useReducer(authReducer, authInitialState);

	useEffect(() => {
		checkToken();
	}, []);

	const checkToken = async () => {
		const token = await AsyncStorage.getItem('token');

		if (!token) return dispatch({type: 'notAuthenticated'});

		const response = await cafeApi.get('/auth');

		if (response.status != 200) return dispatch({type: 'notAuthenticated'});

		dispatch({
			type: 'singup',
			payload: {
				token: response.data.token,
				user: response.data.usuario,
			},
		});

		await AsyncStorage.setItem('token', response.data.token);
	};

	const signin = async ({correo, password}: LoginData) => {
		try {
			const response = await cafeApi.post<LoginResponse>('/auth/login', {
				correo,
				password,
			});

			dispatch({
				type: 'singup',
				payload: {
					token: response.data.token,
					user: response.data.usuario,
				},
			});

			await AsyncStorage.setItem('token', response.data.token);
		} catch (error: any) {
			dispatch({
				type: 'addError',
				payload: error?.response?.data?.msg || 'Información Incorrecta.',
			});
		}
	};
	const signup = async ({nombre, correo, password}: RegisterData) => {
		try {
			const response = await cafeApi.post<LoginResponse>('/usuarios', {
				correo,
				nombre,
				password,
			});

			dispatch({
				type: 'singup',
				payload: {
					token: response.data.token,
					user: response.data.usuario,
				},
			});

			await AsyncStorage.setItem('token', response.data.token);
		} catch (error: any) {
			console.error({error});
			dispatch({
				type: 'addError',
				payload: error?.response?.data?.msg || 'Información Incorrecta.',
			});
		}
	};

	const logout = async () => {
		await AsyncStorage.removeItem('token');

		dispatch({type: 'logout'});
	};
	const removeError = () => {
		dispatch({type: 'removeError'});
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				signup,
				signin,
				logout,
				removeError,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
