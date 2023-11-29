import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Producto} from '../interfaces/Products';

interface Props {
	product: Producto;
	onPress: (product: Producto) => void;
}

const ProductCard = ({product, onPress}: Props) => {
	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.5}
			onPress={() => onPress(product)}>
			<Text style={styles.title}>{product.nombre}</Text>
		</TouchableOpacity>
	);
};

export default ProductCard;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
	},
	title: {
		color: 'black',
		fontSize: 20,
		fontWeight: 'bold',
	},
});
