export interface Product {
	id: string;
	title: string;
	price: number;
	description: string;
	slug: string;
	stock: number;
	sizes: Sizes[];
	gender: Gender;
	tags: string[];
	images: string[];
	user: User;
}

export enum Sizes {
	XS = "XS",
	S = "S",
	M = "M",
	L = "L",
	XL = "XL",
	XXL = "XXL",
}

export enum Gender {
	Kid = "kid",
	Men = "men",
	Women = "women",
}

export interface User {
	id: string;
	email: string;
	fullName: string;
	isActive: boolean;
	roles: string[];
}
