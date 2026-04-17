import { Product } from "@/interfaces/Product";
import { BASE_URL } from "../constants";

type productJsonLdParams = {
	product: Product;
	locale: string;
	localizedName: string;
	localizedDesc: string;
	localizedCategory: string;
};

export function productJsonLd({
	product,
	locale,
	localizedName,
	localizedDesc,
	localizedCategory,
}: productJsonLdParams) {
	const pageUrl = `${BASE_URL}/${locale}/products/${product.id}`;

	return {
		"@context": "https://schema.org",
		"@type": "Product",
		name: localizedName,
		description: localizedDesc,
		url: pageUrl,
		image: product.variants.flatMap((v) =>
			v.images.map((img) => `${BASE_URL}${img}`),
		),
		category: localizedCategory,
		// keywords: product.keywords.join(", "),
		alternateName: product.latName,
		brand: {
			"@type": "Brand",
			name: "Yagoda Karpat",
		},
		manufacturer: {
			"@type": "Organization",
			name: "Yagoda Karpat LLC",
			url: BASE_URL,
			logo: `${BASE_URL}/logo-img/yagoda-karpat-logo.svg`,
			address: {
				"@type": "PostalAddress",
				streetAddress: "Central street, 34B, Vilkhivtsi village",
				addressLocality: "Tyachiv district",
				addressRegion: "Transcarpathian region",
				postalCode: "90542",
				addressCountry: "UA",
			},
		},
		countryOfOrigin: {
			"@type": "Country",
			name: "Ukraine",
		},
		hasCertification: [
			{
				"@type": "Certification",
				name: "HACCP",
				issuedBy: { "@type": "Organization", name: "HACCP Authority" },
			},
			...(product.isOrganic
				? [
						{
							"@type": "Certification",
							name: "Organic Standard",
							issuedBy: { "@type": "Organization", name: "Organic Standard" },
							url: `${BASE_URL}/pdf/yagoda-karpat-organic-certificate.pdf`,
						},
					]
				: []),
		],
		additionalProperty: [
			{
				"@type": "PropertyValue",
				name: "Minimum Order Quantity",
				value: "500 kg",
			},
			// {
			// 	"@type": "PropertyValue",
			// 	name: "Processing Method",
			// 	value:,
			// },
			{
				"@type": "PropertyValue",
				name: "Storage Temperature",
				value: "-18°C",
			},
			{
				"@type": "PropertyValue",
				name: "Packaging Options",
				value: "25 kg multi-layer paper bags; 400 kg industrial octabins",
			},
			{
				"@type": "PropertyValue",
				name: "Delivery Terms",
				value: "FCA, DAP, DDP",
			},
			// ...(product.variants?.length
			// 	? [
			// 			{
			// 				"@type": "PropertyValue",
			// 				name: "Available Status",
			// 				value: localizedStates,
			// 			},
			// 		]
			// 	: []),
		],
		offers: {
			"@type": "Offer",
			availability: "https://schema.org/InStock",
			itemCondition: "https://schema.org/NewCondition",
			priceCurrency: "EUR",
			priceSpecification: {
				"@type": "PriceSpecification",
				price: "0", // Required field — 0 signals "contact for price"
				priceCurrency: "EUR",
				description: "Price on request. Contact us for a personalized quote.",
			},
			seller: {
				"@type": "Organization",
				name: "Yagoda Karpat LLC",
				url: BASE_URL,
			},
			areaServed: ["EU", "UA", "Worldwide"],
			url: pageUrl,
		},
	};
}
