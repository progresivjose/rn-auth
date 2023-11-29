import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
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

const LoginScreen = ({navigation}: Props) => {
	const {signin, errorMessage, removeError} = useContext(AuthContext);
	const {email, password, onChange} = useForm({
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
	const onLogin = () => {
		Keyboard.dismiss();

		signin({correo: email, password});
	};

	return (
		<View style={{flex: 1}}>
			<Background />

			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<View style={loginTheme.formContainer}>
					<WhiteLogo />
					<Text style={loginTheme.title}>Login</Text>

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
						onSubmitEditing={onLogin}
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
						onChangeText={value => onChange(value, 'password')}
						value={password}
						secureTextEntry={true}
						onSubmitEditing={onLogin}
					/>

					<View style={loginTheme.buttonContainer}>
						<TouchableOpacity
							activeOpacity={0.8}
							style={loginTheme.button}
							onPress={onLogin}>
							<Text style={loginTheme.buttonText}>Login</Text>
						</TouchableOpacity>
					</View>

					<View style={loginTheme.newUserContainer}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => navigation.replace('RegisterScreen')}>
							<Text style={loginTheme.buttonText}>Registrarme</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default LoginScreen;
