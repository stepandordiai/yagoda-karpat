// FIXME:
type ProductSpec = {
	label: string;
	value: string;
};

type ProductVariant = {
	id: number;
	state?: string;
	images?: string[];
	grades?: {
		id: number;
		class: string;
		images: string[];
	}[];
};

export interface Product {
	id: string;
	meta: {
		title: string;
		description: string;
	};
	type: string;
	status: string;
	latName: string;
	name: string;
	description: string;
	specs?: ProductSpec[];
	applications: string;
	variants: ProductVariant[];
	isFeatured?: boolean;
	descSEO?: string;
}
