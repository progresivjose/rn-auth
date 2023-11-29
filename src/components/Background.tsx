import React from 'react';
import {View} from 'react-native';

// import { Container } from './styles';

const Background: React.FC = () => {
	return (
		<View
			style={{
				position: 'absolute',
				backgroundColor: '#5856D6',
				top: -340,
				width: 1000,
				height: 1200,
				transform: [{rotate: '-70deg'}],
			}}
		/>
	);
};

export default Background;
