import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const LoadingScreen: React.FC = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<ActivityIndicator size={50} color="black" />
		</View>
	);
};

export default LoadingScreen;
