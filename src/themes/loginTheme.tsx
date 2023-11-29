import {StyleSheet} from 'react-native';

export const loginTheme = StyleSheet.create({
	formContainer: {
		flex: 1,
		paddingHorizontal: 30,
		justifyContent: 'center',
		marginBottom: 50,
	},
	title: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold',
		marginTop: 20,
	},
	label: {
		color: 'white',
		marginTop: 25,
		fontWeight: 'bold',
	},
	inputField: {
		color: 'white',
		fontSize: 20,
	},
	inputFieldIOS: {
		borderBottomColor: 'white',
		borderStyle: 'solid',
		borderBottomWidth: 1,
		paddingBottom: 4,
	},
	buttonContainer: {
		alignItems: 'center',
		marginTop: 50,
	},
	button: {
		borderWidth: 2,
		borderColor: 'white',
		paddingHorizontal: 20,
		paddingVertical: 5,
		borderRadius: 100,
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
	},
	newUserContainer: {
		alignItems: 'flex-end',
		marginTop: 50,
	},
	buttonReturn: {
		position: 'absolute',
		top: 50,
		left: 20,
		borderColor: 'white',
		borderWidth: 2,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 100,
	},
});
