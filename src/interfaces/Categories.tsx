import {Usuario} from './Usuario';

export interface CategoriesResult {
	total: number;
	categorias: FullCategory[];
}

export interface FullCategory {
	_id: string;
	nombre: string;
	usuario: Usuario;
}
