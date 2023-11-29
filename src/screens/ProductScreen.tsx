import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {
	Button,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ProductsStackParams} from '../navigators/ProductsNavigator';
import {Picker} from '@react-native-picker/picker';
import {useCategories} from '../hooks/useCategories';
import {ProductsContext} from '../context/ProductsContext';
import {useForm} from '../hooks/useForm';

interface Props
	extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

const ProductScreen = ({route, navigation}: Props) => {
	const {name = '', id} = route.params;
	const {categories, isLoading} = useCategories();
	const {loadProductById, addProduct, updateProduct, uploadImage} =
		useContext(ProductsContext);
	const {_id, categoriaId, nombre, img, onChange, setFormValue} = useForm({
		_id: id || '',
		categoriaId: '',
		nombre: name,
		img: '',
	});

	const productExists = _id.length > 0;
	const [tempUri, setTempUri] = useState('');

	useEffect(() => {
		navigation.setOptions({
			title: nombre ? nombre : 'Sin Nombre del Producto',
		});
	}, [nombre]);

	useEffect(() => {
		loadProduct();
	}, []);

	useEffect(() => {
		if (!productExists && categories.length > 0) {
			onChange(categories[0]._id, 'categoriaId');
		}
	}, [isLoading]);

	const loadProduct = async () => {
		if (!productExists) return;

		const producto = await loadProductById(id!);

		setFormValue({
			_id: id!,
			categoriaId: producto.categoria._id,
			nombre: producto.nombre,
			img: producto.img || '',
		});
	};

	const createOrUpdate = async () => {
		if (productExists) {
			updateProduct(categoriaId, nombre, _id);
		} else {
			const newProduct = await addProduct(categoriaId, nombre);
			onChange(newProduct._id, '_id');
		}
	};

	const takePhoto = () => {
		launchCamera(
			{
				mediaType: 'photo',
				quality: 0.5,
			},
			response => {
				if (response.didCancel) return;

				if (!response.assets) return;

				if (response.assets[0].uri) {
					setTempUri(response.assets[0].uri);

					uploadImage(response, _id);
				}
			},
		);
	};

	const openLibrary = () => {
		launchImageLibrary(
			{
				mediaType: 'photo',
				quality: 0.5,
			},
			response => {
				if (response.didCancel) return;

				if (!response.assets) return;

				if (response.assets[0].uri) {
					setTempUri(response.assets[0].uri);

					uploadImage(response, _id);
				}
			},
		);
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<Text style={styles.label}>Nombre del Producto:</Text>
				<TextInput
					style={styles.textInput}
					value={nombre}
					onChangeText={value => onChange(value, 'nombre')}
				/>

				<Text style={styles.label}>Categoría:</Text>
				<Picker
					style={styles.textInput}
					selectedValue={categoriaId}
					onValueChange={value => onChange(value, 'categoriaId')}>
					{isLoading &&
						categories.map(category => (
							<Picker.Item
								key={category._id}
								label={category.nombre}
								value={category._id}
							/>
						))}
				</Picker>

				<Button title="Guardar" onPress={createOrUpdate} color="#5856D6" />
				{productExists && (
					<>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: 20,
							}}>
							<Button
								title="Abrir Cámara"
								onPress={takePhoto}
								color="#5856D6"
							/>
							<View style={{width: 10}} />
							<Button
								title="Abrir Galería"
								onPress={openLibrary}
								color="#5856D6"
							/>
						</View>

						<View style={{marginTop: 20}}>
							{img.length > 0 && tempUri.length == 0 && (
								<Image
									source={{
										uri: img,
									}}
									style={{width: '100%', height: 300}}
								/>
							)}

							{tempUri.length > 0 && (
								<Image
									source={{
										uri: tempUri,
									}}
									style={{width: '100%', height: 300}}
								/>
							)}
						</View>
					</>
				)}
			</ScrollView>
		</View>
	);
};

export default ProductScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10,
	},
	label: {
		fontSize: 18,
		color: 'black',
	},
	textInput: {
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderColor: 'rgba(0,0,0,0.3)',
		borderRadius: 20,
		marginTop: 10,
		marginBottom: 15,
		color: 'black',
	},
});
