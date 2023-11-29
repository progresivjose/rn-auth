import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Background from '../components/Background';
import WhiteLogo from '../components/WhiteLogo';
import {AuthContext} from '../context/AuthContext';
import {useForm} from '../hooks/useForm';
import {loginTheme} from '../themes/loginTheme';

interface Props extends StackScreenProps<any, any> {}

const RegisterScreen = ({navigation}: Props) => {
	const {signup, errorMessage, removeError} = useContext(AuthContext);
	const {email, password, name, onChange} = useForm({
		name: '',
		email: '',
		password: '',
	});
	useEffect(() => {
		if (errorMessage.length === 0) return;

		Alert.alert('Login Incorrecto.', errorMessage, [
			{
				text: 'Ok',
				onPress: removeError,
			},
		]);
	}, [errorMessage]);

	const onRegister = () => {
		Keyboard.dismiss();

		signup({correo: email, nombre: name, password});
	};

	return (
		<View style={{flex: 1}}>
			<KeyboardAvoidingView
				style={{flex: 1, backgroundColor: '#5856D6'}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<View style={loginTheme.formContainer}>
					<WhiteLogo />
					<Text style={loginTheme.title}>Registrarme</Text>

					<Text style={loginTheme.label}>Nombre</Text>
					<TextInput
						placeholder="Ingrese su nombre"
						placeholderTextColor="rgba(255,255,255,0.4)"
						underlineColorAndroid="white"
						style={[
							loginTheme.inputField,
							Platform.OS === 'ios' && loginTheme.inputFieldIOS,
						]}
						selectionColor="white"
						onChangeText={value => onChange(value, 'name')}
						value={name}
						onSubmitEditing={onRegister}
					/>

					<Text style={loginTheme.label}>Email</Text>
					<TextInput
						placeholder="Ingrese su email"
						placeholderTextColor="rgba(255,255,255,0.4)"
						keyboardType="email-address"
						underlineColorAndroid="white"
						style={[
							loginTheme.inputField,
							Platform.OS === 'ios' && loginTheme.inputFieldIOS,
						]}
						selectionColor="white"
						autoCapitalize="none"
						autoCorrect={false}
						onChangeText={value => onChange(value, 'email')}
						value={email}
						onSubmitEditing={onRegister}
					/>

					<Text style={loginTheme.label}>Password</Text>
					<TextInput
						placeholder="******"
						placeholderTextColor="rgba(255,255,255,0.4)"
						underlineColorAndroid="white"
						style={[
							loginTheme.inputField,
							Platform.OS === 'ios' && loginTheme.inputFieldIOS,
						]}
						selectionColor="white"
						autoCapitalize="none"
						autoCorrect={false}
						secureTextEntry={true}
						onChangeText={value => onChange(value, 'password')}
						value={password}
						onSubmitEditing={onRegister}
					/>

					<View style={loginTheme.buttonContainer}>
						<TouchableOpacity
							activeOpacity={0.8}
							style={loginTheme.button}
							onPress={onRegister}>
							<Text style={loginTheme.buttonText}>Crear Cuenta</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => navigation.replace('LoginScreen')}
						style={loginTheme.buttonReturn}>
						<Text style={loginTheme.buttonText}>Iniciar Sesion</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default RegisterScreen;
