import React from 'react';
import {Image, View} from 'react-native';

// import { Container } from './styles';

const WhiteLogo: React.FC = () => {
	return (
		<View
			style={{
				alignItems: 'center',
			}}>
			<Image
				source={require('../assets/react-logo-white.png')}
				style={{
					width: 110,
					height: 100,
				}}
			/>
		</View>
	);
};

export default WhiteLogo;
