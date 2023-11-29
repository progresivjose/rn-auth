import React, {memo, useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const ProtectedScreen: React.FC = () => {
	const {user, token, logout} = useContext(AuthContext);
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Protected Screen</Text>

			<Button title="Logout" color="#5856D6" onPress={logout} />

			<Text style={{color: 'black'}}>{JSON.stringify(user, null, 5)}</Text>
			<Text style={{color: 'black'}}>{token}</Text>
		</View>
	);
};

export default ProtectedScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		marginBottom: 20,
		color: 'black',
	},
});
