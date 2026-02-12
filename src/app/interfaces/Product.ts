export interface Product {
	id: string;
	type: string;
	status: string;
	latName: string;
	name: string;
	packaging: {
		paperBag?: {
			title: string;
			desc: string;
		};
		cartonBox?: {
			title: string;
			desc: string;
		};
		octabin?: {
			title: string;
			desc: string;
		};
		woodenContainer?: {
			title: string;
			desc: string;
		};
	};
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
	isFeatured?: boolean;
}
