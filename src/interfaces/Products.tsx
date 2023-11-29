export interface ProductsResponse {
	total: number;
	productos: Producto[];
}

export interface Producto {
	precio: number;
	_id: string;
	nombre: string;
	categoria: Categoria;
	usuario: UserData;
	img?: string;
	precio?: number;
}

export interface Categoria {
	_id: string;
	nombre: string;
}

export interface UserData {
	_id: string;
	nombre: string;
}
