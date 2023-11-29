import {createContext, useEffect, useState} from 'react';
import {ImagePickerResponse} from 'react-native-image-picker';
import cafeApi from '../api/cafeApi';
import {Producto, ProductsResponse} from '../interfaces/Products';

type ProductsProps = {
	products: Producto[];
	loadProducts: () => Promise<void>;
	addProduct: (categoryId: string, productName: string) => Promise<Producto>;
	updateProduct: (
		categoryId: string,
		productId: string,
		productName: string,
	) => Promise<void>;
	deleteProduct: (productId: string) => Promise<void>;
	loadProductById: (productId: string) => Promise<Producto>;
	uploadImage: (data: any, productId: string) => Promise<void>;
};

export const ProductsContext = createContext<ProductsProps>(
	{} as ProductsProps,
);

export const ProductsProvider = ({children}: any) => {
	const [products, setProducts] = useState<Producto[]>([]);

	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = async () => {
		try {
			const response = await cafeApi.get<ProductsResponse>(
				'/productos?limite=50',
			);

			setProducts([...response.data.productos]);
		} catch (error) {
			console.error({error});
		}
	};
	const addProduct = async (categoryId: string, productName: string) => {
		const response = await cafeApi.post<Producto>('/productos', {
			nombre: productName,
			categoria: categoryId,
		});

		setProducts([...products, response.data]);

		return response.data;
	};
	const updateProduct = async (
		categoryId: string,
		productName: string,
		productId: string,
	) => {
		const response = await cafeApi.put<Producto>(`/productos/${productId}`, {
			nombre: productName,
			categoria: categoryId,
		});

		setProducts(
			products.map(product => {
				return product._id === productId ? response.data : product;
			}),
		);
	};
	const deleteProduct = async (productId: string) => {};
	const loadProductById = async (productId: string) => {
		const response = await cafeApi.get<Producto>(`/productos/${productId}`);

		return response.data;
	};
	const uploadImage = async (data: ImagePickerResponse, productId: string) => {
		if (data.assets) {
			const fileToUpload = {
				uri: data.assets[0].uri,
				type: data.assets[0].type,
				name: data.assets[0].fileName,
			};
			const formData = new FormData();
			formData.append('archivo', fileToUpload);

			try {
				const response = await cafeApi.put(
					`/uploads/productos/${productId}`,
					formData,
				);

				console.log(response.data);
			} catch (error) {
				console.error({error});
			}
		}
	};

	return (
		<ProductsContext.Provider
			value={{
				products,
				loadProducts,
				addProduct,
				updateProduct,
				deleteProduct,
				loadProductById,
				uploadImage,
			}}>
			{children}
		</ProductsContext.Provider>
	);
};
