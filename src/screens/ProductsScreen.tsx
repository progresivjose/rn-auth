import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {
	RefreshControl,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ProductCard from '../components/ProductCard';
import {ProductsContext} from '../context/ProductsContext';
import {Producto} from '../interfaces/Products';
import {ProductsStackParams} from '../navigators/ProductsNavigator';

interface Props
	extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

const ProductsScreen = ({navigation}: Props) => {
	const {products, loadProducts} = useContext(ProductsContext);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.addButton}
						onPress={() => navigation.navigate('ProductScreen', {})}>
						<Text style={{color: 'black'}}>Agregar</Text>
					</TouchableOpacity>
				);
			},
		});
	}, []);

	const [isRefreshing, setIsRefreshing] = useState(false);
	const onRefresh = async () => {
		setIsRefreshing(true);
		await loadProducts();
		setIsRefreshing(false);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={products}
				keyExtractor={product => product._id}
				renderItem={({item}) => (
					<ProductCard
						product={item}
						onPress={(product: Producto) =>
							navigation.navigate('ProductScreen', {
								id: product._id,
								name: product.nombre,
							})
						}
					/>
				)}
				ItemSeparatorComponent={<View style={styles.separator} />}
				refreshControl={
					<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
				}
			/>
		</View>
	);
};

export default ProductsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 10,
	},
	separator: {
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0,0,0,0.3)',
		marginVertical: 5,
	},
	addButton: {
		marginRight: 10,
	},
});
