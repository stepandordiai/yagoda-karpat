export interface Product {
	id: string;
	type: string;
	status: string;
	latName: string;
	name: string;
	origin: string;
	pack: string[];
	desc: string;
	variants: {
		id: number;
		images: string[];
		state?: string;
	}[];
	isOrganic?: boolean;
	harvest: number[];
	descSEO?: string;
	isIQF?: boolean;
}
