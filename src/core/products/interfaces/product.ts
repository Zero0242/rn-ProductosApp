export interface Product {
	id: string;
	title: string;
	price: number;
	description: string;
	slug: string;
	stock: number;
	sizes: string[];
	gender: Gender;
	tags: Tag[];
	images: string[];
	user: User;
}

export enum Gender {
	Kid = "kid",
	Men = "men",
	Women = "women",
}

export enum Tag {
	Shirt = "shirt",
	Sweatshirt = "sweatshirt",
}

export interface User {
	id: string;
	email: Email;
	fullName: FullName;
	isActive: boolean;
	roles: Role[];
}

export enum Email {
	Test1GoogleCOM = "test1@google.com",
}

export enum FullName {
	JuanCarlos = "Juan Carlos",
}

export enum Role {
	Admin = "admin",
}
