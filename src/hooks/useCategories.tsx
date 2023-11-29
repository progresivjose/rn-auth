import {useEffect, useState} from 'react';
import cafeApi from '../api/cafeApi';
import {CategoriesResult} from '../interfaces/Categories';
import {Categoria} from '../interfaces/Products';

export const useCategories = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState<Categoria[]>([]);
	useEffect(() => {
		setIsLoading(false);
		loadCategories();
	}, []);

	const loadCategories = async () => {
		const response = await cafeApi.get<CategoriesResult>('/categorias');

		setCategories([...response.data.categorias]);

		setIsLoading(true);
	};

	return {categories, isLoading};
};
